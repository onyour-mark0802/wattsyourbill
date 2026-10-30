import { Link } from "react-router-dom";
import { PROVIDERS } from "../data/providers";
import ProviderLogo from "../components/ProviderLogo";

export default function Home() {
  return (
    <div className="narrow-lg">
      <div className="homehead">
        <span className="app-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40"><path d="M22.8 5.5 10.5 22h8l-1.3 12.5L29.5 18h-8l1.3-12.5Z" /></svg>
        </span>
      <h1>Watts Your Bill?</h1></div>
      <h2 className="sub">Rates this month</h2>
      <div className="card list">
        <div className="list-title">Electricity Providers' Rate</div>
        {PROVIDERS.map((p) => (
          <Link key={p.id} className="row" to={`/providers/${p.id}`}>
            <ProviderLogo p={p} size={40} />
            <span className="grow">{p.name}</span>
            <span className="right">₱ {p.label} per kWh<small>{p.asOf}</small></span>
          </Link>
        ))}
      </div>
      <p className="note">Rates are classified into residential consumer. Check your bill for your exact rate. Source: provider advisories.</p>
    </div>
  );
}