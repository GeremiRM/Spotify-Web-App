import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import Image from "next/image";

// styling
import styles from "./Header.module.scss";
import { AiOutlineUser, AiFillCaretDown } from "react-icons/ai";

interface HeaderProps {
  bg?: string;
  activateDistance?: number | undefined;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  bg,
  activateDistance = 0,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [changeBg, setChangeBg] = useState(false);

  const user = useUserInfo();

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    if (window.scrollY) {
      setScrolled(true);
      if (window.scrollY >= activateDistance - 100) {
        setChangeBg(true);
      } else {
        setChangeBg(false);
      }
    } else setScrolled(false);
  }, [activateDistance]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!user) return <></>;

  return (
    <header className={styles.header}>
      <div
        className={`${styles.navigation} ${scrolled ? styles.scrolled : ""}`}
        style={{ background: `${changeBg ? bg : ""}` }}
      >
        {children}
        <div className={styles.user} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={styles.user__avatar}>
            {user.images!.length > 0 ? (
              <Image
                src={user!.images![0].url}
                alt={user.display_name}
                layout="fill"
              />
            ) : (
              <AiOutlineUser />
            )}
          </div>
          <div className={styles.user__name}>
            <p>{user.display_name}</p>
          </div>
          <div
            className={`${styles.user__caret} ${
              isMenuOpen ? styles.user__rotate : ""
            }`}
          >
            <AiFillCaretDown />
          </div>
        </div>
      </div>
    </header>
  );
};
