import { Player } from "./players"

export type ReadContractSongSession = {
    id: number,
    playlist_id: string,
    playlist_name: string, 
    created_at: string
    players: Player[]
}

export type CreateContractSongSessionPayload = {
    playlist_id: string,
    playlist_name: string,
    players: Player[]
}