import { useApp } from "../AppContext";
import { PROVIDERS, peso } from "../data/providers";
import Ring from "../components/Ring";
import PageHead from "../components/PageHead";
import Icon from "../components/Icon";

export default function Dashboard() {
  const { data: d, rate, status, demoOn, liveOn, mode, providerId } = useApp();
  const prov = PROVIDERS.find((p) => p.id === providerId);
  const dash = "-";

  return (
    <div className="narrow-lg">
      <PageHead to={`/providers/${providerId}`} title="Energy and Cost Monitor" />
      
      <div className="label">Appliance</div>

      <div className="select-wrap">
      <select aria-label="Appliance" defaultValue="LED Light Bulb">
        {["LED Light Bulb", "Electric Fan", "Rice Cooker", "Television", "Refrigerator"].map((a) => (
          <option key={a} style={{ background: "var(--card)", color: "var(--text)" }}>{a}</option>
        ))}
      </select>
        <span className="select-arrow">
          <Icon n="down" size={16} />
        </span>
      </div>

      <p className="note">{prov?.name} · {rate ? `${peso(rate)} per kWh` : "rate not set"}</p>

      {/* Real-Time Data with Clock Icon */}
      <div className="pill">
        <span className="pill-ic"><Icon n="clock" size={14} /></span>
        REAL-TIME DATA {mode === "demo" && "(DEMO MODE ACTIVE)"}
      </div>
      <div className="cards three">
        <Ring label="Voltage" frac={d ? d.v / 250 : 0} text={d ? `${d.v.toFixed(1)} V` : dash} color="#22c55e" />
        <Ring label="Current" frac={d ? d.i / 20 : 0} text={d ? `${d.i.toFixed(2)} A` : dash} color="#ef4444" />
        <Ring label="Power" frac={d ? d.p / 2500 : 0} text={d ? `${(d.p / 1000).toFixed(3)} kW` : dash} color="#eab308" />
      </div>

      {/* Energy Consumption with Bolt Icon */}
      <div className="pill">
        <span className="pill-ic"><Icon n="bolt" size={14} /></span>
        ENERGY CONSUMPTION
      </div>
      <div className="cards two">
        <Ring label="Today" frac={d ? d.today / 10 : 0} text={d ? `${d.today.toFixed(3)} kWh` : dash} color="#0a84ff" />
        <Ring label="This Month" frac={d ? d.month / 300 : 0} text={d ? `${d.month.toFixed(3)} kWh` : dash} color="#0a84ff" />
      </div>

      {/* Estimated Cost with Wallet/Card Icon */}
      <div className="pill">
        <span className="pill-ic"><Icon n="wallet" size={14} /></span>
        ESTIMATED COST
      </div>
      <div className="cards two">
        <div className="cost">
          <span>Today</span>
          <b>{d && rate ? peso(d.today * rate) : dash}</b>
        </div>
        <div className="cost">
          <span>This Month</span>
          <b>{d && rate ? peso(d.month * rate) : dash}</b>
        </div>
      </div>

      {/* Simplified Meter Connection Accordion (No IP input needed) */}
      <details className="meter">
        <summary className="meter-summary">
          <span>Meter connection ({mode === "demo" ? "Demo Mode" : "Live Cloud"})</span>
          <span className="meter-arrow">
            <Icon n="down" size={16} />
          </span>
        </summary>
        <div role="status" className="note" style={{ marginTop: "8px" }}>
          {status || (mode === "demo" ? "Showing simulated telemetry." : "Streaming live data securely via Blynk Cloud.")}
        </div>
        <div className="conn" style={{ marginTop: "12px" }}>
          {mode === "demo" ? (
            <button className="small" onClick={liveOn}>Switch to Live Meter</button>
          ) : (
            <button className="small ghost" onClick={demoOn}>Try demo data</button>
          )}
        </div>
      </details>
    </div>
  );
}