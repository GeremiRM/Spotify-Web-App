// libraries
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SpotifyWebApi from "spotify-web-api-node";

// type definitions
type Playlists = SpotifyApi.ListOfUsersPlaylistsResponse;
type User = SpotifyApi.CurrentUsersProfileResponse;

// context interface
interface IContext {
  setToken: Dispatch<SetStateAction<string>>;
  user: User;
  playlists: Playlists;
  setPlaylists: Dispatch<SetStateAction<Playlists>>;
}

// context
export const Context = createContext<IContext>({} as IContext);

// provider
export const ContextProvider = (props: any) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>({} as User);
  const [playlists, setPlaylists] = useState<Playlists>({} as Playlists);

  useEffect(() => {
    /* Get all the neccesary data from Spotify utilizing
      the access token and, as such, it executes
      only when the access token has been passed or changes */
    const GetData = async () => {
      let userData, playlistsData;

      // spotify api handler
      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);

      try {
        // try to get the data
        userData = await spotifyApi.getMe();
        playlistsData = await spotifyApi.getUserPlaylists();

        // set the data
        setUser(userData.body);
        setPlaylists(playlistsData.body);

        // error
      } catch (err) {
        console.log("Error setting the data: ", err);
      }
    };
    if (token !== "") GetData();
  }, [token]);

  return (
    <Context.Provider
      value={{
        setToken,
        user,
        playlists,
        setPlaylists,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
