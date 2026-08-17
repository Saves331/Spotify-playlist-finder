import { useState } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkce";
import type { Playlist } from "../types/spotify";
import  PlaylistCard  from "../components/PlaylistCard";
import Profile from "../components/Profile";
import { useAuth } from "../context/AuthContext"


function Login() {

    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const { userProfile } = useAuth();

    async function handleLogin() {
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('code_verifier', codeVerifier)
        const challenge = await generateCodeChallenge(codeVerifier);

        const params = new URLSearchParams({
              client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
              response_type: "code",
              redirect_uri: "http://127.0.0.1:5173/callback",
              code_challenge_method: "S256",
              code_challenge: challenge,
              scope: "playlist-read-private"
          });
        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
        window.location.href = authUrl
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
      setPlaylists(data.items)
    }

  

  return (
    <section className="pb-6 px-6 bg-bg min-h-screen flex flex-col">

      <section className="flex justify-end py-6 mr-1">

        {userProfile ? (
                        <div className="flex gap-5">
                              <button className="btn-primary" onClick={() => fetchPlaylists()}>Show Playlists</button>
                              <Profile></Profile>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button className="btn-primary" onClick={() => handleLogin()}>Show Playlists</button>
                          <button className="btn-primary" onClick={() => handleLogin()}>Login</button>
                        </div>
                      )}
      </section>

      <h1 className="text-3xl font-bold text-text-primary mb-6">Your Playlists</h1>

      {playlists.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-primary text-3xl">
            No playlists loaded yet. Click "Show Playlists" to load your library.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <PlaylistCard playlist={playlist}></PlaylistCard>
            </li>
          ))}
        </ul>
      )}

    </section>
  )
}

export default Login


