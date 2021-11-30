// Results from a spotifyApi.search
export type Results = {
  albums: SpotifyApi.AlbumObjectSimplified[] | undefined;
  artists: SpotifyApi.ArtistObjectFull[] | undefined;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
};

export type CardsData =
  | SpotifyApi.AlbumObjectSimplified[]
  | SpotifyApi.ArtistObjectFull[]
  | SpotifyApi.PlaylistObjectSimplified[]
  | SpotifyApi.TrackObjectFull[]
  | undefined;
