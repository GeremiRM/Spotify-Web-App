// libraries
import React from "react";

// styling
import styles from "./Layout.module.scss";

// components
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

const Dashboard: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Dashboard;
