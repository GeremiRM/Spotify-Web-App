import { useContext } from "react";
import Head from "next/head";

// styling
import styles from "./Layout.module.scss";

// components
import { Sidebar } from "./Sidebar/Sidebar";
import { Player } from "./Player/Player";
import { Lyrics } from "../Lyrics/Lyrics";

import { Context } from "../../context/context";

export const Layout: React.FC<{}> = ({ children }) => {
  const { playingTrack, displayLyrics } = useContext(Context);

  return (
    <>
      <Head>
        {/* If there's a track playing, make it the title */}
        <title>
          {`${
            Object.keys(playingTrack).length > 0
              ? `${playingTrack.name} - ${playingTrack.artists[0].name}`
              : "Spotify"
          }`}
        </title>
        <link rel="icon" href="/icons/spotify.png" />
      </Head>
      <div className={styles.layout}>
        <div className={styles.dashboard}>
          <Sidebar />

          {/* If page is loading, display Loading comp */}
          <div className={styles.container}>
            {displayLyrics ? <Lyrics /> : children}
          </div>

          {/* Player */}
          <Player />
        </div>
      </div>
    </>
  );
};
