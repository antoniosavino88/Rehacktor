export default function Header() {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">Rehacktor</div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Services
            </a>
          </li>

          {/* Account Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-200">
              Account
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
              </svg>
            </button>
            <ul className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-50">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-slate-100">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-slate-100">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-slate-100">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
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
    </nav>
  );
}
