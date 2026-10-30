import { useState } from "react";

// Shows /logos/<id>.png. If the file is missing, shows a coloured initial instead.
export default function ProviderLogo({ p, size = 44 }) {
  const [broken, setBroken] = useState(false);
  const box = { width: size, height: size, fontSize: size * 0.4 };
  return (
    <span className="logo" style={{ ...box, background: broken ? p.color : "#fff" }}>
      {broken ? p.name[0] : <img src={p.logo || `/logos/${p.id}.png`} alt={p.name} onError={() => setBroken(true)} />}    </span>
  );
}