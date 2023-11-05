const clientId = "604d93ca15cd466fbde723e80e87d930";
const redirectUri = "http://localhost:3000/";
const scope = "";

export const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = window.crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest("SHA-256", data);
};

export const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const genLoginUrl = async (): Promise<string> => {
  let codeVerifier = localStorage.getItem("code_verifier");
  if (!codeVerifier) {
    codeVerifier = generateRandomString(64);
    localStorage.setItem("code_verifier", codeVerifier);
  }

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams(params).toString();

  return authUrl.toString();
};

export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) throw new Error("No refresh token found");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  try {
    const body = await fetch("https://accounts.spotify.com/api/token", payload);

    if (!body.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return false;
    }

    const response = await body.json();
    localStorage.setItem("access_token", response.access_token);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const saveNewAccessToken = async (code: string): Promise<void> => {
  const currentToken = localStorage.getItem("access_token");
  if (currentToken) return;

  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) throw new Error("No code verifier found");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
  } catch (e) {
    console.log(e);
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};
