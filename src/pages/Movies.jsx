import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/getPopularMovies";
import MovieCard from "../components/movies/MovieCard";
import Pagination from "../components/common/Pagination";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getPopularMovies(currentPage);
       setMovies(data.results);
       setTotalPages(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Failed to load movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [currentPage]);

  return (
    <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Discover <span className="text-red-500">Movies</span>
        </h1>

        <p className="mb-8 text-gray-400">
          Explore popular movies and find your next favorite.
        </p>
        {isLoading && <LoadingSpinner message="Loading movies..." />}
        {error && (
          <p className="py-10 text-center text-red-500">{error}</p>
        )}

        {!isLoading && !error && movies.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            No movies available right now.
          </p>
        )}

        {!isLoading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))} 
          </div>
        )}
        {!isLoading && !error && movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
           )}
          </div>
    </section>
  );
}