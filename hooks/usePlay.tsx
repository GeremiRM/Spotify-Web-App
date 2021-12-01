import { useSpotify } from "./useSpotify";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// tracks need to be an array,
// everything else just a string
export const usePlay = (uri: string | string[]) => {
  const spotifyApi = useSpotify();
  const { status } = useSession();

  // if it's a playlist, album or artist
  if (typeof uri === "string" && status === "authenticated") {
    return () => spotifyApi.play({ context_uri: uri });
  }

  // if it's a track
  if (typeof uri === "object" && status === "authenticated")
    return () => spotifyApi.play({ uris: uri });
};
