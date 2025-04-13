import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`bg-white dark:bg-gray-800 border-b shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-orange-500 dark:text-orange-300 text-3xl font-bold"
          >
            Habit Tracker
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6">
              {[
                { path: "/", name: "Home" },
                { path: "/habits", name: "Habits" },
                { path: "/calendar", name: "Calendar" },
                { path: "/progress", name: "Progress" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-orange-500 dark:text-orange-300 hover:text-orange-600 dark:hover:text-orange-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-orange-500 dark:text-orange-300 hover:text-orange-600 dark:hover:text-orange-400"
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
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-4 space-y-2">
            {[
              { path: "/", name: "Home" },
              { path: "/habits", name: "Habits" },
              { path: "/calendar", name: "Calendar" },
              { path: "/progress", name: "Progress" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base ${
                    isActive
                      ? "bg-orange-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                      : "text-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-orange-500 dark:bg-orange-600 shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </nav>
  );
};

export default Navbar;