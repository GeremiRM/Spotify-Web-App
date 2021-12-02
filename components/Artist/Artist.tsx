import { useRef, useState } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { HeaderPlayer } from "../Header/HeaderPlayer/HeaderPlayer";
import { Banner } from "./Banner/Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";
import { PlayBar } from "./PlayBar";

// styling
import styles from "./Artist.module.scss";

// hook
import { useArtistInfo } from "../../hooks/useArtistInfo";
import { useImageColor } from "../../hooks/useImageColor";

export const Artist: React.FC<{}> = ({}) => {
  const [seeMore, setSeeMore] = useState(false);

  // artist id
  const router = useRouter();
  const { id } = router.query;

  const { albums, artist, otherArtists, topTracks, appears_on, singles } =
    useArtistInfo(id as string);
  const background = useImageColor(artist?.images[2]?.url);

  // playbar ref
  const playbarRef = useRef<HTMLDivElement>(null);

  // if data hasn't finished fetching, return nothing
  if (
    !albums ||
    !artist ||
    !otherArtists ||
    !topTracks ||
    !singles ||
    !appears_on
  )
    return <></>;

  return (
    <div>
      {/* header */}
      <Header bg={background} activateDistance={playbarRef.current?.offsetTop}>
        <HeaderPlayer
          title={artist.name}
          activateDistance={playbarRef.current?.offsetTop}
          uri={artist.uri}
        />
      </Header>
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
          <div ref={playbarRef}>
            <PlayBar id={artist.id} uri={artist.uri} />
          </div>

          {/* Tracklist */}
          <div className={styles.tracks}>
            <h2 className={styles.tracks__title}>Popular</h2>
            <div className={styles.tracks__tracklist}>
              <Tracklist
                tracks={topTracks!.slice(0, seeMore ? 10 : 5)}
                hideHeader
              />
            </div>

            {/* See More */}
            <p onClick={() => setSeeMore(!seeMore)} className={styles.seeMore}>
              {seeMore ? "See Less" : "See More"}
            </p>
          </div>

          {/* Cards */}
          <div className={styles.cards}>
            <Cards data={albums} title="Albums" />
            <Cards data={singles} title="Singles" />
            <Cards data={appears_on} title="Appears On" />
            <Cards data={otherArtists} title="Related Artists" />
          </div>
        </div>
      </div>
    </div>
  );
};
