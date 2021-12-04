import { useCallback, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

// styling
import styles from "./Header.module.scss";
import { AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

// hook
import { useUserInfo } from "../../hooks/useUserInfo";

import { Context } from "../../context/context";

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

  const { displayLyrics, setDisplayLyrics, user } = useContext(Context);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    if (window.scrollY) {
      setScrolled(true);
      setChangeBg(window.scrollY >= activateDistance - 100);
    } else {
      setScrolled(false);
      setChangeBg(false);
    }
  }, [activateDistance]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!user
     return <></>;

  return (
    <header className={styles.header}>
      {/* Left */}
      <div
        className={`${styles.navigation} ${scrolled ? styles.scrolled : ""}`}
        style={{ background: `${changeBg ? bg : ""}` }}
      >
        <div
          className={`${styles.header__lyrics} 
          ${displayLyrics ? styles.header__lyricsActive : ""}`}
          onClick={() => setDisplayLyrics(!displayLyrics)}
        >
          <p>{displayLyrics ? "Close Lyrics" : "Lyrics"}</p>
        </div>

        {/* Header add-ons */}
        {children}

        {/* Right -> User Menu */}
        <div className={styles.user} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {/* User image */}
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

          {/* Username (Not shown on mobile) */}
          <div className={styles.user__name}>
            <p>{user.display_name}</p>
          </div>

          {/* Caret */}
          <div
            className={`${styles.user__caret} ${
              isMenuOpen ? styles.user__rotate : ""
            }`}
          >
            <AiFillCaretDown />
          </div>

          {/* User menu */}
          {isMenuOpen && (
            <div
              className={styles.user__menu}
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:3000/login" })
              }
            >
              <p className={styles.user__menu__text}>Log out</p>

              <BiLogOut className={styles.user__menu__icon} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
