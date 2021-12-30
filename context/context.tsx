import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useSpotify } from "../hooks/useSpotify";

type CurrentTrack = SpotifyApi.SingleTrackResponse;
type User = SpotifyApi.CurrentUsersProfileResponse;

interface IContext {
  playingTrack: CurrentTrack;
  setPlayingTrack: Dispatch<SetStateAction<CurrentTrack>>;
  lyrics: string;
  displayLyrics: boolean;
  setDisplayLyrics: Dispatch<SetStateAction<boolean>>;
  user: User;
  playerErrors: boolean;
  setPlayerErrors: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext({} as IContext);

export const ContextProvider = (props: any) => {
  const [playingTrack, setPlayingTrack] = useState<CurrentTrack>(
    {} as CurrentTrack
  );
  const [user, setUser] = useState<User>();
  const [lyrics, setLyrics] = useState("");
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const [playerErrors, setPlayerErrors] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await spotifyApi.getMe();
      setUser(data.body);
    };
    if (status === "authenticated") fetchUser();
  }, [spotifyApi, status]);

  useEffect(() => {
    setLyrics("");
    const getLyrics = async () => {
      const response = await fetch(`/api/lyrics/${playingTrack.name}`);
      const data = await response.json();

      setLyrics(
        data.lyrics ? data.lyrics : "Couldn't find the lyrics for this song"
      );
    };

    if (Object.keys(playingTrack).length > 0) getLyrics();
  }, [playingTrack, router.pathname]);

  useEffect(() => {
    const fetchCurrentPlayingTrack = async () => {
      try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        const track = await spotifyApi.getTrack(data.body.item!.id);

        setPlayingTrack(track.body);
      } catch (err) {
        console.log(err);
      }
    };

    if (status === "authenticated") fetchCurrentPlayingTrack();
  }, [spotifyApi, status]);

  return (
    <Context.Provider
      value={{
        playingTrack,
        setPlayingTrack,
        lyrics,
        displayLyrics,
        setDisplayLyrics,
        user: user!,
        playerErrors,
        setPlayerErrors,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
