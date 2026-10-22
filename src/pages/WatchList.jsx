import { useEffect, useState } from "react";
import {getWatchlist, removeFromWatchlist} from "../utils/watchlistStorage";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  return (
    <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">
          My <span className="text-red-500">Watchlist</span>
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">
            Your watchlist is empty. Add some movies to get started!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <div key={movie.id} className="group">
                <img
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
                  }
                  alt={movie.title}
                  className="w-full cursor-pointer rounded-xl object-cover"
                />

                <h2 onClick={() => navigate(`/movie/${movie.id}`)} className="mt-3 cursor-pointer font-semibold transition hover:text-red-500">
                     {movie.title}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  ⭐ {movie.vote_average?.toFixed(1)}/10
                </p>
                <button
                  onClick={() => {
                    const updatedMovies = removeFromWatchlist(movie.id);
                    setMovies(updatedMovies);
                  }}
                  className="mt-3 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}