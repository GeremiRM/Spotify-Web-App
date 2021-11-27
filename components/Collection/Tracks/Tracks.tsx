import { useEffect, useState } from "react";

import styles from "./Tracks.module.scss";

import { Header } from "../../Header/Header";
import { Tracklist } from "../../Common/Tracklist";
import { Banner } from "./Banner";

type Tracks = SpotifyApi.TrackObjectFull[];

// functions
import { useSpotify } from "../../../hooks/useSpotify";
import { useSession } from "next-auth/react";

export const Tracks: React.FC<{}> = ({}) => {
  const [tracks, setTracks] = useState<Tracks>([] as Tracks);

  const { status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getMySavedTracks();
      const savedTracks = data.body.items.map((item) => item.track);
      setTracks(savedTracks);
    };
    if (status === "authenticated") getData();
  }, [spotifyApi, status]);

  return (
    <div>
      <Header />
      <div className={styles.tracks}>
        <Banner amountSongs={tracks.length} />
        <Tracklist tracks={tracks!} />
      </div>
    </div>
  );
};
