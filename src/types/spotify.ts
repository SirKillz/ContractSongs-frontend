export type SpotifySong = {
    id: string,
    name: string,
    artist: string,
    been_contracted: boolean
}

export type SpotifyPlaylist = {
    id: string,
    name: string, 
    songs: SpotifySong[]
}

export type SpotifyPlaylistResponse = {
    count: number,
    playlists: SpotifyPlaylist[]
}