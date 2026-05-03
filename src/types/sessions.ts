import { CreatePlayer, ReadPlayer } from "./players"

export type ReadContractSongSession = {
    id: number,
    playlist_id: string,
    playlist_name: string, 
    created_at: string
    players: ReadPlayer[]
}

export type CreateContractSongSessionPayload = {
    playlist_id: string,
    playlist_name: string,
    players: CreatePlayer[]
}

export type UpdateSessionPayload = {
    players: CreatePlayer[] | ReadPlayer[]
}