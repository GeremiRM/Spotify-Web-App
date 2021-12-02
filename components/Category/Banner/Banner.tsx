// styling
import styles from "./Banner.module.scss";

interface BannerProps {
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__info}>
        <div className={styles.banner__title}>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};
