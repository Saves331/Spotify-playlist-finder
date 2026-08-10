import type { Album } from "../types/spotify"

interface AlbumCardProps {
    album: Album;
}

function AlbumCard({album} : AlbumCardProps) {

    const releaseYear = album.release_date.slice(0,4)

  return (
    <article>
        <img src={album.images[1].url} alt={`${album.name} cover`} />

        <div>
            <h2>{album.name}</h2>
            <p>{album.artists.map((artist) => artist.name).join(", ")}</p>

            <p>
                <span>{releaseYear} </span>
                <span>{album.total_tracks} Tracks</span>
            </p>
        </div>
    </article>
  )
}

export default AlbumCard