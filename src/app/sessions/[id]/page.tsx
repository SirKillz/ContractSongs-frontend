"use client"

import { useParams, useRouter } from "next/navigation"
import { Typography, Stack, Button } from "@mui/material";
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
import { ReadPlayer } from "@/types/players";

function createTableRows(players: ReadPlayer[]) {

    const alignment = "center";
    let rows = [];

    for (let player of players) {

        let createdPlayerNameRow = false
        for (let song of player.songs) {
            if (!createdPlayerNameRow) {
                rows.push(
                    <TableRow key={song.id}>
                        <TableCell rowSpan={player.songs.length} align={alignment}>{player.name}</TableCell>
                        <TableCell align={alignment}>{song.name}</TableCell>
                        <TableCell align={alignment}>{song.artist}</TableCell>
                        <TableCell align={alignment}>{song.been_contracted ? "True" : "False"}</TableCell>
                    </TableRow>
                )
                createdPlayerNameRow = true;
            } else {
                rows.push(
                    <TableRow key={song.id}>
                        <TableCell align={alignment}>{song.name}</TableCell>
                        <TableCell align={alignment}>{song.artist}</TableCell>
                        <TableCell align={alignment}>{song.been_contracted ? "True": "False"}</TableCell>
                    </TableRow>
                )
            }
        }
    }
    return rows;
}

export default function SessionDetailPage() {

    const params = useParams<{id: string}>();
    const id = params.id;

    const router = useRouter();

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
                <Button onClick={() => router.push(`/sessions/${id}/edit`)} variant="outlined">Edit Session</Button>
                {
                    sessionData &&
                    <TableContainer component={Paper}>
                        <Table sx={{mindWidth: 650}}>
                            <TableHead>
                                <TableRow sx={{backgroundColor: "black"}}>
                                    <TableCell sx={{color: "white", width: "20%"}} align="center">Player Name</TableCell>
                                    <TableCell sx={{color: "white", width: "35%"}} align="center">Songs</TableCell>
                                    <TableCell sx={{color: "white", width: "35%"}} align="center">Artist</TableCell>
                                    <TableCell sx={{color: "white", width: "10%"}} align="center">Been Contracted</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    createTableRows(sessionData.players).map(row => row)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Section>
        </AutoHeightPage>
    )
}
