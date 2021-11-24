// libraries
import React, { ChangeEventHandler } from "react";
import { useRouter } from "next/router";

// styling and icons
import styles from "./Header.module.scss";
import { FiSearch } from "react-icons/fi";

// types definition
type HandleChange = ChangeEventHandler<HTMLInputElement>;

// interface
interface HeaderProps {
  input?: string;
  handleChange?: HandleChange;
}

export const Header: React.FC<HeaderProps> = ({ input, handleChange }) => {
  const router = useRouter();
  const location = router.pathname;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {location === "/search" ? (
          <div className={styles.searchBar}>
            <FiSearch className={styles.searchBar__icon} />
            <input
              type="text"
              className={styles.searchBar__input}
              placeholder="Artists, songs, or podcasts"
              onChange={handleChange}
              value={input}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.userMenu}>
          <div className={styles.userMenu__avatar}></div>
        </div>
      </header>
    </div>
  );
};
