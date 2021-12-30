// styling and icons
import styles from "./Sidebar.module.scss";
import { IconType } from "react-icons";
import { useContext } from "react";
import { Context } from "../../../context/context";

interface SidebarOptionProps {
  icon?: IconType;
  active?: boolean;
}

export const SidebarOption: React.FC<SidebarOptionProps> = ({
  children,
  icon,
  active,
}) => {
  const { setDisplayLyrics } = useContext(Context);

  const Icon = icon!;

  return (
    <div
      className={`${styles.option} ${active && styles.option__active}`}
      onClick={() => setDisplayLyrics(false)}
    >
      {icon && <Icon className={styles.option__icon} />}

      <p className={styles.option__text}>{children}</p>
    </div>
  );
};
