import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { useSpotify } from "./useSpotify";

interface PlaylistData {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
  isFollowingPlaylist: boolean;
}

export const usePlaylistInfo = (id: string) => {
  const { user } = useContext(Context);

  const [playlistData, setPlaylistData] = useState<PlaylistData>(
    {} as PlaylistData
  );

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const playlist = await spotifyApi.getPlaylist(id as string);
      const tracks = playlist.body.tracks.items.map((item) => item.track);
      const isFollowing = await spotifyApi.areFollowingPlaylist(
        playlist.body.owner.id,
        playlist.body.id,
        [user.id]
      );

      setPlaylistData({
        playlist: playlist.body,
        tracks: tracks,
        isFollowingPlaylist: isFollowing.body[0],
      });
    };
    if (id && status === "authenticated" && user) fetchPlaylistData();
  }, [id, spotifyApi, status, user]);

  return playlistData;
};
