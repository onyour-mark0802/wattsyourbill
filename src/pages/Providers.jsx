import { useState } from "react";
import { Link } from "react-router-dom";
import { PROVIDERS } from "../data/providers";
import ProviderLogo from "../components/ProviderLogo";
import PageHead from "../components/PageHead";
import Icon from "../components/Icon";

export default function Providers() {
  const [q, setQ] = useState("");
  const list = PROVIDERS.filter((p) => p.full.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead to="/home" />
      <div className="label">Electricity provider</div>
      
      <div className="search">
        <Icon n="search" size={18} />
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search provider or cooperative..." 
          aria-label="Search provider or cooperative" 
        />
        {/* Optional: Clear search button when text is entered */}
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

      <div className="logo-grid">
        {list.map((p) => (
          <Link key={p.id} to={`/providers/${p.id}`} className="tile">
            <ProviderLogo p={p} size={92} />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
      
      {list.length === 0 && <p className="note">No provider found.</p>}
    </>
  );
}