// styling and icons
import styles from "./Loading.module.scss";
import { GoPrimitiveDot } from "react-icons/go";

export const Loading: React.FC<{}> = ({}) => {
  return (
    <div className={styles.loading}>
      <div className={styles.dots}>
        <GoPrimitiveDot className={styles.dots__first} />
        <GoPrimitiveDot className={styles.dots__second} />
        <GoPrimitiveDot className={styles.dots__third} />
      </div>
    </div>
  );
};
