import { useEffect, useState } from "react";

// compoonents
import Card from "../Common/Card";

// styling
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

  // Get the past results from the local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pastSearches = localStorage.getItem("searches");
      setPastResults(JSON.parse(pastSearches!));
    }
  }, []);

  if (!pastResults) return <></>;

  return (
    <div className={styles.wrapper}>
      {/* Title */}
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>Recent Searches</h2>
        </div>
      </div>

      {/* Past searches Cards */}
      <div className={`${styles.cards}`}>{renderCards()}</div>
    </div>
  );
};
