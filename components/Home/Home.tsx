import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";

// components
import { Header } from "../Header/Header";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Home.module.scss";
import { useHomeInfo } from "../../hooks/useHomeInfo";
import Card from "../Common/Card";

// types
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

const cardsTitles = {};

export const Home: React.FC<{}> = ({}) => {
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylists>(
    {} as UserPlaylists
  );

  const {
    newReleases,
    featuredPlaylists,
    recentlyPlayed,
    recommendations,
    topArtists,
  } = useHomeInfo();

  // if data hasn't finished fetching, return nothing

  if (
    !newReleases ||
    !featuredPlaylists ||
    !recentlyPlayed ||
    !recommendations ||
    !topArtists
  )
    return <></>;

  return (
    <div>
      <Header />

      <div className={styles.home}>
        <div className={styles.home__body}>
          <div className={styles.home__results}>
            <Cards data={featuredPlaylists} title="Featured Playlists" />
            <Cards data={newReleases} title="New Releases" />
            <Cards data={topArtists} title="Your Favorite Artists" />
            <Cards data={recentlyPlayed} title="Recently Played" />
          </div>
        </div>
      </div>
    </div>
  );
};
