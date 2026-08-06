import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom"


function Callback() {
    const hasRun = useRef(false);
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    console.log(code)
    console.log("log po code")

  


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
        console.log("Data: ")
        console.log(data)
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