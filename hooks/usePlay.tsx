import { useSpotify } from "./useSpotify";
import { useSession } from "next-auth/react";
import { useContext } from "react";

import toast from "react-hot-toast";

import { Context } from "../context/context";

// tracks need to be an array,
// everything else just a string
export const usePlay = (uri: string | string[], tracklistUri?: string) => {
  const spotifyApi = useSpotify();
  const { status } = useSession();

  const { playerErrors } = useContext(Context);

  try {
    // if it's a playlist, album or artist
    if (typeof uri === "string" && status === "authenticated") {
      return () => {
        if (playerErrors)
          toast.error(
            `
          To use the playback you need a premium account and an initialized device.
          To initiliaze a device you need to:
            \n1) Open spotify in a different tab
            \n2) Play any song/album/playlist/etc
            \n3) Refresh this page.
        `,
            {
              duration: 10000,
              style: { background: "#6e0202", color: "white" },
            }
          );
        else spotifyApi.play({ context_uri: uri });
      };
    }
    // if it's a track
    if (typeof uri === "object" && status === "authenticated") {
      // if the track is part of a tracklist, play from that point onwards
      if (tracklistUri) {
        return () => {
          if (playerErrors)
            toast.error(
              `
          To use the playback you need a premium account and an initialized device.
          To initiliaze a device you need to:
            \n1) Open spotify in a different tab
            \n2) Play any song/album/playlist/etc
            \n3) Refresh this page.
        `,
              {
                duration: 10000,
                style: { background: "#6e0202", color: "white" },
              }
            );
          else
            spotifyApi.play({
              context_uri: tracklistUri,
              offset: { uri: uri[0] },
            });
        };
      }
      // otherwise, just play that track
      return () => spotifyApi.play({ uris: uri });
    }
  } catch (err) {
    console.error(err);
  }
};
