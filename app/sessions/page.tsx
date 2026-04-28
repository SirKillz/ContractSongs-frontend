"use client"

import { useGetSessions } from "@/hooks/sessions"

import { Typography, Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FixedPage from "@/components/common/FixedPage"
import Section from "@/components/common/Section"

function formatDateCreated(dateString: string): string {
    const dateObj = new Date(dateString);

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

export default function SessionsPage() {

    const {
        isPending: isGettingSessions,
        isError: isGettingSessionsError,
        error: getSessionsError,
        data: getSessionsData
    } = useGetSessions({enabled: true})

    const tableHeaders = [
        "Session Link",
        "Playlist Name",
        "Created At"
    ]

    return (
        <FixedPage>
            <Section>
                <Box sx={{display: "flex", flexDirection: "column", gap: "15px", alignItems: "center"}}>
                    <Typography variant="h1" component={"h1"}>All Sessions:</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow sx={{backgroundColor: "black"}}>
                                    {tableHeaders.map(h => {
                                        return (
                                            <TableCell 
                                                key={h} 
                                                align="center"
                                                sx={{color: "white"}}
                                            >
                                                {h}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getSessionsData?.map(session => {
                                    return (
                                        <TableRow key={session.id}>
                                            <TableCell align="center">{session.id}</TableCell>
                                            <TableCell align="center">{session.playlist_name}</TableCell>
                                            <TableCell align="center">{formatDateCreated(session.created_at)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Section>
        </FixedPage>
    )
}