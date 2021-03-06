import { useCallback, useEffect, useState } from "react";

// styling and icons
import styles from "./HeaderPlayer.module.scss";
import { FaPlay } from "react-icons/fa";

// hook
import { usePlay } from "../../../hooks/usePlay";

interface HeaderPlayerProps {
  // at what distance will it active
  activateDistance: number | undefined;
  title: string;
  uri: string | string[];
}

export const HeaderPlayer: React.FC<HeaderPlayerProps> = ({
  title,
  activateDistance = 0,
  uri,
}) => {
  const [display, setDisplay] = useState(false);
  const play = usePlay(uri);

  // Display player
  const handleScroll = useCallback(() => {
    setDisplay(window.scrollY > activateDistance);
  }, [activateDistance]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={`${styles.player} ${display ? styles.display : ""}`}>
      {/* Play button */}
      <div className={styles.button}>
        <FaPlay onClick={play} />
      </div>

      {/* Title -> Not shown on mobile */}
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
