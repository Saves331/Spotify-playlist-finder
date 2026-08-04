import { useEffect, useState } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "./auth/pkce"

function App() {
  const [codeChallenge, setCodeChallenge] = useState<string | null>(null);


  useEffect(() => {
    async function init() {
        const codeVerifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(codeVerifier);
        setCodeChallenge(challenge);

        console.log(codeVerifier, challenge);
    }
  
    init();
  }, [])
  return (
    <>
      
    </>
  )
}

export default App
