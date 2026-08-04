interface Album {
    id: string,
    name: string,
    images: Image[],
    release_date: string,
    artists: Artist[]
}

interface Artist {
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