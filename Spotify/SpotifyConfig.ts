import queryString from "query-string";
import SpotifyWebApi from "spotify-web-api-node";

const AUTH_URL = "https://accounts.spotify.com/authorize?";
const SCOPES = [
  "user-library-modify",
  "user-library-read",
  "user-follow-modify",
  "user-follow-read",
  "streaming",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-currently-playing",
  "user-read-playback-state",
].join("%20");

// Whether or not to force the user to approve the app again
const DIALOG = true;

const SPOTIFY_URL =
  AUTH_URL +
  queryString.stringify({
    scope: SCOPES,
    response_type: "code",
    show_dialog: DIALOG,
  });

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
});

export { SPOTIFY_URL, spotifyApi };
