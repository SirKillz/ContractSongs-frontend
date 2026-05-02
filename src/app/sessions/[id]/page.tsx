"use client"

import { useState } from "react";
import { useParams } from "next/navigation"
import { Typography, IconButton, Stack } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { fetchEventSource } from "@microsoft/fetch-event-source";

import AutoHeightPage from "@/components/common/AutoHeightPage";
import { useGetSession } from "@/hooks/sessions";
import Section from "@/components/common/Section";

import { startSpotifyContractSongService, stopSpotifyContractSongService } from "@/api/spotify";

export default function SessionDetailPage() {
    const [polling, setPolling] = useState(false);

    const params = useParams<{id: string}>();
    const id = params.id;

    const {
        isPending: isGettingSession,
        isError: isErrorGettingSession,
        data: sessionData
    } = useGetSession({
        enabled: !!id,
        id: Number(id)
    })

    return (
        <AutoHeightPage>
            <Section>
                <Stack direction="row" sx={{alignItems: "center"}}>
                    <Typography variant="h1" component={"h1"}>Playlist: {sessionData?.playlist_name}</Typography>
                    <Stack direction="row" sx={{gap: 1, alignItems: "center", marginLeft: "auto"}}>
                        <Typography variant="body1" component={"p"}>{polling ? "Stop Monitoring": "Start Monitoring"}</Typography>
                        {
                            polling ? 
                            <IconButton 
                                type="button" 
                                size="large"
                                onClick={async () => {
                                    stopSpotifyContractSongService()
                                    setPolling(false)
                                }}
                                color="error"
                                sx={{marginLeft: "auto"}}
                            >
                                <StopCircleIcon fontSize="inherit"/>
                            </IconButton>
                            :
                            <IconButton 
                                type="button" 
                                size="large"
                                onClick={async() => {
                                    startSpotifyContractSongService(Number(id))
                                    setPolling(true)
                                    await fetchEventSource('http://localhost:8000/api/v1/sessions/contract-song-events', {
                                        onmessage(ev) {
                                            console.log(ev.data)
                                        }
                                    })
                                }}
                                color="primary"
                                sx={{marginLeft: "auto"}}
                            >
                                <PlayCircleFilledIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    </Stack>
                </Stack>
                
            </Section>
            <Section>
                <TableContainer component={Paper}>
                    <Table sx={{mindWidth: 650}}>
                        <TableHead>
                            <TableRow sx={{backgroundColor: "black"}}>
                                <TableCell sx={{color: "white"}} align="center">Player Name</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Song Count</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Been Contracted</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessionData?.players.map(player => {
                                return (
                                    <TableRow>
                                        <TableCell align="center">{player.name}</TableCell>
                                        <TableCell align="center">{player.songs.length}</TableCell>
                                        <TableCell align="center">
                                            {player.songs.some(song => song.been_contracted === true) ? "Yes": "No"}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Section>
        </AutoHeightPage>
    )
}