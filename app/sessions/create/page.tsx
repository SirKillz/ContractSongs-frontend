"use client"

import { AutocompleteElement, FormContainer, TextFieldElement, useFieldArray } from "react-hook-form-mui"

import { useGetSpotifyPlaylists } from "@/hooks/spotify"

import AutoHeightPage from "@/components/common/AutoHeightPage"
import Section from "@/components/common/Section"
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { SpotifyPlaylistResponse } from "@/types/spotify"

import PlayerFields from "@/components/common/PlayerForm/PlayerFormFields"

function transformPlaylistData(playlistData: SpotifyPlaylistResponse) {
    return playlistData.playlists.map(pl => {
        return {id: pl.id, label: pl.name}
    })
}

type SpotifySong = {
    id: string,
    name: string,
    artist: string,
    been_contracted: false
}

type PlaylistOption = {
    id: string
    label: string
}

type PlayerInput = {
    name: string
    songs: SpotifySong[]
}

type FormInputs = {
    playlist: PlaylistOption | null
    players: PlayerInput[]
}

export default function CreateSessionPage() {

    const {
        isPending: isLoadingPlaylists,
        isError: isErrorGettingPlaylists,
        data: spotifyPlaylistData
    } = useGetSpotifyPlaylists({enabled: true});

    return (
        <AutoHeightPage>
            <Section>
                <Typography variant="h1" component={"h1"}>Create New Session</Typography>
                <FormContainer
                    onSuccess={(data: FormInputs) => console.log(data)}
                    defaultValues={{
                        playlist: null,
                        players: [{name: "", songs: []}],
                    }}
                >
                    <Stack sx={{marginTop: "25px", gap: 2}}>
                        {!isErrorGettingPlaylists &&
                        <AutocompleteElement 
                            name="playlist"
                            options={spotifyPlaylistData ? transformPlaylistData(spotifyPlaylistData): []}
                            label={isLoadingPlaylists ? "Loading Playlists..." : "Select Spotify Playlist"}
                            loading={isLoadingPlaylists}
                            required
                        />}
                        <PlayerFields />
                        <Button variant="contained" type="submit">Create Session</Button>
                    </Stack>
                </FormContainer>
            </Section>
        </AutoHeightPage>
    )
}
