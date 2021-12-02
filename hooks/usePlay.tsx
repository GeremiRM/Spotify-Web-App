import { useSpotify } from "./useSpotify";
import { useSession } from "next-auth/react";

// tracks need to be an array,
// everything else just a string
export const usePlay = (uri: string | string[], tracklistUri?: string) => {
  const spotifyApi = useSpotify();
  const { status } = useSession();

  // if it's a playlist, album or artist
  if (typeof uri === "string" && status === "authenticated") {
    return () => spotifyApi.play({ context_uri: uri });
  }
  // if it's a track
  if (typeof uri === "object" && status === "authenticated") {
    // if the track is part of a tracklist, play from that point onwards
    if (tracklistUri) {
      return () =>
        spotifyApi.play({ context_uri: tracklistUri, offset: { uri: uri[0] } });
    }
    // otherwise, just play that track
    return () => spotifyApi.play({ uris: uri });
  }
};
