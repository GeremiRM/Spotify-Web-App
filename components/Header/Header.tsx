// libraries
import { useEffect, useState } from "react";

// styling
import styles from "./Header.module.scss";

interface HeaderProps {
  background?: string;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [headerBg, setHeaderBg] = useState("");

  const handleScroll = () => {
    if (typeof window === "undefined") return;

    if (window.scrollY) {
      setHeaderBg("");
    } else setHeaderBg("transparent");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`${styles.navigation}`} style={{ background: headerBg }}>
        {children}
        <div className={styles.userMenu}>
          <div className={styles.userMenu__avatar}></div>
        </div>
      </div>
    </header>
  );
};
