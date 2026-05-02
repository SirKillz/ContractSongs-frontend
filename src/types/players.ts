import { SpotifySong } from "./spotify"

export type CreatePlayer = {
    name: string,
    songs: SpotifySong[]
}

export type ReadPlayer = {
    id: number,
    name: string,
    songs: SpotifySong[]
}