import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

interface HomeData {
  // recommendations: {
  //   [x: string]: SpotifyApi.TrackObjectFull[];
  // }[];
  recentlyPlayed: SpotifyApi.TrackObjectFull[] | null;
  featuredPlaylists: SpotifyApi.PlaylistObjectSimplified[];
  newReleases: SpotifyApi.AlbumObjectSimplified[];
  topArtists: SpotifyApi.ArtistObjectFull[] | null;
}

// const categories = [
//   "min_popularity",
//   "min_loudness",
//   "min_danceability",
//   "min_acousticness",
//   "min_energy",
//   "min_tempo",
//   "min_instrumentalness",
//   "min_liveness",
//   "min_mode",
// ];

export const useHomeInfo = () => {
  const [homeData, setHomeData] = useState<HomeData>({} as HomeData);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const topArtists = await spotifyApi.getMyTopArtists({ limit: 50 });
        const newReleases = await spotifyApi.getNewReleases({ limit: 50 });
        const featuredPlaylists = await spotifyApi.getFeaturedPlaylists({
          limit: 50,
        });

        const tracks = (
          await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 })
        ).body.items.map((item) => item.track);

        const recentlyPlayed =
          Object.keys(tracks).length > 0
            ? await spotifyApi.getTracks(tracks.map((track) => track.id))
            : null;

        // const recommendations = await Promise.all(
        //   categories.map(async (category) => {
        //     const playlist = await spotifyApi.getRecommendations({
        //       seed_artists: [
        //         topArtists.body.items[0].id,
        //         topArtists.body.items[1].id,
        //       ],
        //       seed_tracks: [recentlyPlayed[0].id, recentlyPlayed[1].id],
        //       [category]: 50,
        //     });
        //     // ex: min_popularity: playlists
        //     return { [category]: playlist.body.tracks };
        //   })
        // );

        setHomeData({
          // recommendations: recommendations,
          recentlyPlayed: recentlyPlayed ? recentlyPlayed.body.tracks : null,
          featuredPlaylists: featuredPlaylists.body.playlists.items,
          newReleases: newReleases.body.albums.items,
          topArtists: topArtists.body.items,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (status === "authenticated") fetchHomeData();
  }, [spotifyApi, status]);

  return homeData;
};
