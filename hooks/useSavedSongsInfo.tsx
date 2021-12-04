import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

type SavedSongsData = SpotifyApi.TrackObjectFull[];

export const useSavedSongsInfo = () => {
  const [savedSongsData, setSavedSongsData] = useState<SavedSongsData>([]);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchSavedSongsData = async () => {
      let songsTotal = 1000;
      let savedTracks: SavedSongsData = [];

      while (savedTracks.length < songsTotal) {
        const data = await spotifyApi.getMySavedTracks({
          offset: savedTracks.length,
        });
        songsTotal = data.body.total;
        savedTracks = savedTracks.concat(
          data.body.items.map((item) => item.track)
        );
      }

      setSavedSongsData(savedTracks);
    };

    if (status === "authenticated") fetchSavedSongsData();
  }, [spotifyApi, status]);

  return savedSongsData;
};
