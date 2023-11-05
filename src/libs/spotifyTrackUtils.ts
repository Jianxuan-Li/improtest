import { get } from "./spotifyApiUtils";

export const searchTracks = async (
  query: string,
  offset: number = 0,
  limit: number = 10
): Promise<SpotifyApi.TrackSearchResponse> => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("q", query);
  url.searchParams.append("type", "track");
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());

  const resp = await get(url.toString());

  // update current url by adding query params
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("q", query);
  nextUrl.searchParams.set("limit", limit.toString());
  nextUrl.searchParams.set("offset", offset.toString());
  window.history.pushState({}, "", nextUrl.toString());

  return resp;
};
