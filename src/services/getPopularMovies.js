import tmdbApi from "./tmdbApi";

export async function getPopularMovies(page = 1) {
  const response = await tmdbApi.get("/movie/popular", {
    params: {
      page,
    },
  });

  return response.data;
}