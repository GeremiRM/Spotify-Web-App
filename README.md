<p align="center">

<h3 align="center">Spotify Web App</h3>

<div align="center">
  
![Status](https://img.shields.io/badge/status-active-success.svg)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/GeremiRM/Spotify-Web-App/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## Table of Contents

- [About](#about)
- [Get Started](#get_started)
- [Potential Future Features](#future)
- [Built Using](#built_using)
- [Author](#author)

<br />


# Spotify-Web-App <a name="about"></a>

A Spotify-like web application. It makes use of the Spotify Api to fetch the data, allowing the user to save (or unsave), play or pause the playback, save or search albums/artists/songs or playlists, and a lyrics functionality tied to the currently playing song. 

## Getting Started <a name = "get_started"></a>

From your command line, first clone this repo: 

```bash
# Clone this repository
$ git clone https://github.com/GeremiRM/Spotify-Web-App.git

# Install the dependencies
$ npm install
```

### Enviroment Variables 
Before executing the app, you need to create a ``.env.local`` file, and inside it set the following variables: (Most of these **values are obtained from Spotify**. To get these, you need to **have a Spotify account**, login as a **developer** and then add an app.)
- ``NEXT_PUBLIC_CLIENT_ID``: The **client id** you receive from Spotify.
- ``NEXT_PUBLIC_CLIENT_SECRET``: The **client secret** you receive from Spotify.
- ``NEXT_PUBLIC_GENIUS_KEY``: To use the lyrics functionality, you need to **register and obtain a key from Genius**, the Api uses Genius for the lyrics.
- ``JWT_SECRET``: JWT secret value used by Next Auth. Write here anything you want.

If everything has been set correctly: 

```bash
# Start development server
$ npm run dev
```

### API's Used
- Genius Api, with the ``genius-lyrics`` library to fetch the lyrics of the song currently playing
- TheAudioDB, to get the banner image on the artist page. (Doesn't need a token/key)
- Spotify Api, for everything else.

## Potential Future Features <a name="future"></a>
- Allow the user to add tracks directly to any of the user's playlists
- Allow the user to create (or delete) a playlist
- Customize the player further

## Built using <a name="built_using"></a>

- [Next.js](https://nextjs.org/) - Front-End Framework
- [NextAuth](https://next-auth.js.org/) - Authentication Library
- [Sass](https://sass-lang.com/) - CSS Preprocessor

## Author <a name="author"></a>

[@Geremirm](https://github.com/GeremiRM)

