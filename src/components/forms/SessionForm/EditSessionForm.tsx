"use client"

import { Typography, Button, Stack } from "@mui/material"

import { FormContainer } from "react-hook-form-mui"

import { useGetSession } from "@/hooks/sessions"
import { useGetSpotifyPlaylistSongs } from "@/hooks/spotify"
import { EditSessionFormValues } from "@/types/sessionForm"

import Section from "@/components/common/Section"
import PlayerFormFields from "./PlayerForm/PlayerFormFields"

type Props = {
    sessionId: number
}

export default function EditSessionForm({sessionId}: Props) {

    const {
        isPending: isGettingSession,
        isError: isErrorGettingSession,
        data: sessionData
    } = useGetSession({enabled: true, id: sessionId})


    const {
        isPending: isGettingPlaylistSongs,
        isError: isErrorGettingPlaylistSongs,
        data: playlistSongData
    } = useGetSpotifyPlaylistSongs({enabled: !!sessionData, playlist_id: sessionData?.playlist_id ?? ""})

    return (
        <Section>
            <Typography variant="h1" component={"h1"}>Edit Existing Session</Typography>
            <FormContainer<EditSessionFormValues>
                onSuccess={async (data: EditSessionFormValues) => {
                    // const resolvedData = await resolveFormData(data)
                    // if (!resolvedData.ok) {
                    //     alert(resolvedData.error)
                    //     return
                    // }
                    // createSession(resolvedData.data)
                    console.log(data);
                }}
                defaultValues={{
                    players: sessionData?.players,
                }}
            >
                <Stack sx={{marginTop: "25px", gap: 2}}>            
                    <PlayerFormFields />
                    <Button variant="contained" type="submit">Create Session</Button>
                </Stack>
            </FormContainer>
        </Section>
    )
}