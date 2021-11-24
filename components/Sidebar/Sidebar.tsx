// libraries
import React, { useEffect, useState } from "react";
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
import { getUserPlaylists } from "../../Spotify/SpotifyApi";

type Playlists = SpotifyApi.PlaylistObjectSimplified[];

export const Sidebar: React.FC<{}> = ({}) => {
  const [playlists, setPlaylists] = useState<Playlists>();
  const router = useRouter();
  const location = router.pathname;

  useEffect(() => {
    const getData = async () => {
      const data = await getUserPlaylists();
      setPlaylists(data);
    };
    getData();
    return;
  }, []);

  const renderPlaylistsNames = () => {
    return playlists?.map((playlist) => (
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
              <SidebarOption icon={FiHome} active={location === "/dashboard"}>
                Home
              </SidebarOption>
            </a>
          </Link>
          <Link href="/search">
            <a>
              <SidebarOption icon={FiSearch} active={location === "/search"}>
                Search
              </SidebarOption>
            </a>
          </Link>
          <SidebarOption icon={BiLibrary} active={location === "/library"}>
            Library
          </SidebarOption>
        </div>

        {/* create playlist - liked songs */}
        <div className={styles.sidebar__options}>
          <SidebarOption icon={RiAddBoxFill}>Create Playlist</SidebarOption>
          <SidebarOption icon={AiFillHeart}>Liked Songs</SidebarOption>
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