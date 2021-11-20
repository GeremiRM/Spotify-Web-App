// libraries
import React from "react";

// styling
import styles from "../../styles/Dashboard/Dashboard.module.scss";

// components
import { Sidebar } from "./Sidebar/Sidebar";

const Dashboard: React.FC<{}> = ({}) => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
