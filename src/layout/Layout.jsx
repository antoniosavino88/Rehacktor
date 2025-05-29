import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="style-layout-system">
      <Header />

      <div className="style-sidebar-filters">
        <Sidebar />
      </div>

      <main className="style-main-content min-h-screen ml-64 flex-1 p-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
