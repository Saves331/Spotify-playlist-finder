import type { Album } from "../types/spotify"

interface AlbumCardProps {
    album: Album;
}

function AlbumCard({album} : AlbumCardProps) {

    const releaseYear = album.release_date.slice(0,4);
    const artistNames = album.artists.map((artist) => artist.name).join(", ");

  return (
    <article className="group w-full">
        <button type="button" 
                className="w-full rounded-lg bg-surface p-3 text-left transition-all
                           hover:bg-surface-hover
                           focus-visible:outline-2
                           focus-visible:outline-accent focus-visible:outline-offset-2
                           border-accent border-4"
            >
            <div className="aspect-square overflow-hidden w-full rounded-md">
                <img src={album.images[1].url} alt={`${album.name} cover`} className="h-full w-full object-cover transition-transform duration-300
                       group-hover:scale-[1.03]"/>
            </div>
            

            <div className="mt-3 space-y-1">
                <h2 className="line-clamp-1 font-semibold text-text-primary">{album.name}</h2>
                <p className="line-clamp-1 text-sm text-text-secondary">{artistNames}</p>

               <p className="text-xs text-text-secondary">
                    <span>{releaseYear}</span>
                    <span className="mx-1.5">·</span>
                    <span>{album.total_tracks} tracks</span>
                </p>
            </div>
        
        </button>
    </article>
  )
}

export default AlbumCard