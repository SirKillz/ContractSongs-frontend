"use client"

import { useRouter } from "next/navigation";
import { useGetSessions } from "@/hooks/sessions"

import { Typography, Box, Button, Alert } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AutoHeightPage from "@/components/common/AutoHeightPage";
import Section from "@/components/common/Section"
import NewTabLink from "@/components/common/NewTabLink";
import CustomLoading from "@/components/common/CustomLoading";

type columnHeader = {
    name: string,
    color: string,
    width: string
}

const colHeaderDefs: columnHeader[] = [
    {
        name: "Session Link",
        color: "white",
        width: "25%"
    },
    {
        name: "Spotify Playlist Name",
        color: "white",
        width: "50%"
    },
    {
        name: "Created At",
        color: "white",
        width: "25%"
    }
]

function formatDateCreated(dateString: string): string {
    const dateObj = new Date(dateString);

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

export default function SessionsPage() {

    const router = useRouter();

    const {
        isPending: isGettingSessions,
        isError: isErrorGettingSessions,
        data: getSessionsData
    } = useGetSessions({enabled: true})

    return (
        <AutoHeightPage>
            <Section>
                <Box sx={{display: "flex", flexDirection: "column", gap: "15px", alignItems: "center"}}>
                    <Box sx={{display: "flex", width: "100%"}}>
                        <Typography variant="h1" component={"h1"}>All Sessions:</Typography>
                        <Button 
                            sx={{marginLeft: "auto"}} 
                            variant="contained"
                            onClick={() => router.push("/sessions/create")}
                        >
                            + Create New Session
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow sx={{backgroundColor: "black"}}>
                                    {colHeaderDefs.map(h => {
                                        return (
                                            <TableCell 
                                                key={h.name} 
                                                width={h.width}
                                                align="center"
                                                sx={{color: h.color}}
                                            >
                                                {h.name}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isGettingSessions && 
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <CustomLoading loadingText="Loading Sessions..."/>
                                        </TableCell>
                                    </TableRow>

                                }
                                {getSessionsData?.map(session => {
                                    return (
                                        <TableRow key={session.id}>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => router.push(`/sessions/${session.id}`)}
                                                    sx={{backgroundColor: "primary.main"}}
                                                >
                                                    Go to Session
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <NewTabLink 
                                                    link={`https://open.spotify.com/playlist/${session.playlist_id}`}
                                                    displayText={session.playlist_name}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{formatDateCreated(session.created_at)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                                {
                                    getSessionsData?.length === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <Alert 
                                                severity="warning" 
                                                sx={{display: "flex", justifyContent: "center"}}
                                            >
                                                No Sessions to Display!
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                }
                                {
                                    isErrorGettingSessions && 
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <Alert 
                                                severity="error" 
                                                sx={{display: "flex", justifyContent: "center"}}
                                            >
                                                Error Getting Sessions!
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Section>
        </AutoHeightPage>
    )
}