import {useState } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkce"
import type { Playlist } from "../types/spotify"
import  PlaylistCard  from "../components/PlaylistCard";

function Login() {

      const [codeChallenge, setCodeChallenge] = useState<string | null>(null);
      const [playlists, setPlaylists] = useState<Playlist[]>([])


    async function handleLogin() {
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('code_verifier', codeVerifier)
        const challenge = await generateCodeChallenge(codeVerifier);
        setCodeChallenge(challenge);

        console.log(codeVerifier, challenge);

        const params = new URLSearchParams({
              client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
              response_type: "code",
              redirect_uri: "http://127.0.0.1:5173/callback",
              code_challenge_method: "S256",
              code_challenge: challenge,
              scope: "playlist-read-private"
          });

        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
        console.log("test-----")
        window.location.href = authUrl
        console.log("test-----")
    }

    async function fetchPlaylists() {
      const token = localStorage.getItem('access_token');

      if(token === null) {
        return console.error("Token null value error")
      }

      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log("Data: ")
      console.log(data)
      setPlaylists(data.items)
      
      console.log("Playlisty:", playlists)
    }


  





  return (
    <section className="pb-6 px-6 bg-bg">

      <section className="flex justify-end gap-3 py-6">
         <button className="cursor-pointer rounded-lg border-2 border-accent bg-accent px-5 py-2.5 font-semibold text-bg text-lg
               transition-colors hover:bg-surface-hover hover:text-text-primary
               focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2" onClick={() => fetchPlaylists()}>Show Playlists</button>

         <button className="cursor-pointer rounded-lg border-2 border-accent bg-accent px-5 py-2.5 font-semibold text-bg text-lg
               transition-colors hover:bg-surface-hover hover:text-text-primary
               focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2" onClick={() => handleLogin()}>Login</button>
      </section>
  

    <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <PlaylistCard playlist = {playlist}></PlaylistCard>
        </li>
      ))}
    </ul>
    </section>
  )
}

export default Login