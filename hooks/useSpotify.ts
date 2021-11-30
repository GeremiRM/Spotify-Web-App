import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    try {
      if (session) {
        //@ts-expect-error
        spotifyApi.setAccessToken(session.user.accessToken);
      }
    } catch (err) {
      signIn();
    }
  }, [session]);

  return spotifyApi;
};

export { useSpotify };
