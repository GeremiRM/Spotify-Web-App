// styling
import styles from "./Banner.module.scss";

interface BannerProps {
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__info}>
        <div
          className={styles.banner__title}
          style={{
            fontSize: `clamp(2.75rem,calc(8vw - ${title.length}px), 96px)`,
          }}
        >
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};
