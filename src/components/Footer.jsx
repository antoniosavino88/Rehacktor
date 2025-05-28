export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonna 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Rehacktor</h2>
          <p className="text-sm text-gray-400">
            Costruiamo esperienze digitali con passione e precisione.
          </p>
        </div>

        {/* Colonna 2 - Link utili */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <ul className="space-y-2">
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
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Colonna 3 - Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.9-3.9h2.6v3H15a1 1 0 0 0-1 1V12h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21 6.6a8.38 8.38 0 0 1-2.4.66A4.2 4.2 0 0 0 20.4 5a8.38 8.38 0 0 1-2.67 1A4.2 4.2 0 0 0 12 9.2v.5A12 12 0 0 1 3 5.3a4.2 4.2 0 0 0 1.3 5.6A4.2 4.2 0 0 1 2.8 10v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 19.5a12 12 0 0 0 6.5 1.9c7.8 0 12-6.5 12-12v-.5a8.5 8.5 0 0 0 2-2.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.1C6.5 2.1 2.1 6.5 2.1 12c0 4.4 3.1 8 7.2 8.9v-6.3H7.1V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.9 0 1.9.2 1.9.2v2h-1.1c-1.1 0-1.4.7-1.4 1.3V12h2.4l-.4 2.6h-2v6.3c4.1-.9 7.2-4.5 7.2-8.9 0-5.5-4.4-9.9-9.9-9.9z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Divider + copyright */}
      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Rehacktor. All rights reserved.
      </div>
    </footer>
  );
}
