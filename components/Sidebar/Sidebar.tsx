// libraries
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// styling and icons
import styles from "./Sidebar.module.scss";
import { FiHome, FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";

// components
import { SidebarOption } from "./SidebarOption";

// context
import { Context } from "../../context/context";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { playlists } = useContext(Context);
  const router = useRouter();
  const location = router.pathname;

  const renderPlaylistsNames = () => {
    return playlists.items?.map((playlist) => (
      <p className={styles.sidebar__playlistName} key={playlist.id}>
        {playlist.name}
      </p>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar__logo}>
          <Image
            src="/header/header_logo.png"
            alt="spotify logo"
            layout="fill"
          />
        </div>

        {/* home - search - library */}
        <div className={styles.sidebar__options}>
          <Link href="/dashboard">
            <a>
              <SidebarOption
                text="Home"
                icon={FiHome}
                active={location === "/dashboard"}
              />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <SidebarOption
                text="Search"
                icon={FiSearch}
                active={location === "/search"}
              />
            </a>
          </Link>
          <SidebarOption
            text="Your Library"
            icon={BiLibrary}
            active={location === "/library"}
          />
        </div>

        {/* create playlist - liked songs */}
        <div className={styles.sidebar__options}>
          <SidebarOption text="Create Playlist" icon={RiAddBoxFill} />
          <SidebarOption text="Liked Songs" icon={AiFillHeart} />
        </div>

        {/* playlists list */}
        <div
          className={`${styles.sidebar__options} ${styles.sidebar__playlists}`}
        >
          {renderPlaylistsNames()}
        </div>
      </div>
    </div>
  );
};
