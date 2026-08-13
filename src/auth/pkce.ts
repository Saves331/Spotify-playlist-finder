export function generateCodeVerifier() {
    let randomBytes = crypto.getRandomValues(new Uint8Array(64));
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    let result = ""
    for (const byte of randomBytes) {
        result = result + chars[byte % chars.length];
    };

    return result;
}


export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = new Uint8Array(hashBuffer);
    let binaryString = "";

    for(const byte of hashArray) {
        binaryString = binaryString + String.fromCharCode(byte);
    }

    return btoa(binaryString)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

export async function refreshAccessToken() {
    const token = localStorage.getItem('refresh_token');

    if(token === null) {
        return console.error("refresh-token null error");
    };

    const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const data = await response.json();

    if(!response.ok) {
        console.error("Failed to refresh token, status: ", response.status);
        return;
    }

    localStorage.setItem('access_token', data.access_token);

    if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
    };
    
}