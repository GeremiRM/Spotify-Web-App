import { useEffect, useState } from "react";
import Card from "../Common/Card";

import styles from "../Common/Cards.module.scss";

// types
type Artist = SpotifyApi.ArtistObjectFull;
type Album = SpotifyApi.AlbumObjectSimplified;
type Playlist = SpotifyApi.PlaylistObjectSimplified;
type Track = SpotifyApi.TrackObjectFull;

type Result = Artist | Album | Playlist | Track;

export const PastSearches: React.FC<{}> = ({}) => {
  const [pastResults, setPastResults] = useState([]);

  const renderCards = () => {
    return pastResults?.map((result: Result) => (
      <Card info={result} key={result.id} />
    ));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pastSearches = localStorage.getItem("searches");
      setPastResults(JSON.parse(pastSearches!));
    }
  }, []);

  if (!pastResults) return <></>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <div className={styles.wrapper__title}>
          <h2>Past Searches</h2>
        </div>
      </div>
      <div className={`${styles.wrapper__cards}`}>{renderCards()}</div>
    </div>
  );
};
