export interface Album {
    id: string,
    name: string,
    images: Image[],
    release_date: string,
    artists: Artist[],
    total_tracks: number,
    external_urls: ExternalUrls
}

export interface Artist {
    id: string,
    name: string
}

interface Track {
    id: string,
    name: string,
    duration_ms: number,
    track_number: number
}

interface Image {
    url: string,
    height: number,
    width: number
}

interface Owner {
    id: string,
    display_name: string,
    external_urls: ExternalUrls,
    uri: string
}

interface Item {
    href: string,
    total: number
}

interface ExternalUrls {
    spotify: string
}


export interface Playlist {
    description: string,
    external_urls: ExternalUrls,
    id: string,
    images: Image[],
    items: Item,
    name: string,
    owner: Owner,
    type: string //playlist/album
}