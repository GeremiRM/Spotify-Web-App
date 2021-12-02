import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface HomeData {
  recommendations: {
    [x: string]: SpotifyApi.TrackObjectFull[];
  }[];
  recentlyPlayed: SpotifyApi.TrackObjectFull[];
  featuredPlaylists: SpotifyApi.PlaylistObjectSimplified[];
  newReleases: SpotifyApi.AlbumObjectSimplified[];
  topArtists: SpotifyApi.ArtistObjectFull[];
}

const categories = [
  "min_popularity",
  "min_loudness",
  "min_danceability",
  "min_acousticness",
  "min_energy",
  "min_tempo",
  "min_instrumentalness",
  "min_liveness",
  "min_mode",
];

export const useHomeInfo = () => {
  const [homeData, setHomeData] = useState<HomeData>({} as HomeData);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchHomeData = async () => {
      const topArtists = await spotifyApi.getMyTopArtists();
      const newReleases = await spotifyApi.getNewReleases({ limit: 50 });
      const featuredPlaylists = await spotifyApi.getFeaturedPlaylists({
        limit: 50,
      });

      const recentlyPlayed = (
        await spotifyApi.getMyRecentlyPlayedTracks()
      ).body.items.map((item) => item.track);

      const recommendations = await Promise.all(
        categories.map(async (category) => {
          const playlist = await spotifyApi.getRecommendations({
            seed_artists: [
              topArtists.body.items[0].id,
              topArtists.body.items[1].id,
            ],
            seed_tracks: [recentlyPlayed[0].id, recentlyPlayed[1].id],
            [category]: 50,
          });
          // ex: min_popularity: playlists
          return { [category]: playlist.body.tracks };
        })
      );

      setHomeData({
        recommendations: recommendations,
        recentlyPlayed: recentlyPlayed,
        featuredPlaylists: featuredPlaylists.body.playlists.items,
        newReleases: newReleases.body.albums.items,
        topArtists: topArtists.body.items,
      });
    };

    if (status === "authenticated") fetchHomeData();
  }, [spotifyApi, status]);

  return homeData;
};
