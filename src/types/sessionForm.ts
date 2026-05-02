import { SpotifyPlaylist, SpotifySong } from "./spotify"

export type PlayerInput = {
    name: string
    songs: SpotifySong[]
}

export type CreateSessionFormValues = {
    playlist: SpotifyPlaylist | null
    players: PlayerInput[]
}

export type EditSessionFormValues = {
    playlist: SpotifyPlaylist,
    players: PlayerInput[]
}