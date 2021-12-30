import { useCallback, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

// styling
import styles from "./Header.module.scss";
import { AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GiMicrophone } from "react-icons/gi";

import { Context } from "../../context/context";

interface HeaderProps {
  bg?: string;

  // at what distance to change bg color
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

    // handle scroll event
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

  if (!user) return <></>;

  return (
    <header className={styles.header}>
      {/* Left */}
      <div
        className={`${styles.navigation} ${scrolled ? styles.scrolled : ""}`}
        style={{ background: `${changeBg ? bg : ""}` }}
      >
        {/* Lyrics Button */}
        <div
          className={`${styles.lyrics} 
          ${displayLyrics ? styles.lyrics__active : ""}`}
          onClick={() => setDisplayLyrics(!displayLyrics)}
        >
          <GiMicrophone />
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
          <div className={styles.name}>
            <p>{user.display_name}</p>
          </div>

          {/* Caret */}
          <div className={`${styles.caret} ${isMenuOpen ? styles.rotate : ""}`}>
            <AiFillCaretDown />
          </div>

          {/* User menu */}
          {isMenuOpen && (
            <div
              className={styles.menu}
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <p className={styles.menu__text}>Log out</p>
              <BiLogOut className={styles.menu__icon} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
