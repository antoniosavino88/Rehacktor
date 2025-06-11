import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext.js";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert("Signed out ✌️");
    navigate("/");
  };

  return (
    <nav className="bg-primary text-text px-6 py-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">Rehacktor</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 ml-auto">
          <li>
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-accent transition">
              Services
            </a>
          </li>
          {session ? (
            <li className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary hover:bg-tertiary transition font-semibold">
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
              <ul className="absolute right-0 mt-2 w-40 bg-primary rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <li>
                  <a
                    href="/account"
                    className="block px-4 py-2 hover:bg-tertiary transition"
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-tertiary transition"
                  >
                    Profilo
                  </a>
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

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 text-end">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block text-text hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="block text-text hover:text-accent">
                Services
              </a>
            </li>
            {session ? (
              <>
                <li className="text-text font-semibold">
                  Ciao{" "}
                  <span className="text-accent">
                    {session.user.user_metadata.first_name}
                  </span>
                </li>
                <li>
                  <a
                    href="/account"
                    className="block text-text hover:text-accent"
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block text-text hover:text-accent"
                  >
                    Profilo
                  </a>
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
  );
}
