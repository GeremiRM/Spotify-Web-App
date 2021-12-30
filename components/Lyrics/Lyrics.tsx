import { useContext, useEffect } from "react";

// components
import { Loading } from "../Common/Loading";
import { Header } from "../Header/Header";

// styling
import styles from "./Lyrics.module.scss";

// hook
import { useImageColor } from "../../hooks/useImageColor";

import { Context } from "../../context/context";

export const Lyrics: React.FC<{}> = ({}) => {
  const { playingTrack, lyrics } = useContext(Context);

  const background = useImageColor(playingTrack?.album?.images[2]?.url);

  // Separate each line into it's own element
  const renderLyrics = () => {
    return lyrics.split("\n").map((line, idx) => (
      <div key={idx}>
        <p>{line}</p>
      </div>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.lyrics} style={{ background: background }}>
        {/* Mo song is playing */}
        {Object.keys(playingTrack).length === 0 && !lyrics && (
          <h1>No song is playing</h1>
        )}

        {/* If lyrics are getting fetched, display Loading comp */}
        {!lyrics && <Loading />}

        {/* Otherwise display lyrics */}
        {lyrics && playingTrack && (
          <h1>
            {playingTrack.name} - {playingTrack.artists[0].name}
          </h1>
        )}
        <div>{renderLyrics()}</div>
      </div>
    </>
  );
};
