import { Routes, Route, Navigate } from "react-router-dom";

// Every page and the shared layout are imported here
import Layout from "./components/Layout";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Providers from "./pages/Providers";
import ProviderRate from "./pages/ProviderRate";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Splash: title with the Home and Electric buttons */}
      <Route path="/" element={<Splash />} />

      {/* Pages that share the side menu (desktop) / bottom bar (phone) */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/:id" element={<ProviderRate />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Anything else goes back to the splash */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}