//@ts-nocheck

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { SPOTIFY_URL, spotifyApi } from "../../../Spotify/SpotifyConfig";

const refreshAccessToken = async (token: JWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed token is ", body);

    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpires: Date.now() + body.expires_in * 1000,
      refreshToken: body.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: SPOTIFY_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },

  events: {
    async signIn(message) {
      console.log(message, "hola");
    },
    async signIn(message) {
      console.log(message, "hola");
    },
    async signOut(message) {
      console.log(message, "hola");
    },
    async createUser(message) {
      console.log(message, "hola");
    },
    async updateUser(message) {
      console.log(message, "hola");
    },
    async linkAccount(message) {
      console.log(message, "hola");
    },
    async session(message) {
      console.log(message, "hola");
    },
  },
  callbacks: {
    async jwt({ account, token, user }) {
      // Initial sign in
      if (account && user) {
        console.log(account);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("Valid token");
        return token;
      }

      // Access token has expired, try to update it
      console.log("access token refreshing");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
