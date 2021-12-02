import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface PlaylistData {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
}

export const usePlaylistInfo = (id: string) => {
  const [playlistData, setPlaylistData] = useState<PlaylistData>(
    {} as PlaylistData
  );

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const playlist = await spotifyApi.getPlaylist(id as string);
      const tracks = playlist.body.tracks.items
        .slice(0, 20)
        .map((item) => item.track);

      setPlaylistData({ playlist: playlist.body, tracks: tracks });
    };
    if (id && status === "authenticated") fetchPlaylistData();
  }, [id, spotifyApi, status]);

  return playlistData;
};
