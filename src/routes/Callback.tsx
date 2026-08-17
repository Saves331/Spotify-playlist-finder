import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


function Callback() {
    const { fetchProfile } = useAuth()
    const navigate = useNavigate();
    const hasRun = useRef(false);
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

  

  


    async function exchangeCodeForToken() {
        const verifier = localStorage.getItem('code_verifier')

        if(verifier === null || code === null) {
            return console.error("Error with null type")
        }

         const params = new URLSearchParams({
              grant_type: "authorization_code",
              client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
              redirect_uri: "http://127.0.0.1:5173/callback",
              code_verifier:verifier,
              code
          });

       const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        await fetchProfile()
        navigate("/")
    }

    

    useEffect(() => {
        if(hasRun.current) return;
        hasRun.current = true;
        exchangeCodeForToken()
    }, [])

    


  return (
    <div>Callback</div>
  )
}

export default Callback