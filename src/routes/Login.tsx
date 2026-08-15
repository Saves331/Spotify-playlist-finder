import {useEffect, useState } from "react";
import { generateCodeVerifier, generateCodeChallenge, refreshAccessToken } from "../auth/pkce"
import type { Playlist, UserProfile } from "../types/spotify"
import  PlaylistCard  from "../components/PlaylistCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


function Login() {

      const [playlists, setPlaylists] = useState<Playlist[]>([])
      const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
      const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    async function handleLogin() {
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('code_verifier', codeVerifier)
        const challenge = await generateCodeChallenge(codeVerifier);

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

    
    useEffect(() => {
      async function fetchProfile() {
        const token = localStorage.getItem('access_token');

        if(token === null) {
          return console.error("user not logged");
        }


        let response = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if(response.status === 401) {
          await refreshAccessToken();
          const newToken = localStorage.getItem('access_token')
          response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${newToken}`
          }
        });
        };

        if (!response.ok) {
            console.error("Failed to fetch profile, status:", response.status);
            localStorage.removeItem('access_token');
            setUserProfile(null);
            return;
        }

        const data = await response.json()


        console.log("Profile: ")
        console.log(data)

        setUserProfile(data)
        console.log(userProfile)
      }

      fetchProfile()
    }, [])
  

    function handleLogout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload();
    }



  return (
    <section className="pb-6 px-6 bg-bg min-h-screen flex flex-col">

      <section className="flex justify-end py-6 mr-1">

        {userProfile ? (
                        <div className="flex gap-5">
                                                          <button className="btn-primary" onClick={() => fetchPlaylists()}>Show Playlists</button>
                              <div className="relative flex items-center">
                                  <button 
                                      className="cursor-pointer rounded-full ring-2 ring-transparent hover:ring-accent transition-all"
                                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                  >
                                      <img 
                                          className="rounded-full object-cover" 
                                          src={userProfile.images[1].url} 
                                          alt={userProfile.display_name}
                                      />
                                  </button>

                                  {isDropdownOpen ? (
                                      <ul className="absolute top-20 right-0 w-48 rounded-lg bg-surface border border-white/10 shadow-lg py-2 text-text-primary z-10">
                                          <li>
                                              <button className="w-full text-left px-4 py-2.5 hover:bg-surface-hover transition-colors cursor-pointer flex items-center gap-2">
                                                  <FontAwesomeIcon icon={faUser} className="text-text-secondary" />
                                                  Spotify Profile
                                              </button>
                                          </li>
                                          <li>
                                              <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 hover:bg-surface-hover transition-colors cursor-pointer flex items-center gap-2 text-red-400">
                                                  <FontAwesomeIcon icon={faRightFromBracket} />
                                                  Logout
                                              </button>
                                          </li>
                                      </ul>
                                  ) : null}
                              </div>
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


