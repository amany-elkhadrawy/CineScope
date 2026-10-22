import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTVShowDetails } from "../services/getTVShowDetails";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function TVDetails() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  async function fetchTVShowDetails() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getTVShowDetails(id);

      setShow(data);
    } catch (error) {
      console.error("Failed to fetch TV show details:", error);
      setError("Failed to load TV show details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  fetchTVShowDetails();
}, [id]);

 
if (isLoading) {
  return <LoadingSpinner message="Loading TV show details..." />;
}

if (error) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] py-20 text-center text-red-500">
      {error}
    </div>
  );
}

if (!show) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] py-20 text-center text-white">
      TV show not found.
    </div>
  );
}

return (
  <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[300px_1fr]">
      <img
        src={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
        }
        alt={show.name}
        className="w-full rounded-2xl"
      />

      <div>
        <h1 className="text-3xl font-bold sm:text-5xl">
          {show.name}
        </h1>

        {show.tagline && (
          <p className="mt-3 italic text-gray-400">
            {show.tagline}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-300">
          <span>
            ⭐ {show.vote_average?.toFixed(1)}/10
          </span>

          {show.first_air_date && (
            <span>First aired: {show.first_air_date}</span>
          )}

          {show.number_of_seasons && (
            <span>Seasons: {show.number_of_seasons}</span>
          )}

          {show.number_of_episodes && (
            <span>Episodes: {show.number_of_episodes}</span>
          )}
        </div>

        <h2 className="mt-8 text-xl font-semibold">Overview</h2>

        <p className="mt-3 leading-7 text-gray-300">
          {show.overview || "No overview available."}
        </p>

        {show.genres?.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 font-semibold">Genres</h2>

            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {show.created_by?.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 font-semibold">Created By</h2>

            <p className="text-gray-300">
              {show.created_by.map((creator) => creator.name).join(", ")}
            </p>
          </div>
        )}

        {show.networks?.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 font-semibold">Networks</h2>

            <p className="text-gray-300">
              {show.networks.map((network) => network.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
);
}