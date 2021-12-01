import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";
import { useSession } from "next-auth/react";

type PlaybackState = SpotifyApi.CurrentPlaybackResponse;

export const usePlaybackInfo = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(
    {} as PlaybackState
  );
  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchPlaybackData = async () => {
      const playback = await spotifyApi.getMyCurrentPlaybackState();
      setPlaybackState(playback.body);
    };

    if (status === "authenticated") fetchPlaybackData();
  }, [spotifyApi, status]);

  return playbackState;
};
