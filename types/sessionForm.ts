export type SongOption = {
    id: string,
    label: string
}

export type PlayerInput = {
    name: string
    songs: SongOption[]
}

export type PlaylistOption = {
    id: string,
    label: string
}

export type SessionFormValues = {
    playlist: PlaylistOption | null
    players: PlayerInput[]
}