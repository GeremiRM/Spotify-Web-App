import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";

// styling
import styles from "./Layout.module.scss";

// components
import { Sidebar } from "./Sidebar/Sidebar";
import { Player } from "./Player/Player";
import { Lyrics } from "../Lyrics/Lyrics";
import { Loading } from "../Common/Loading";

import { Context } from "../../context/context";

export const Layout: React.FC<{}> = ({ children }) => {
  const { playingTrack, displayLyrics } = useContext(Context);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  // When to display loading page
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };

    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  });

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
            {pageLoading ? <Loading /> : displayLyrics ? <Lyrics /> : children}
          </div>

          {/* Player */}
          <Player />
        </div>
      </div>
    </>
  );
};
