import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface ArtistData {
  artist: SpotifyApi.SingleArtistResponse;
  albums: SpotifyApi.AlbumObjectSimplified[];
  singles: SpotifyApi.AlbumObjectSimplified[];
  appears_on: SpotifyApi.AlbumObjectSimplified[];
  topTracks: SpotifyApi.TrackObjectFull[];
  otherArtists: SpotifyApi.ArtistObjectFull[];
}

export const useArtistInfo = (id: string) => {
  const [artistData, setArtistData] = useState<ArtistData>({} as ArtistData);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchArtistData = async () => {
      const artist = await spotifyApi.getArtist(id as string);
      const albums = await spotifyApi.getArtistAlbums(id as string, {
        limit: 50,
        include_groups: "album",
      });
      const singles = await spotifyApi.getArtistAlbums(id as string, {
        limit: 50,
        include_groups: "single",
      });
      const appears_on = await spotifyApi.getArtistAlbums(id as string, {
        limit: 50,
        include_groups: "appears_on",
      });
      const topTracks = await spotifyApi.getArtistTopTracks(id as string, "US");
      const otherArtists = await spotifyApi.getArtistRelatedArtists(
        id as string
      );

      setArtistData({
        artist: artist.body,
        albums: albums.body.items,
        singles: singles.body.items,
        appears_on: appears_on.body.items,
        topTracks: topTracks.body.tracks,
        otherArtists: otherArtists.body.artists,
      });
    };
    if (id && status === "authenticated") fetchArtistData();
  }, [id, spotifyApi, status]);

  return artistData;
};
