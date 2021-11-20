// libraries
import React from "react";
import Image from "next/image";

// styling and icons
import styles from "./Sidebar.module.scss";
import { FiHome, FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";

// components
import { SidebarOption } from "./SidebarOption";
import { Playlists } from "./Playlists";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <Image
          src="/header/header_logo.png"
          alt="spotify logo"
          width="120px"
          height="35px"
        />
      </div>

      {/* home - search - library */}
      <div className={styles.sidebar__options}>
        <SidebarOption text="Home" icon={FiHome} active />
        <SidebarOption text="Search" icon={FiSearch} />
        <SidebarOption text="Your Library" icon={BiLibrary} />
      </div>

      {/* create playlist - liked songs */}
      <div className={styles.sidebar__options}>
        <SidebarOption text="Create Playlist" icon={RiAddBoxFill} />
        <SidebarOption text="Liked Songs" icon={AiFillHeart} />
      </div>

      {/* playlists list */}
      <div className={styles.sidebar__options}>
        <Playlists />
      </div>
    </div>
  );
};
