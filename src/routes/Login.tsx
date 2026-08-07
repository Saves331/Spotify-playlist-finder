import {useState } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkce"

function Login() {

      const [codeChallenge, setCodeChallenge] = useState<string | null>(null);



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
    }
  





  return (
    <>
    <button className="p-1 m-4 border rounded-md" onClick={() => handleLogin()}>Login</button>
    <button onClick={() => fetchPlaylists()}>Show Playlist</button>
    </>
  )
}

export default Login