import { useRef, useState } from "react";
import { useRouter } from "next/router";

// components
import { Header } from "../Header/Header";
import { HeaderPlayer } from "../Header/HeaderPlayer/HeaderPlayer";
import { Banner } from "./Banner/Banner";
import { Tracklist } from "../Common/Tracklist";
import { Cards } from "../Common/Cards";
import { PlayBar } from "./Playbar/PlayBar";
import { Loading } from "../Common/Loading";

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

  const {
    albums,
    artist,
    otherArtists,
    topTracks,
    appears_on,
    singles,
    isFollowingArtist,
  } = useArtistInfo(id as string);
  const background = useImageColor(artist?.images[2]?.url);

  // playbar ref
  const playbarRef = useRef<HTMLDivElement>(null);

  // if data hasn't finished fetching
  if (
    !albums ||
    !artist ||
    !otherArtists ||
    !topTracks ||
    !singles ||
    !appears_on
  )
    return <Loading />;

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

        {/* Body */}
        <div className={styles.body}>
          {/* Playbar */}
          <div ref={playbarRef}>
            <PlayBar
              id={artist.id}
              uri={artist.uri}
              isFollowing={isFollowingArtist}
            />
          </div>

          {/* Tracklist */}
          <div className={styles.tracks}>
            <h2 className={styles.tracks__title}>Popular</h2>
            <div className={styles.tracklist}>
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
            {/* Albums */}
            <Cards
              data={albums.slice(0, 8)}
              title="Albums"
              linkId={artist.id}
              linkType="albums"
            />

            {/* Singles */}
            <Cards
              data={singles.slice(0, 8)}
              title="Singles"
              linkId={artist.id}
              linkType="singles"
            />

            {/* Appears on */}
            <Cards
              data={appears_on.slice(0, 8)}
              title="Appears On"
              linkId={artist.id}
              linkType="appears_on"
            />

            {/* Related Artists */}
            <Cards
              data={otherArtists.slice(0, 8)}
              title="Related Artists"
              linkId={artist.id}
              linkType="related"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
