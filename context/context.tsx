import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSpotify } from "../hooks/useSpotify";

type CurrentTrack = SpotifyApi.CurrentlyPlayingResponse;

interface IContext {
  playingTrack: CurrentTrack;
  setPlayingTrack: Dispatch<
    SetStateAction<SpotifyApi.CurrentlyPlayingResponse>
  >;
}

export const Context = createContext({} as IContext);

export const ContextProvider = (props: any) => {
  const [playingTrack, setPlayingTrack] = useState<CurrentTrack>(
    {} as CurrentTrack
  );
  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchCurrentPlayingTrack = async () => {
      const track = await spotifyApi.getMyCurrentPlayingTrack();
      setPlayingTrack(track.body);
    };

    if (status === "authenticated") fetchCurrentPlayingTrack();
  }, [spotifyApi, status]);

  return (
    <Context.Provider
      value={{
        playingTrack,
        setPlayingTrack,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
