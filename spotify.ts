import queryString from "query-string";

const AUTH_URL = "https://accounts.spotify.com/authorize?";
const CLIENT_ID = "a03ca82d335e44e3a1da43b717149629";
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = [
  "user-library-modify",
  "user-library-read",
  "user-follow-modify",
  "user-follow-read",
  "streaming",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
].join("%20");

// Whether or not to force the user to approve the app again
const DIALOG = true;

const URL =
  AUTH_URL +
  queryString.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: "code",
    show_dialog: DIALOG,
  });

export default URL;
