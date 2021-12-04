import { useContext } from "react";

import { Context } from "../../context/context";
import { useImageColor } from "../../hooks/useImageColor";
import { Loading } from "../Common/Loading";
import { Header } from "../Header/Header";

// styling
import styles from "./Lyrics.module.scss";

export const Lyrics: React.FC<{}> = ({}) => {
  const { playingTrack, lyrics } = useContext(Context);

  const background = useImageColor(playingTrack?.album?.images[2]?.url);

  const renderLyrics = () => {
    return lyrics.split("\n").map((line, idx) => (
      <div key={idx}>
        <p>{line}</p>
      </div>
    ));
  };

  console.log(lyrics);

  return (
    <>
      <Header />
      <div className={styles.lyrics} style={{ background: background }}>
        {/* Mo song is playing */}
        {Object.keys(playingTrack).length === 0 && !lyrics && (
          <h1>No song playing</h1>
        )}
        {!lyrics && <Loading />}
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
