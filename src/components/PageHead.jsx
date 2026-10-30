import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

export default function PageHead({ title = "Energy and Cost Monitor", to }) {
  const go = useNavigate();
  return (
    <div className="pagehead">
      <button className="back" onClick={() => (to ? go(to) : go(-1))} aria-label="Back"><Icon n="back" size={26} /></button>
      <h1>{title}</h1>
    </div>
  );
}