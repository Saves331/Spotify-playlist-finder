export function generateCodeVerifier() {
    let randomBytes = crypto.getRandomValues(new Uint8Array(64));
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    let result = ""
    for (const byte of randomBytes) {
        result = result + chars[byte % chars.length];
    }

    return result;
}


export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = new Uint8Array(hashBuffer);
    let binaryString = "";

    for(const byte of hashArray) {
        binaryString = binaryString + String.fromCharCode(byte)
    }

    return btoa(binaryString)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

