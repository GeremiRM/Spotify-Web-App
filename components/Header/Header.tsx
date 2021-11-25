// libraries
import React, { ChangeEventHandler } from "react";
import { useRouter } from "next/router";

// styling and icons
import styles from "./Header.module.scss";

// types definition
type HandleChange = ChangeEventHandler<HTMLInputElement>;

export const Header: React.FC<{}> = ({ children }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {children}
        <div className={styles.userMenu}>
          <div className={styles.userMenu__avatar}></div>
        </div>
      </header>
    </div>
  );
};
