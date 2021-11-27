// libraries
import React from "react";

// styling
import styles from "./Layout.module.scss";

// components
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
