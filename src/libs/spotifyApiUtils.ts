import { getAccessToken, refreshAccessToken } from "./spotifyAuthUtils";

export const get = async (url: string): Promise<any> => {
  const token = getAccessToken();

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (resp.status === 401) {
    if (await refreshAccessToken()) {
      return get(url);
    } else {
      window.location.href = "/";
    }
  }

  return resp.json();
};
