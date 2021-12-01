import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";
import { useSession } from "next-auth/react";

type User = SpotifyApi.CurrentUsersProfileResponse;

export const useUserInfo = () => {
  const [user, setUser] = useState<User>();

  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await spotifyApi.getMe();
      setUser(userData.body);
    };

    if (status === "authenticated") fetchUserData();
  }, [spotifyApi, status]);

  return user;
};
