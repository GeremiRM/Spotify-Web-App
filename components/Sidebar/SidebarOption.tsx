import React from "react";
import { IconType } from "react-icons";

import styles from "./Sidebar.module.scss";

interface SidebarOptionProps {
  icon?: IconType;
  active?: boolean;
}

export const SidebarOption: React.FC<SidebarOptionProps> = ({
  children,
  icon,
  active,
}) => {
  const Icon = icon!;
  return (
    <div className={`${styles.sidebar__option} ${active && styles.active}`}>
      {icon && <Icon className={styles.sidebar__icon} />}

      <p className={styles.sidebar__text}>{children}</p>
    </div>
  );
};
