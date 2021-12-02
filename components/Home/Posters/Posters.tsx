import Image from "next/image";
import { ImPlay3 } from "react-icons/im";
import { usePlay } from "../../../hooks/usePlay";

// styling
import styles from "./Posters.module.scss";

interface PostersProps {
  data: SpotifyApi.AlbumObjectSimplified[];
}

export const Posters: React.FC<PostersProps> = ({ data }) => {
  const renderPoster = () => {
    return data.map((info) => (
      <div
        className={styles.poster}
        key={info.id}
        style={{ background: `url(${info.images[0].url}) center/cover` }}
      >
        <div className={styles.poster__body}>
          <div className={styles.poster__play}>
            <ImPlay3 />
          </div>
        </div>
      </div>
    ));
  };

  return <div className={styles.posters}>{renderPoster()}</div>;
};
