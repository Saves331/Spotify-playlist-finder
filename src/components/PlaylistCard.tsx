import type {Playlist} from "../types/spotify"

interface PlaylistCardProps {
    playlist: Playlist;
}

function PlaylistCard({playlist} : PlaylistCardProps) {
  return (
     <article className="group w-full cursor-pointer">
        <button type="button"
                className="w-full rounded-lg bg-surface p-3 text-left transition-all
                           hover:bg-surface-hover
                           focus-visible:outline-2
                           focus-visible:outline-accent focus-visible:outline-offset-2
                           border-accent border-4 cursor-pointer"
            >
            <div className="aspect-square overflow-hidden w-full rounded-md">
              <img src={playlist.images[0].url} alt={`${playlist.name} cover`} className="h-full w-full object-cover transition-transform duration-300
                       group-hover:scale-[1.03]"/>
            </div>
            

            <div className="mt-3 space-y-1">
                <h2 className="line-clamp-1 font-semibold text-text-primary">{playlist.name}</h2>
                <p className="line-clamp-1 text-sm text-text-secondary">{playlist.owner.display_name}</p>

               <p className="text-xs text-text-secondary">
                  <span>{playlist.items.total} tracks</span>
                </p>
            </div>
        
        </button>
    </article>
  )
}

export default PlaylistCard