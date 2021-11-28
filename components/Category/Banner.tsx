// styling
import styles from "./Category.module.scss";

interface BannerProps {
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <div className={styles.category__banner}>
      <div className={styles.category__info}>
        <div className={styles.category__title}>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};
