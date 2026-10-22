import tmdbApi from "./tmdbApi";

export async function getTVShowDetails(showId) {
  const response = await tmdbApi.get(`/tv/${showId}`);

  return response.data;
}