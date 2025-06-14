import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext.js";
import Searchbar from "./Searchbar.jsx";
import AlertBanner from "./AlertBanner.jsx";
import logo from "../assets/logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [logoutMessage, setLogoutMessage] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      setLogoutMessage("Errore durante il logout");
    } else {
      setLogoutMessage("Logout effettuato con successo, alla prossima!");
      setTimeout(() => {
        setLogoutMessage("");
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      {logoutMessage && (
        <AlertBanner
          type="success"
          message={logoutMessage}
          onClose={() => setLogoutMessage("")}
        />
      )}
      <nav
        className={`text-text px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-10 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-primary/60 backdrop-blur-lg"
            : "bg-primary backdrop-blur-none"
        }`}
      >
        <div className=" mx-auto flex items-center justify-between md:justify-normal gap-4 md:gap-8">
          {/* Logo */}
          <div className="text-xl font-bold tracking-wide flex-shrink-0 text-accent hover:scale-105 transition">
            <Link to="/">
              <img src={logo} alt="" className="inline-block" />{" "}
              <span className="font-title hidden md:inline">DailyRespawn</span>
            </Link>
          </div>

          {/* Searchbar */}
          <div className="flex-1 order-3 md:order-none">
            <Searchbar />
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 ml-auto">
            {session ? (
              <li className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-transparent hover:bg-tertiary transition font-semibold">
                  Ciao{" "}
                  <span className="text-accent">
                    {session.user.user_metadata.first_name}
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:rotate-180 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul
                  className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 ${
                    isScrolled
                      ? "bg-primary/60 backdrop-blur-lg"
                      : "bg-primary backdrop-blur-none"
                  }`}
                >
                  <li>
                    <Link
                      to="/account"
                      className="block px-4 py-2 hover:bg-tertiary transition"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-tertiary transition"
                    >
                      Profilo
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={signOut}
                      className="block w-full text-left text-error font-semibold px-4 py-2 hover:bg-tertiary transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-accent hover:text-accent-hover transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-primary font-semibold transition"
                  >
                    Registrati
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 px-4 pb-6">
            <ul className="space-y-4 text-end">
              {session ? (
                <>
                  <li className="text-text font-semibold">
                    Ciao{" "}
                    <span className="text-accent">
                      {session.user.user_metadata.first_name}
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/account"
                      className="block text-text hover:text-accent"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-text hover:text-accent"
                    >
                      Profilo
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={signOut}
                      className="block w-full text-end font-semibold text-error hover:text-accent"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block text-accent hover:text-accent-hover"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block bg-accent hover:bg-accent-hover text-primary font-semibold px-4 py-2 rounded-md"
                    >
                      Registrati
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
