import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/getMovieDetails";
import { addToWatchlist, getWatchlist } from "../utils/watchlistStorage";
import { Bookmark } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [watchlist, setWatchlist] = useState(() => getWatchlist());
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {isLoading && <LoadingSpinner message="Loading movie details..." />}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!isLoading && !error && movie && (
         <div className="grid gap-8 md:grid-cols-3">
          {/* Movie Poster */}
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
              }
              alt={movie.title}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

        {/* Movie Information */}
    <div className="md:col-span-2">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
        {movie.title}
      </h1>

      {movie.tagline && (
        <p className="mb-5 italic text-gray-400">
          {movie.tagline}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <span className="text-yellow-400">
          ★ {movie.vote_average?.toFixed(1)}/10
        </span>

        <span className="text-gray-300">
          {movie.release_date || "Release date unavailable"}
        </span>

        {movie.runtime > 0 && (
          <span className="text-gray-300">
            {movie.runtime} min
          </span>
        )}
      </div>

      <h2 className="mb-3 text-xl font-semibold">Overview</h2>

      <p className="mb-6 leading-7 text-gray-300">
        {movie.overview || "No overview available."}
      </p>

      {movie.genres?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 font-semibold">Genres</h2>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {movie.production_companies?.length > 0 && (
        <p className="text-sm text-gray-400">
          Production:{" "}
          {movie.production_companies
            .map((company) => company.name)
            .slice(0, 3)
            .join(", ")}
        </p>
      )}
      <button
          onClick={() => {
            const updatedMovies = addToWatchlist(movie);
            setWatchlist(updatedMovies);
          }}
          disabled={watchlist.some((savedMovie) => savedMovie.id === movie.id)}
          className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
        >
          <Bookmark size={20} />
        
          {watchlist.some((savedMovie) => savedMovie.id === movie.id)
            ? "Saved to Watchlist"
            : "Add to Watchlist"}
      </button>

    </div>
         </div>
        )}
      </div>
    </section>
  );
}