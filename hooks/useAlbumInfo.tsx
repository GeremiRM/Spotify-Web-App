import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface AlbumData {
  album: SpotifyApi.AlbumObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
  otherAlbums: SpotifyApi.AlbumObjectSimplified[];
  isSavedAlbum: boolean;
}

export const useAlbumInfo = (id: string) => {
  const [albumData, setAlbumData] = useState<AlbumData>({} as AlbumData);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchAlbumData = async () => {
      const album = await spotifyApi.getAlbum(id);
      const artists = await spotifyApi.getArtists(
        album.body.artists.map((artist) => artist.id)
      );
      const artistAlbums = await spotifyApi.getArtistAlbums(
        artists.body.artists[0].id,
        { include_groups: "album" }
      );

      const isSaved = await spotifyApi.containsMySavedAlbums([id]);

      setAlbumData({
        album: album.body,
        artists: artists.body.artists,
        otherAlbums: artistAlbums.body.items,
        isSavedAlbum: isSaved.body[0],
      });
    };
    if (status === "authenticated" && id) fetchAlbumData();
  }, [id, spotifyApi, status]);

  return albumData;
};
