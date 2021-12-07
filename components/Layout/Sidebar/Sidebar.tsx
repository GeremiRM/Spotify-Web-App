import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// styling and icons
import styles from "./Sidebar.module.scss";
import { FiHome, FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import { ImCross } from "react-icons/im";

// components
import { SidebarOption } from "./SidebarOption";

// hook
import { useSpotify } from "../../../hooks/useSpotify";

type Playlists = SpotifyApi.PlaylistObjectSimplified[];

export const Sidebar: React.FC<{}> = ({}) => {
  const [playlists, setPlaylists] = useState<Playlists>([] as Playlists);
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const router = useRouter();
  const location = router.pathname;

  const spotifyApi = useSpotify();
  const { status } = useSession();

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
          <a onClick={() => setDisplaySidebar(false)}>
            <p className={styles.sidebar__playlistName}>{playlist.name}</p>
          </a>
        </Link>
      ));
  };

  return (
    <div className={styles.container}>
      {/* Mobile sidebar button */}
      <div
        className={styles.sidebarButton}
        onClick={() => setDisplaySidebar(!displaySidebar)}
      >
        {displaySidebar ? (
          <ImCross className={styles.sidebarButton__cross} />
        ) : (
          <BsSpotify />
        )}
      </div>

      <div
        className={styles.sidebar}
        style={{ display: `${displaySidebar ? "flex" : "none"}` }}
      >
        <Link href="/" passHref>
          <div className={styles.sidebar__logo}>
            <Image src="/spotify.png" alt="spotify logo" layout="fill" />
          </div>
        </Link>

        {/* home - search - library */}
        <div className={styles.sidebar__options}>
          {/* Home */}
          <Link href="/">
            <a onClick={() => setDisplaySidebar(false)}>
              <SidebarOption icon={FiHome} active={location === "/"}>
                Home
              </SidebarOption>
            </a>
          </Link>

          {/* Search */}
          <Link href="/search">
            <a onClick={() => setDisplaySidebar(false)}>
              <SidebarOption icon={FiSearch} active={location === "/search"}>
                Search
              </SidebarOption>
            </a>
          </Link>

          {/* Library */}
          <Link href="/collection">
            <a onClick={() => setDisplaySidebar(false)}>
              <SidebarOption icon={BiLibrary} active={location === "/library"}>
                Your Library
              </SidebarOption>
            </a>
          </Link>
        </div>

        {/* create playlist - liked songs */}
        <div className={styles.sidebar__options}>
          {/* <SidebarOption icon={RiAddBoxFill}>Create Playlist</SidebarOption> */}
          <Link href="/collection/savedtracks">
            <a onClick={() => setDisplaySidebar(false)}>
              <SidebarOption
                icon={AiFillHeart}
                active={location === "/collection/savedtracks"}
              >
                Liked Songs
              </SidebarOption>
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
