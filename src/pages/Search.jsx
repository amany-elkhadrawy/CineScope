import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchMovies } from "../services/searchMovies";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSearch(event) {
  event.preventDefault();

  if (!query.trim()) {
    setMovies([]);
    setError("Please enter a movie name.");
    return;
  }

  try {
    setIsLoading(true);
    setError("");

    const results = await searchMovies(query);

    setMovies(results);
  } catch (error) {
    console.error("Search failed:", error);
    setError("Something went wrong. Please try again.");
    setMovies([]);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Discover <span className="text-red-500">Movies</span>
        </h1>

        <p className="mb-8 text-gray-400">
          Search for your favorite movies and discover something new.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex max-w-2xl gap-3"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-red-500">
            <SearchIcon size={20} className="text-gray-400" />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movies..."
              className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-red-600 px-6 font-semibold transition hover:bg-red-700"
          >
            Search
          </button>
        </form>
        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Searching..." />}

      {/* Error Message */}
       {error && (
  <p className="mt-8 text-center text-red-500">
    {error}
  </p>
       )}

      {/* Search Results */}
       {!isLoading && movies.length > 0 && (
  <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {movies.map((movie) => (
      <div key={movie.id} className="group cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
          }
          alt={movie.title}
          className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <h2 className="mt-3 line-clamp-1 font-semibold">
          {movie.title}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          <span className="text-yellow-400">★</span>{" "}
          {movie.vote_average?.toFixed(1)}/10
        </p>
      </div>
    ))}
  </div>
       )}

      {/* Empty Results */}
        {!isLoading && query.trim() !== "" && !error && movies.length === 0 && (
  <p className="mt-8 text-center text-gray-400">
    No movies found. Try another title.
  </p>
        )}
      </div>
    </section>
  );
}