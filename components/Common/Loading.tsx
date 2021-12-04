// styling and icons
import styles from "./Loading.module.scss";
import { GoPrimitiveDot } from "react-icons/go";

export const Loading: React.FC<{}> = ({}) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__dots}>
        <GoPrimitiveDot className={styles.loading__dots__first} />
        <GoPrimitiveDot className={styles.loading__dots__second} />
        <GoPrimitiveDot className={styles.loading__dots__third} />
      </div>
    </div>
  );
};
