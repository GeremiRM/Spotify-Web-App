import { useEffect, useState } from "react";
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
import { useSpotify } from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";

type Playlists = SpotifyApi.PlaylistObjectSimplified[];

export const Sidebar: React.FC<{}> = ({}) => {
  const [playlists, setPlaylists] = useState<Playlists>([] as Playlists);
  const { status } = useSession();

  const router = useRouter();
  const location = router.pathname;

  const spotifyApi = useSpotify();

  useEffect(() => {
    const getData = async () => {
      const data = await spotifyApi.getUserPlaylists();
      setPlaylists(data.body.items);
    };
    if (status === "authenticated") getData();
  }, [status, spotifyApi]);

  const renderPlaylistsNames = () => {
    if (playlists.length !== 0)
      return playlists?.map((playlist) => (
        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
          <a>
            <p className={styles.sidebar__playlistName}>{playlist.name}</p>
          </a>
        </Link>
      ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link href="/home" passHref>
          <div className={styles.sidebar__logo}>
            <Image
              src="/header/header_logo.png"
              alt="spotify logo"
              layout="fill"
              priority
            />
          </div>
        </Link>

        {/* home - search - library */}
        <div className={styles.sidebar__options}>
          <Link href="/home">
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
          <Link href="/collection">
            <a>
              <SidebarOption icon={BiLibrary} active={location === "/library"}>
                Your Library
              </SidebarOption>
            </a>
          </Link>
        </div>

        {/* create playlist - liked songs */}
        <div className={styles.sidebar__options}>
          <SidebarOption icon={RiAddBoxFill}>Create Playlist</SidebarOption>
          <Link href="/collection/tracks">
            <a>
              <SidebarOption icon={AiFillHeart}>Liked Songs</SidebarOption>
            </a>
          </Link>
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
