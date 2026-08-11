import { useState } from "react";
import type { Album } from "../types/spotify"
import AlbumCard from "../components/AlbumCard";


function Search() {

    const [query, setQuery] = useState<string>('');
    const [albums, setAlbums] = useState<Album[]>([]);
   

    async function fetchAlbum() {
        const token = localStorage.getItem('access_token');

        const params = new URLSearchParams({
            q: query,
            type: 'album',
            limit: '5',
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
        setAlbums(data.albums.items)

    }

  return (
    <div className="w-full p-6">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={() => fetchAlbum()}>Search</button>


      <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        
         {albums.map((album) => (
                <li key={album.id}>
                    <AlbumCard album={album}></AlbumCard>
                </li>
        ))}   
        </ul>

   </div>
  )
}

export default Search