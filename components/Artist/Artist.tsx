import { useState } from "react";
import { useRouter } from "next/router";

// @ts-ignore
import analyze from "rgbaster";
import { usePalette } from "react-palette";

// components
import { Header } from "../Header/Header";
import { Banner } from "./Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";

// styling
import styles from "./Artist.module.scss";

// hook
import { PlayBar } from "./PlayBar";
import { useArtistInfo } from "../../hooks/useArtistInfo";
import { useImageColor } from "../../hooks/useImageColor";

export const Artist: React.FC<{}> = ({}) => {
  const [background, setBackground] = useState("");
  const [seeMore, setSeeMore] = useState(false);

  // artist id
  const router = useRouter();
  const { id } = router.query;

  const { albums, artist, otherArtists, topTracks } = useArtistInfo(
    id as string
  );

  if (!albums || !artist || !otherArtists || !topTracks) return <></>;

  return (
    <div>
      <Header />
      <div
        className={styles.artist}
        style={{
          background: `linear-gradient(
      0deg,
      #121212 65%,
      ${background} 100%)`,
        }}
      >
        {/* Banner */}
        <Banner artist={artist} />

        <div className={styles.body}>
          {/* Playbar */}
          <PlayBar id={artist.id} />

          {/* Tracklist */}
          <div className={styles.tracks}>
            <h2 className={styles.tracks__title}>Popular</h2>
            <div className={styles.tracks__tracklist}>
              <Tracklist tracks={topTracks!.slice(0, seeMore ? 10 : 5)} />
            </div>

            {/* See More */}
            <p onClick={() => setSeeMore(!seeMore)} className={styles.seeMore}>
              {seeMore ? "See Less" : "See More"}
            </p>
          </div>

          {/* Cards */}
          <div className={styles.cards}>
            <Cards data={albums} title="Albums" />
            <Cards data={otherArtists} title="Related Artists" />
          </div>
        </div>
      </div>
    </div>
  );
};
