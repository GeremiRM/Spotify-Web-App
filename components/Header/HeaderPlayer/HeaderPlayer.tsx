import { useCallback, useEffect, useState } from "react";

// styling and icons
import styles from "./HeaderPlayer.module.scss";
import { ImPlay3 } from "react-icons/im";

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

  const handleScroll = useCallback(() => {
    if (window.scrollY > activateDistance) setDisplay(true);
    else setDisplay(false);
  }, [activateDistance]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={`${styles.player} ${display ? styles.display : ""}`}>
      <div className={styles.player__button}>
        <ImPlay3 onClick={play} />
      </div>
      <div className={styles.player__title}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
