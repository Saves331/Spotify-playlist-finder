import { useState } from "react";

function Search() {

    const [query, setQuery] = useState<string>('');

    async function fetchAlbum() {
        const token = localStorage.getItem('access_token');

        const params = new URLSearchParams({
            q: query,
            type: 'album'
        })

        

        if(token === null) {
            return console.error("Token null value error")
        }

        const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
            method: "GET",
            headers: {
                 "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data)
        
    }

  return (
    <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={() => fetchAlbum()}>Search</button>
    </div>
  )
}

export default Search