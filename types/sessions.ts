import { Player } from "./players"

export type ContractSongSession = {
    id: number,
    playlist_id: string,
    playlist_name: string, 
    created_at: string
}

export type CreateContractSongSessionPayload = {
    playlist_id: string,
    playlist_name: string,
    players: Player[]
}