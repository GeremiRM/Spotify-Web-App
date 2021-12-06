// styling and icons
import styles from "./PlayBar.module.scss";
import { ImPlay3 } from "react-icons/im";

// hooks
import { usePlay } from "../../../hooks/usePlay";

interface PlaybarProps {
  bg?: string;
  uri: string[];
}

export const PlayBar: React.FC<PlaybarProps> = ({ uri }) => {
  const play = usePlay(uri);

  return (
    <div className={styles.playbar}>
      <div className={styles.playbar__button}>
        <ImPlay3 onClick={play} />
      </div>
    </div>
  );
};
