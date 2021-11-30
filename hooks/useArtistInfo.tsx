import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface ArtistData {
  artist: SpotifyApi.SingleArtistResponse;
  albums: SpotifyApi.AlbumObjectSimplified[];
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
      const albums = await spotifyApi.getArtistAlbums(id as string);
      const topTracks = await spotifyApi.getArtistTopTracks(id as string, "US");
      const otherArtists = await spotifyApi.getArtistRelatedArtists(
        id as string
      );

      setArtistData({
        artist: artist.body,
        albums: albums.body.items,
        topTracks: topTracks.body.tracks,
        otherArtists: otherArtists.body.artists,
      });
    };
    if (id && status === "authenticated") fetchArtistData();
  }, [id, spotifyApi, status]);

  return artistData;
};
