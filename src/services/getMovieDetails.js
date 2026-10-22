import tmdbApi from "./tmdbApi";

export async function getMovieDetails(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}`);

  return response.data;
}