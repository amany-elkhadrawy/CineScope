import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingTVShows } from "../services/getTrendingTVShows";
import Pagination from "../components/common/Pagination";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function TVShow() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
  async function fetchTVShows() {
    try {
      setIsLoading(true);
      setError("");
      const data = await getTrendingTVShows(currentPage);
      setShows(data.results);
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (error) {
      console.error("Failed to fetch TV shows:", error);
      setError("Failed to load TV shows. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  fetchTVShows();
}, [currentPage]);
  return (
  <section className="min-h-screen bg-[#0B0B0F] px-6 py-12 text-white sm:px-8">
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
        Discover <span className="text-red-500">TV Shows</span>
      </h1>

      <p className="mb-8 text-gray-400">
        Explore trending TV shows and discover your next favorite series.
      </p>

      {isLoading && <LoadingSpinner message="Loading TV shows..." />}

      {error && (
        <p className="py-10 text-center text-red-500">{error}</p>
      )}

      {!isLoading && !error && shows.length === 0 && (
        <p className="py-10 text-center text-gray-400">
          No TV shows available right now.
        </p>
      )}

      {!isLoading && !error && shows.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {shows.map((show) => (
            <div
              key={show.id}
              onClick={() => navigate(`/tv/${show.id}`)}
              className="group cursor-pointer"
            >
              <img
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : "https://placehold.co/500x750/0B0B0F/FFFFFF?text=No+Poster"
                }
                alt={show.name}
                className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <h2 className="mt-3 line-clamp-1 font-semibold">
                {show.name}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                <span className="text-yellow-400">★</span>{" "}
                {show.vote_average?.toFixed(1)}/10
              </p>

              {show.first_air_date && (
                <p className="mt-1 text-sm text-gray-500">
                  {show.first_air_date.slice(0, 4)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
        {!isLoading && !error && shows.length > 0 && (
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
