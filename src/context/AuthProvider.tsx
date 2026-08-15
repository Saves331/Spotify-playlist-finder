import { useEffect, useState, type ReactNode } from "react";
import { AuthContext  } from "./AuthContext";
import { refreshAccessToken } from "../auth/pkce";
import type { UserProfile } from "../types/spotify";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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


    useEffect(() => {
      fetchProfile()
    }, [])


    return (
        <AuthContext.Provider value={{userProfile, fetchProfile}}>
            {children}
        </AuthContext.Provider>
    )
}