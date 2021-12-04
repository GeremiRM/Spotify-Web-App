// styling
import styles from "./Tracks.module.scss";

// components
import { Header } from "../../Header/Header";
import { Tracklist } from "../../Common/Tracklist";
import { Banner } from "./Banner/Banner";

// hooks
import { useSavedSongsInfo } from "../../../hooks/useSavedSongsInfo";
import { HeaderPlayer } from "../../Header/HeaderPlayer/HeaderPlayer";
import { useEffect, useRef, useState } from "react";
import { PlayBar } from "./PlayBar";

const background = "#5038a0";
const backgroundGradient = `linear-gradient(0deg,#121212 0%,${background} 100%)`;

export const Tracks: React.FC<{}> = ({}) => {
  const [trackUris, setTrackUris] = useState<string[]>([]);
  const playbarRef = useRef<HTMLDivElement>(null);

  const savedSongsData = useSavedSongsInfo();

  useEffect(() => {
    if (savedSongsData) {
      setTrackUris(savedSongsData.map((song) => song.uri));
    }
  }, [savedSongsData]);

  if (savedSongsData.length === 0) return <></>;

  return (
    <div>
      <Header activateDistance={playbarRef.current?.offsetTop} bg={background}>
        <HeaderPlayer
          activateDistance={playbarRef.current?.offsetTop}
          title="Liked Songs"
          uri={trackUris}
        ></HeaderPlayer>
      </Header>
      <div className={styles.tracks}>
        <div
          style={{
            background: backgroundGradient,
          }}
        >
          <Banner amountSongs={savedSongsData.length} />
          <div ref={playbarRef}>
            <PlayBar uri={trackUris} />
          </div>
        </div>
      </div>
      <div>
        <Tracklist tracks={savedSongsData} stickyHeader />
      </div>
    </div>
  );
};
