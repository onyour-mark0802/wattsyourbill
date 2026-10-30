import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Ctx } from "./context";

export function useApp() {
  return useContext(Ctx);
}

const get = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } };
const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

// Today / month energy from the meter's running total (local time, not UTC)
function track(total) {
  const n = new Date(), p = (x) => String(x).padStart(2, "0");
  const mon = n.getFullYear() + "-" + p(n.getMonth() + 1), day = mon + "-" + p(n.getDate());
  const s = get("track", {});
  if (s.day !== day || total < (s.ds ?? 0)) { s.day = day; s.ds = total; }
  if (s.mon !== mon || total < (s.ms ?? 0)) { s.mon = mon; s.ms = total; }
  put("track", s);
  return { today: total - s.ds, month: total - s.ms };
}

export function AppProvider({ children }) {
  const [providerId, setProviderId] = useState(get("pid", "meralco"));
  const [rate, setRate] = useState(get("rate", 0));
  const [ip, setIp] = useState(get("ip", ""));
  const [mode, setMode] = useState("live");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const demo = useRef(120);

  useEffect(() => {
    if (mode === "none") return;
    let on = true;
    const tick = async () => {
      try {
        let d;
        if (mode === "demo") {
          demo.current += 0.0006;
          d = { ok: 1, v: 227 + Math.random() * 3, i: 3.6 + Math.random() * 0.2, p: 820 + Math.random() * 40, t: demo.current };
        } else {
          d = await (await fetch("/.netlify/functions/meter", { cache: "no-store" })).json();
        }
        if (!on) return;
        if (!d.ok) { setStatus("Meter not answering. Check the PZEM wiring."); return; }
        setStatus(mode === "demo" ? "Showing demo data" : "Live from meter");
        setData({ ...d, ...track(d.t ?? d.e) });
      } catch {
        if (on) setStatus("Cannot reach the meter data service");
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => { on = false; clearInterval(id); };
  }, [mode, ip]);

  const choose = (id, r) => { setProviderId(id); setRate(r); put("pid", id); put("rate", r); };
  const connect = (addr) => { const a = addr.trim(); setIp(a); put("ip", a); setMode(a ? "live" : "none"); };

  return (
    <Ctx.Provider value={{ providerId, rate, ip, mode, data, status, choose, connect, demoOn: () => setMode("demo"), liveOn: () => setMode("live") }}>
      {children}
    </Ctx.Provider>
  );
}