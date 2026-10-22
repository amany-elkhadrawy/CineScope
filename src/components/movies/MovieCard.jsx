
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { addToWatchlist, getWatchlist } from "../../utils/watchlistStorage";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(() =>
    getWatchlist().some((savedMovie) => savedMovie.id === movie.id)
  );

  function handleAddToWatchlist(event) {
    event.stopPropagation();

    addToWatchlist(movie);
    setIsSaved(true);
  }

  return (
    <article
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group min-w-0 cursor-pointer"
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
        }
        alt={movie.title || "Movie poster"}
        loading="lazy"
        className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <h2 className="mt-3 line-clamp-1 font-semibold">
        {movie.title}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        <span className="text-yellow-400">★</span>{" "}
        {movie.vote_average?.toFixed(1) ?? "N/A"}/10
      </p>

      {movie.release_date && (
        <p className="mt-1 text-sm text-gray-500">
          {movie.release_date.slice(0, 4)}
        </p>
      )}

      <button
        type="button"
        onClick={handleAddToWatchlist}
        className="mt-3 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-red-600"
      >
        <Bookmark size={18} />
        {isSaved ? "Saved" : "Add to Watchlist"}
      </button>
    </article>
  );
}

