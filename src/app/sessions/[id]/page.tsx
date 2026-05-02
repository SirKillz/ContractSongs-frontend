"use client"

import { useState } from "react";
import { useParams } from "next/navigation"
import { Typography, Stack } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AutoHeightPage from "@/components/common/AutoHeightPage";
import { useGetSession } from "@/hooks/sessions";
import Section from "@/components/common/Section";
import ToggleMonitoringButton from "@/components/MonitoringButtons/ToggleMonitoringButton";

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
                        <ToggleMonitoringButton sessionId={Number(id)}/>
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
                                    <TableRow key={player.id}>
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
