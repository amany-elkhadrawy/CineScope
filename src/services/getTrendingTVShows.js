import tmdbApi from "./tmdbApi";

export async function getTrendingTVShows(page = 1) {
  const response = await tmdbApi.get("/trending/tv/day", {
    params: {
      page,
    },
  });

  return response.data;
}