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

export type CreateSessionFormValues = {
    playlist: PlaylistOption | null
    players: PlayerInput[]
}

export type EditSessionFormValues = {
    playlist: PlaylistOption,
    players: PlayerInput[]
}