// components
import { Track } from "./Track";

// styling and icons
import styles from "./Tracklist.module.scss";
import { BsClock } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSavedSongsInfo } from "../../hooks/useSavedSongsInfo";

interface TracklistProps {
  tracks: SpotifyApi.TrackObjectSimplified[];
  hideAlbum?: boolean;
  stickyHeader?: boolean;
  tracklistUri?: string;
  hideHeader?: boolean;
}

export const Tracklist: React.FC<TracklistProps> = ({
  tracks,
  hideAlbum,
  stickyHeader,
  tracklistUri,
  hideHeader,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [initialHeaderPos, setInitialHeaderPos] = useState(0);
  const [scrollIntersect, setScrollIntersect] = useState(false);
  const savedSongs = useSavedSongsInfo();

  // stick header to the top
  const handleScroll = useCallback(() => {
    setScrollIntersect(window.scrollY > initialHeaderPos - 50);
  }, [initialHeaderPos]);

  // add scroll event if
  // 1) window has been rendered
  // 2) header has been rendered
  // 3) the header is supposed to be sticky
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      headerRef.current !== null &&
      stickyHeader
    ) {
      setInitialHeaderPos(headerRef.current!.offsetTop);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, stickyHeader]);

  const renderTracks = () =>
    tracks.map((track, idx) => {
      const savedSong = savedSongs.findIndex((song) => song.id === track.id);
      return (
        <Track
          id={track.id}
          key={track.id + idx + 3}
          idx={idx + 1}
          hideAlbum={hideAlbum ? true : false}
          tracklistUri={tracklistUri ? tracklistUri : ""}
          saved={savedSong > -1}
        />
      );
    });

  if (Object.keys(tracks).length === 0) return <></>;

  return (
    <div className={`${styles.tracklist}`}>
      {/* header. Can be hidden or made sticky */}
      <div
        className={`${styles.tracklist__header} 
        ${hideAlbum ? styles.tracklist__noAlbum : ""} 
        ${stickyHeader && scrollIntersect ? styles.tracklist__sticky : ""}
        ${hideHeader ? styles.tracklist__hide : ""}
        `}
        ref={headerRef}
        style={{ position: `${stickyHeader ? "sticky" : "static"}` }}
      >
        <div className={`${styles.tracklist__title}`}>
          <p>#</p>
          <p>Title</p>
        </div>

        {!hideAlbum && <div className={styles.tracklist__album}>Album</div>}
        <div className={styles.tracklist__duration}>
          <BsClock />
        </div>
      </div>
      <div className={styles.tracklist__body}>{renderTracks()}</div>
    </div>
  );
};
