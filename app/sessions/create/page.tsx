"use client"

import { FormContainer, AutocompleteElement } from "react-hook-form-mui"

import { useGetSpotifyPlaylists } from "@/hooks/spotify"
import { useCreateSession } from "@/hooks/sessions"

import AutoHeightPage from "@/components/common/AutoHeightPage"
import Section from "@/components/common/Section"
import { Typography, Stack, Button } from "@mui/material"
import { SpotifyPlaylistResponse } from "@/types/spotify"

function transformPlaylistData(playlistData: SpotifyPlaylistResponse) {
    return playlistData.playlists.map(pl => {
        return {id: pl.id, label: pl.name}
    })
}

type PlaylistOption = {
    id: string
    label: string
}

type FormInputs = {
    playlist: PlaylistOption
}

export default function CreateSessionPage() {


    const {
        isPending: isLoadingPlaylists,
        isError: isErrorGettingPlaylists,
        data: spotifyPlaylistData
    } = useGetSpotifyPlaylists({enabled: true});

    const {
        mutate,
        isPending: isCreatingSession,
        isSuccess: isCreateSessionSuccess
    } = useCreateSession()

    function handleFormSubmit(data: PlaylistOption) {
        const resolvedPlayListObj = {
            playlist_id: data.id,
            playlist_name: data.label
        }
        console.log(resolvedPlayListObj);
        mutate(resolvedPlayListObj);
    }

    return (
        <AutoHeightPage>
            <Section>
                <Typography variant="h1" component={"h1"}>Create New Session</Typography>
                <FormContainer
                    onSuccess={(data: FormInputs) => handleFormSubmit(data.playlist)}
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
                        <Button variant="contained" type="submit">Create Session</Button>
                    </Stack>
                </FormContainer>
            </Section>
        </AutoHeightPage>
    )
}