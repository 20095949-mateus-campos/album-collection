import { Track } from "./Track"

export interface Album {
    id: number,
    title: string,
    artist: string,
    year: string,
    genre: string[],
    country: string,
    tracklist: Track[],
    coverUrl: string,
    uri: string
}
