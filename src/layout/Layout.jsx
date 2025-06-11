import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="style-layout-system">
      <Header />

      <main>
        <section className="style-sidebar-filters">
          <Sidebar />
        </section>

        <section className="style-main-content min-h-screen ml-64 flex-1 p-6 bg-gradient-to-b from-secondary to-primary mt-15">
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}
