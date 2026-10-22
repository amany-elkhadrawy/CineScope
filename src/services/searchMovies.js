import tmdbApi from "./tmdbApi";

export async function searchMovies(query) {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data.results;
}