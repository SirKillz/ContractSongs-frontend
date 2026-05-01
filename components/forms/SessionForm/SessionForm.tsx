import { Typography, Stack, Button } from "@mui/material";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";

import Section from "@/components/common/Section";
import { useGetSpotifyPlaylists } from "@/hooks/spotify";
import { SpotifyPlaylist, SpotifySong } from "@/types/spotify";
import PlayerFormFields from "./PlayerForm/PlayerFormFields";
import { SessionFormValues } from "@/types/sessionForm";
import { useCreateSession } from "@/hooks/sessions";
import { getSpotifyPlaylistSongs, getSpotifyPlaylists } from "@/api/spotify";
import { CreateContractSongSessionPayload } from "@/types/sessions";
import { getErrorMessage } from "@/helpers/errors";
import LoadingOverlay from "@/components/common/LoadingOverlay";


function resolvePlaylistOptions(playlistData: SpotifyPlaylist[]) {
    return playlistData.map((pl) => {
        return {id: pl.id, label: pl.name}
    })
}

type ResolvedFormDataSuccess<T> = {
    ok: true,
    data: T
}

type ResolvedFormDataFailure = {
    ok: false,
    error: string
}

type ResolvedFormData<T> = ResolvedFormDataSuccess<T> | ResolvedFormDataFailure

async function resolveFormData(data: SessionFormValues): Promise<ResolvedFormData<CreateContractSongSessionPayload>> {

    try {
        const playlists = await getSpotifyPlaylists()
        const playlistSongs = await getSpotifyPlaylistSongs(data.playlist.id)

        const playlist = playlists.playlists.find((pl) => pl.id === data.playlist.id)

        if (!playlist) {
            throw new Error(`Playlist not found: ${data.playlist.id}`)
        }
        
        const players = data.players.map(player => {
            return {
                name: player.name,
                songs: player.songs.map(song => {
                    const matchedSong = playlistSongs.find(spotifySong => spotifySong.id === song.id)
                    if (!matchedSong) {
                        throw new Error(`Song not found: ${song.id}`)
                    }
                    return matchedSong;
                })
            }
        })

        return {
            ok: true,
            data: {
                playlist_id: playlist.id,
                playlist_name: playlist.name,
                players: players
            }
        }
    } catch(err) {
        return {
            ok: false,
            error: getErrorMessage(err)
        }
    }
}

export default function SessionForm() {

    const {
            isPending: isLoadingPlaylists,
            isError: isErrorGettingPlaylists,
            data: spotifyPlaylistData
        } = useGetSpotifyPlaylists({enabled: true});


    const {
        isPending: isCreatingSession,
        isError: isErrorCreatingSession,
        mutate: createSession
    } = useCreateSession()

    return (
        <Section>
            {isCreatingSession && <LoadingOverlay isVisible={true} loadingText="Creating Session..."/>}
            <Typography variant="h1" component={"h1"}>Create New Session</Typography>
            <FormContainer<SessionFormValues>
                onSuccess={async (data: SessionFormValues) => {
                    const resolvedData = await resolveFormData(data)
                    if (!resolvedData.ok) {
                        alert(resolvedData.error)
                        return
                    }
                    createSession(resolvedData.data)
                }}
                defaultValues={{
                    playlist: {},
                    players: [],
                }}
            >
                <Stack sx={{marginTop: "25px", gap: 2}}>
                    {!isErrorGettingPlaylists &&
                    <AutocompleteElement 
                        name="playlist"
                        options={spotifyPlaylistData ? resolvePlaylistOptions(spotifyPlaylistData.playlists): []}
                        label={isLoadingPlaylists ? "Loading Playlists..." : "Select Spotify Playlist"}
                        loading={isLoadingPlaylists}
                        required
                    />}
                    <PlayerFormFields />
                    <Button variant="contained" type="submit">Create Session</Button>
                </Stack>
            </FormContainer>
        </Section>
    )
}