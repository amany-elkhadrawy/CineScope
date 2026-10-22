import tmdbApi from "./tmdbApi";

export async function getTrendingMovies() {
  const response = await tmdbApi.get("/trending/movie/day");
  return response.data.results;
}