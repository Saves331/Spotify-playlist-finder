import { useState } from "react";
import type { Album } from "../types/spotify";
import AlbumCard from "../components/AlbumCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Profile from "../components/Profile";


function Search() {

    const [query, setQuery] = useState<string>('');
    const [albums, setAlbums] = useState<Album[]>([]);
   

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
        setAlbums(data.albums.items)

    }

  return (
    <div className="w-full p-6">

        <div>
            <Profile></Profile>
        </div>

        <div className="relative flex-1 min-w-0 max-w-225 m-auto py-4 group">
            
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-3xl transition-colors group-hover:text-text-primary group-focus-within:text-text-primary"/>
            <input className="input-primary text-3xl w-full pl-15" type="text" onKeyDown={(e) => {if(e.key === "Enter"){fetchAlbum()}}} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Albums"/>
            
        </div>
        <button className="btn-primary hidden" onClick={() => fetchAlbum()}>Search</button>

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