import React from "react";
import Image from "next/image";

// styling
import styles from "./Playlist.module.scss";
import { convertMillisToMinutes } from "../../utils/utils";
import { getPlaylistDuration } from "../../Spotify/SpotifyApi";

// types
type Playlist = SpotifyApi.PlaylistObjectFull;

interface BannerProps {
  playlist: Playlist;
}

export const Banner: React.FC<BannerProps> = ({ playlist }) => {
  const playlistDuration = convertMillisToMinutes(
    getPlaylistDuration(playlist)
  );

  if (Object.keys(playlist).length === 0) return <></>;

  return (
    <div
      className={styles.playlist__banner}
      style={{
        background: `linear-gradient(
      0deg,
      #121212 0%,
      #333 95%)`,
      }}
    >
      <div className={styles.playlist__cover}></div>
      <div className={styles.playlist__info}>
        <div className={styles.playlist__name}>
          <h1
            style={{
              fontSize: `clamp(2.75rem,calc(5.75vw - ${playlist.name.length}px), 7rem)`,
            }}
          >
            {playlist.name}
          </h1>
        </div>
        <div className={styles.playlist__desc}>
          <p>{playlist.description}</p>
        </div>
        <div className={styles.playlist__desc}>
          <div className={styles.playlist__desc__owner}>
            <p>{playlist.owner.display_name}</p>
            <div className={styles.playlist__separator}></div>
          </div>
          <div className={styles.playlist__year}>
            {playlist.followers.total.toLocaleString()} likes
          </div>
          <div className={styles.playlist__separator}></div>
          <div className={styles.playlist__tracks}>
            {playlist.tracks.items.length} songs,{" "}
          </div>
          <div className={styles.playlist__duration}>{playlistDuration}</div>
        </div>
      </div>
    </div>
  );
};
