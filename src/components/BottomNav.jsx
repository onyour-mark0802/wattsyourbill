import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";

// Home and Electric providers. The dashboard belongs to the providers flow,
// so the plug stays highlighted there too.
export default function BottomNav() {
  const { pathname } = useLocation();
  const providersActive = pathname.startsWith("/providers") || pathname === "/dashboard";
  return (
    <nav className="bottom-nav" aria-label="Main">
      <NavLink to="/home" aria-label="Home" className={({ isActive }) => (isActive ? "active" : "")}>
        <Icon n="home" />
      </NavLink>
      <NavLink to="/providers" aria-label="Electric providers" className={providersActive ? "active" : ""}>
        <Icon n="plug" />
      </NavLink>
    </nav>
  );
}