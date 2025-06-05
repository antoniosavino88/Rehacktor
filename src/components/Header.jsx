import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext.js";
import { useContext } from "react";

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
    <nav className="bg-slate-800 text-white px-6 py-4 shadow-md fixed top-0 left-0 right-0 z-1">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">Rehacktor</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 ml-auto">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Services
            </a>
          </li>
          {session ? (
            <li className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-medium transition">
                Ciao{" "}
                <span className=" text-yellow-400">
                  {session.user.user_metadata.first_name}
                </span>
                {console.log(session)}
                <svg
                  className="w-4 h-4 transform group-hover:rotate-180 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className="absolute right-0 mt-2 w-40 bg-slate-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-slate-700 transition"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    onClick={signOut}
                    className="block px-4 py-2 hover:bg-slate-700 transition cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-yellow-400 hover:text-yellow-300 font-medium transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-slate-800 font-semibold transition"
                >
                  Registrati
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

      {/* Mobile Menu (right aligned) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 flex justify-end">
          <ul className="space-y-4 text-right">
            <li>
              <a href="#" className="block text-white hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-blue-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-blue-400">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-blue-400">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
