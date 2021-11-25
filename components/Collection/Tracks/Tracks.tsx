import React, { useEffect, useState } from "react";

import styles from "./Tracks.module.scss";

import { Header } from "../../Header/Header";
import { Layout } from "../../Layout/Layout";
import { Tracklist } from "../../Shared/Tracklist";

type Tracks = SpotifyApi.TrackObjectFull[];

// functions
import { getUserLikedSongs } from "../../../Spotify/SpotifyApi";

export const Tracks: React.FC<{}> = ({}) => {
  const [tracks, setTracks] = useState<Tracks>([] as Tracks);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserLikedSongs();
      setTracks(data);
    };
    getData();
  }, []);

  return (
    <Layout>
      <Header />
      <div className={styles.tracks}>
        <Tracklist tracks={tracks!} />
      </div>
    </Layout>
  );
};
