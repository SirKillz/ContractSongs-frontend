"use client"

import { useRouter } from "next/navigation";
import { Typography, Button, Stack, IconButton, Tooltip } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormContainer } from "react-hook-form-mui"

import { useGetSession, useUpdateSession } from "@/hooks/sessions"
import { useGetSpotifyPlaylistSongs } from "@/hooks/spotify"
import { EditSessionFormValues } from "@/types/sessionForm"

import CustomLoading from "@/components/common/CustomLoading"

import Section from "@/components/common/Section"
import PlayerFormFields from "./PlayerForm/PlayerFormFields"


type Props = {
    sessionId: number
}

export default function EditSessionForm({sessionId}: Props) {

    const router = useRouter();

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

    const {
        mutate: updateSession
    } = useUpdateSession()

    return (
        <Section>
            <Stack direction={"row"} sx={{alignItems: "center", gap: 1}}>
                <Tooltip title={"Back to Session"}>
                    <IconButton onClick={() => router.push(`/sessions/${sessionId}`)}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h1" component={"h1"}>Edit Existing Session</Typography>
            </Stack>
            {isGettingPlaylistSongs && <CustomLoading loadingText="Loading Session Data..."/>}
            {!!sessionData && 
            <FormContainer<EditSessionFormValues>
                onSuccess={async (data: EditSessionFormValues) => {
                    
                    const payload = {players: data.players};
                    updateSession({sessionId, payload})
                    console.log(data);
                }}
                defaultValues={{
                    playlist: {id: sessionData.playlist_id}, // only used for the watched value which won't matter in edit mode
                    players: sessionData.players,
                }}
            >
                <Stack sx={{marginTop: "25px", gap: 2}}>            
                    <PlayerFormFields />
                    <Button variant="contained" type="submit">Save</Button>
                </Stack>
            </FormContainer>
            }
        </Section>
    )
}
