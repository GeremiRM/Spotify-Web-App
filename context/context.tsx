import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

import { useSpotify } from "../hooks/useSpotify";

//@ts-expect-error -> no types
import solenolyrics from "solenolyrics";

type CurrentTrack = SpotifyApi.SingleTrackResponse;
type User = SpotifyApi.CurrentUsersProfileResponse;

interface IContext {
  playingTrack: CurrentTrack;
  setPlayingTrack: Dispatch<SetStateAction<CurrentTrack>>;
  lyrics: string;
  displayLyrics: boolean;
  setDisplayLyrics: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export const Context = createContext({} as IContext);

export const ContextProvider = (props: any) => {
  const [playingTrack, setPlayingTrack] = useState<CurrentTrack>(
    {} as CurrentTrack
  );
  const [user, setUser] = useState<User>();
  const [lyrics, setLyrics] = useState("");
  const [displayLyrics, setDisplayLyrics] = useState(false);

  const spotifyApi = useSpotify();
  const { status } = useSession();

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
      const data = await solenolyrics.requestLyricsFor(
        `${playingTrack.name} ${playingTrack.artists[0].name}`
      );
      setLyrics(data ? data : "Couldn't find the lyrics for this song");
    };

    if (Object.keys(playingTrack).length > 0) getLyrics();
  }, [playingTrack]);

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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
