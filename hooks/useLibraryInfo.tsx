import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

type Library = {
  library: {
    playlists: SpotifyApi.PlaylistObjectSimplified[];
    artists: SpotifyApi.ArtistObjectFull[];
    albums: SpotifyApi.AlbumObjectFull[];
  };
  likedSongs: SpotifyApi.TrackObjectFull[];
};

export const useLibraryInfo = () => {
  const [libraryData, setLibraryData] = useState<Library>({} as Library);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchLibraryData = async () => {
      const playlists = await spotifyApi.getUserPlaylists();
      const artists = await spotifyApi.getFollowedArtists();
      const albums = await (
        await spotifyApi.getMySavedAlbums()
      ).body.items.map((item) => item.album);

      const tracks = await (
        await spotifyApi.getMySavedTracks()
      ).body.items.map((item) => item.track);

      setLibraryData({
        library: {
          playlists: playlists.body.items,
          artists: artists.body.artists.items,
          albums: albums,
        },
        likedSongs: tracks,
      });
    };

    if (status === "authenticated") fetchLibraryData();
  }, [spotifyApi, status]);

  return libraryData;
};
