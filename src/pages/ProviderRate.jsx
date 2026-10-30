import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PROVIDERS } from "../data/providers";
import { useApp } from "../AppContext";
import ProviderLogo from "../components/ProviderLogo";
import PageHead from "../components/PageHead";
import Icon from "../components/Icon";

export default function ProviderRate() {
  const { id } = useParams();
  const go = useNavigate();
  const { choose } = useApp();
  const p = PROVIDERS.find((x) => x.id === id);
  const [q, setQ] = useState("");
  const [val, setVal] = useState(p?.rate ?? "");

  if (!p) return <p>Provider not found. <Link to="/providers">Back to providers</Link></p>;
  
  const matches = q ? PROVIDERS.filter((x) => x.full.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="narrow">
      {/* 1. Updated Header Title */}
      <PageHead to="/providers" title="Energy and Cost Monitor" />
      
      <div className="label">Electricity provider</div>
      
      <div className="card selcard">
        <div className="search flat">
          <Icon n="search" size={18} />
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            placeholder="Search provider or cooperative..." 
            aria-label="Search provider or cooperative" 
          />
          {q && (
            <button 
              type="button" 
              onClick={() => setQ("")} 
              style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "0 4px" }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {q ? (
          matches.map((m) => (
            <Link 
              key={m.id} 
              className="row" 
              to={`/providers/${m.id}`} 
              onClick={() => { setQ(""); setVal(m.rate); }}
            >
              <ProviderLogo p={m} size={40} />
              <span className="grow">{m.full}</span>
            </Link>
          ))
        ) : (
          <div className="selrow">
            <ProviderLogo p={p} size={64} />
            <div className="grow"><b>{p.full}</b></div>
            <span className="badge">
              <span className="tick">
                <Icon n="check" size={14} />
              </span> Selected
            </span>
            {p.area && <div className="area">{p.area}</div>}
          </div>
        )}
      </div>

      <h2 className="ratelabel">RATE</h2>

      {/* 2. Wrapped Input with Peso Sign Prefix */}
      <div className="rate-wrapper">
        <span className="currency-prefix">₱</span>
        <input 
          className="rate" 
          id="rate" 
          type="number" 
          step="0.0001" 
          min="0" 
          value={val} 
          onChange={(e) => setVal(e.target.value)} 
          placeholder="Enter the updated rate here" 
          aria-describedby="rhelp" 
        />
      </div>

      <p className="note" id="rhelp">Rate used for cost estimates (₱ per kWh)</p>
      
      <button 
        className="big" 
        onClick={() => { choose(p.id, parseFloat(val) || 0); go("/dashboard"); }}
      >
        NEXT
      </button>
    </div>
  );
}