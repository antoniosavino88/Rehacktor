import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="style-layout-system">
      <Header />

      <main className="style-main-content min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
