// libraries
import React, { useEffect, useRef } from "react";

// styling
import styles from "./Header.module.scss";

interface HeaderProps {
  background?: string;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  background = "transparent",
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (typeof window === "undefined" || !headerRef.current) return;

    const position = window.scrollY;
    const { offsetTop } = headerRef.current!;

    if (position > offsetTop) {
      headerRef.current!.className = `${styles.tracklist__header} ${styles.tracklist__onTop}`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={styles.header} style={{ background: background }}>
      <div className={styles.navigation}>
        {children}
        <div className={styles.userMenu}>
          <div className={styles.userMenu__avatar}></div>
        </div>
      </div>
    </header>
  );
};
