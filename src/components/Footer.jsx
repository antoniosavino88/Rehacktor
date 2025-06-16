import { Link } from "react-router";
import logoBig from "../assets/logoBig.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-text py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonna 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-accent">DailyRespawn</h2>
          <p className="text-sm text-gray-400 italic">
            Dove ogni partita è una nuova storia
          </p>
          <img src={logoBig} className="w-30 hidden lg:block" alt="" />
        </div>

        {/* Colonna 2 - Link utili */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Colonna 3 - Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow me</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/antonio-savino-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24V7.98h5V24H0zm7.98-16.02h4.78v2.16h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.33c0-1.75-.03-4-2.45-4-2.45 0-2.82 1.91-2.82 3.88V24h-5V7.98z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Divider + copyright */}
      <div className="mt-10 border-t border-tertiary pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DailyRespawn. All rights reserved.
      </div>
    </footer>
  );
}
