import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <>
      <main className="content"><Outlet /></main>
      <BottomNav />
    </>
  );
}