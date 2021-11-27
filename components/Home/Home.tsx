import React, { useEffect, useState } from "react";

import { Header } from "../Header/Header";

import styles from "./Home.module.scss";
import { Cards } from "../Common/Cards";
import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";

type User = SpotifyApi.CurrentUsersProfileResponse;
type FeaturedPlaylists = SpotifyApi.PlaylistObjectSimplified[];
type Tracks = SpotifyApi.TrackObjectFull[];
type NewReleases = SpotifyApi.AlbumObjectSimplified[];
type FavArtists = SpotifyApi.ArtistObjectFull[];

type UserPlaylists = {
  featured: FeaturedPlaylists;
  recs: Tracks;
  newReleases: NewReleases;
  topArtists: FavArtists;
  recentlyPlayed: Tracks;
};

const cardsTitles = {
  featured: "Featured Playlists",
  recs: "Recommended for you",
  newReleases: "New Releases",
  topArtists: "Your favorite artists",
  recentlyPlayed: "Recently Played",
};

export const Home: React.FC<{}> = ({}) => {
  const [user, setUser] = useState<User>({} as User);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylists>(
    {} as UserPlaylists
  );

  const { status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getMe();
      const topArtists = await spotifyApi.getMyTopArtists();
      const newReleases = await spotifyApi.getNewReleases();
      const featuredPlaylists = await spotifyApi.getFeaturedPlaylists();

      const recentlyPlayed = await (
        await spotifyApi.getMyRecentlyPlayedTracks()
      ).body.items.map((item) => item.track);

      const recs = await spotifyApi.getRecommendations({
        seed_artists: [
          topArtists.body.items[0].id,
          topArtists.body.items[1].id,
        ],
        min_popularity: 40,
      });

      setUser(data.body);
      setUserPlaylists({
        recs: recs.body.tracks,
        recentlyPlayed: recentlyPlayed,
        featured: featuredPlaylists.body.playlists.items,
        newReleases: newReleases.body.albums.items,
        topArtists: topArtists.body.items,
      });
    };
    if (status === "authenticated") getData();
  }, [spotifyApi, status]);

  const renderCards = () => {
    let cards = [];
    for (let type in userPlaylists) {
      // @ts-expect-error
      const data = userPlaylists[type];
      if (data?.length > 0) {
        cards.push(
          // @ts-expect-error
          <Cards data={data} title={cardsTitles[type]} key={type} hideLink />
        );
      }
    }
    return cards;
  };

  return (
    <div>
      <Header />
      {Object.keys(user!).length !== 0 &&
        Object.keys(userPlaylists).length !== 0 && (
          <div className={styles.home}>
            <div className={styles.home__body}>
              <div className={styles.home__results}>{renderCards()}</div>
            </div>
          </div>
        )}
    </div>
  );
};
