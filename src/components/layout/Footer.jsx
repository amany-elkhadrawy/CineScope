
import { Clapperboard } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0F] text-white border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <NavLink to="/" className="inline-flex items-center gap-2">
                <Clapperboard
                  size={26}
                  className="text-red-500"
                />
          
                <span className="text-2xl font-extrabold tracking-tight">
                  Cine<span className="text-red-500">Scope</span>
                </span>
              </NavLink>
          
              <p className="max-w-sm text-sm leading-7 text-gray-400">
                Discover your next favorite movie or TV show.
                Explore trending titles, find hidden gems, and
                keep track of what you love.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Explore
              </h3>
            
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <NavLink to="/" className="transition-colors hover:text-red-500">
                    Home
                  </NavLink>
                </li>
            
                <li>
                  <NavLink to="/movies" className="transition-colors hover:text-red-500">
                    Movies
                  </NavLink>
                </li>
            
                <li>
                  <NavLink to="/tv-shows" className="transition-colors hover:text-red-500">
                    TV Shows
                  </NavLink>
                </li>
            
                <li>
                  <NavLink to="/watchlist" className="transition-colors hover:text-red-500">
                    Watchlist
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* About */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                About CineScope
              </h3>
            
              <p className="max-w-xs text-sm leading-7 text-gray-400">
                Your guide to the world of movies and TV shows.
                Find something amazing to watch, every time.
              </p>
            
              <div className="mt-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span className="text-xs text-gray-500">
                  Made for movie lovers
                </span>
              </div>
            </div>
          </div>
      </div>
      
{/* Bottom Footer */}
<div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-center">
  <p className="text-xs text-gray-500">
    © {new Date().getFullYear()} CineScope. All rights reserved.
  </p>

  <p className="text-xs text-gray-500">
    Made for movie lovers 🎬
  </p>
</div>


    </footer>
  );
}


