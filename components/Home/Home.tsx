import React, { useEffect, useState } from "react";

import { Layout } from "../Layout/Layout";
import { Header } from "../Header/Header";
import {
  getUser,
  getFeaturedPlaylists,
  getUserRecommendations,
  getUserRecentlyPlayedTracks,
  getNewReleases,
  getUserTopArtists,
} from "../../Spotify/SpotifyApi";

import styles from "./Home.module.scss";
import { Cards } from "../Shared/Cards";

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

  useEffect(() => {
    const getData = async () => {
      const data = await getUser();
      const recs = await getUserRecommendations();
      const featuredPlaylists = await getFeaturedPlaylists();
      const recentlyPlayed = await getUserRecentlyPlayedTracks();
      const newReleases = await getNewReleases();
      const topArtists = await getUserTopArtists();

      setUser(data);
      setUserPlaylists({
        recs: recs,
        recentlyPlayed: recentlyPlayed,
        featured: featuredPlaylists,
        newReleases: newReleases,
        topArtists: topArtists,
      });
    };
    getData();
  }, []);

  const renderTrackCards = () => {
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

  if (
    Object.keys(user!).length === 0 ||
    Object.keys(userPlaylists).length === 0
  )
    return <></>;

  return (
    <Layout>
      <Header />
      <div className={styles.home}>
        <div className={styles.home__body}>
          <div className={styles.home__results}>{renderTrackCards()}</div>
        </div>
      </div>
    </Layout>
  );
};
