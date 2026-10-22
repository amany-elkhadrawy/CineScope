import { NavLink } from "react-router-dom";
import { Clapperboard, Search, Bookmark } from "lucide-react";

const linkClass = ({ isActive }) =>
  `shrink-0 whitespace-nowrap transition-colors duration-200 hover:text-red-500 ${
    isActive ? "text-red-500 font-semibold" : "text-gray-300"
  }`;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/95 px-4 py-4 text-white backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2 group"
        >
          <Clapperboard
            size={26}
            strokeWidth={2.2}
            className="text-red-500 transition-transform duration-300 group-hover:scale-110 sm:size-[30px]"
          />

          <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Cine<span className="text-red-500">Scope</span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto text-sm sm:gap-6 sm:text-base lg:gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/movies" className={linkClass}>
            Movies
          </NavLink>

          <NavLink to="/tv-shows" className={linkClass}>
            TV Shows
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <NavLink
            to="/search"
            aria-label="Search"
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Search size={21} strokeWidth={1.8} />
          </NavLink>

          <NavLink
            to="/watchlist"
            aria-label="Watchlist"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-2 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-red-500/50 hover:text-white sm:px-3"
          >
            <Bookmark size={18} strokeWidth={1.8} />
            <span className="hidden sm:inline">Watchlist</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

