import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/getTrendingMovies";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/movies/MovieCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const featuredMovie = movies[0];
  const navigate = useNavigate();
  const featuredMovieImage = featuredMovie?.backdrop_path
  ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
  : "";

  useEffect(() => {
    getTrendingMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        return error
      })
      .finally(()=>{
        setIsLoading(false)
      });
  }, []);
  return (<>
   <section className="relative min-h-[600px] bg-[#0B0B0F] bg-cover bg-center text-white"
      style={{
       backgroundImage: featuredMovieImage
      ? `linear-gradient(to right, #0B0B0F 20%, rgba(11, 11, 15, 0.85) 50%, rgba(11, 11, 15, 0.2) 100%), url("${featuredMovieImage}")`
      : "none",
    }}>
      <div className="mx-auto flex min-h-[600px] max-w-7xl items-center px-6 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Featured Movie
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl">
             {featuredMovie?.title || "Discover Your Next Favorite"}
          </h1>
          
          {featuredMovie && (
            <p className="mb-5 flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="text-yellow-400">
                ★ {featuredMovie.vote_average.toFixed(1)}/10
              </span>
          
              {featuredMovie.release_date && (
                <span className="text-gray-300">
                  {featuredMovie.release_date.slice(0, 4)}
                </span>
              )}
          
              <span className="text-gray-400">TMDB</span>
            </p>
          )}


          <p className="max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            {featuredMovie?.overview || "Explore amazing movies and TV shows, discover new stories, and find your next favorite to watch."}
          </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
              onClick={() => navigate(`/movie/${featuredMovie.id}`)}
              disabled={!featuredMovie}
               className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700">
                View Details
              </button>
            
              <button
              onClick={() => navigate("/movies")}
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5">
                Explore Movies
              </button>
            </div>
        </div>
      </div>
    </section>
   
    <section className="bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
          Trending <span className="text-red-500">Movies</span>
        </h2>
        {isLoading && <LoadingSpinner message="Loading trending movies..." />}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
               {movies.map((movie) => (
               <MovieCard key={movie.id} movie={movie} />
         ))}
         </div>
      </div>
    </section>
  </>
  );
}