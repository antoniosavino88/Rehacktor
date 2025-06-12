import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="style-layout-system">
      <Header />

      {/* Sidebar + Main Content */}
      <main className="flex relative bg-gradient-to-b from-secondary to-primary pt-15">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Contenuto principale */}
        <section
          className={`style-main-content min-h-screen flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}
