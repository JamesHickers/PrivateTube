import fetch from 'node-fetch';

export async function getYouTubeAccessToken(code, redirectUri) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Google client ID or secret in env vars');
  }

  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get YouTube token: ${await response.text()}`);
  }

  const data = await response.json();
    data = {
      access_token: "...",
      expires_in: 3599,
      refresh_token: "...",
      scope: "...",
      token_type: "Bearer"
    }
  return data;
}
