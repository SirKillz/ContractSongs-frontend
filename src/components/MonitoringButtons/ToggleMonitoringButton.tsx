import { useRef } from "react";
import Image from "next/image";
import { Typography, IconButton, Stack } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useGetSpotifyContactSongServiceStatus, useStartSpotifyMonitoringService, useStopSpotifyMonitoringService } from "@/hooks/spotify";

type ContractSongEvent = {
    type: string,
    session_id: number,
    audio_url: string,
    player_names: string[],
    song_id: string,
    song_name: string
}

type Props = {
    sessionId: number
}

export default function ToggleMonitoringButton({sessionId}: Props) {

    const abortControllerRef = useRef<AbortController | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        data: monitoringStatus
    } = useGetSpotifyContactSongServiceStatus({enabled: true})

    const {mutate: startMonitoringService} = useStartSpotifyMonitoringService({sessionId: sessionId})
    const {mutate: stopMonitoringService} = useStopSpotifyMonitoringService();

    async function playAudio(url: string) {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        audio.src = url;

        try {
            await audio.play();
        } catch (error) {
            console.error("Failed to play audio", error)
        }
    }

    async function startMonitoring() {

        // check to see if we are already running
        if (monitoringStatus?.running) return;

        // start the monitoring service on the backend via hook
        // this will invalidate status query for state
        startMonitoringService();

        const controller = new AbortController();
        abortControllerRef.current = controller;

        // Create audio object during user gesture
        audioRef.current = new Audio();

        // call the start monitoring service mutation
        // this should invalidate the query that scans for whether or not we are monitoring

        try {
            await fetchEventSource(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions/contract-song-events`, {
                method: "GET",
                signal: controller.signal,

                onopen(response) {
                    if (!response.ok) {
                        throw new Error(`SSE Connection Failed - ${response.status}`)
                    }
                    console.log("Monitoring successfully started")
                    return Promise.resolve()
                },

                onmessage(event) {
                    if(!event.data) return;

                    const payload = JSON.parse(event.data) as ContractSongEvent;
                    if (payload.type === "contract_song" && payload.audio_url) {
                        void playAudio(payload.audio_url);
                    }
                },

                onclose() {
                    console.log("SSE connection closed");
                },

                onerror(error) {
                    console.log("SSE connection error", error)
                    throw error;
                }
            })
        } catch(error) {
            if(!controller.signal.aborted) {
                console.error("Monitoring error", error)
            }
        } finally {
            // call the stop monitoring service hook
            abortControllerRef.current = null;
        }
        
    }

    function stopMonitoring() {

        // check if the service is already stopped and return
        if (!monitoringStatus?.running) return

        // stop the monitoring service via hook
        // this will invalidate the status queries for state
        stopMonitoringService();
        console.log("Stopped Monitoring Service")


        abortControllerRef.current?.abort();
        abortControllerRef.current = null;

        audioRef.current?.pause();
        audioRef.current = null;
    }

    function handleClick() {
        if (!monitoringStatus?.running) {
            void startMonitoring();
        } else {
            stopMonitoring();
        }
    }

    return (
        <Stack direction="row" sx={{alignItems: "center", gap: 1, marginLeft: "auto"}}>
            {monitoringStatus?.running && <Image alt="no" src="/disk.gif" height={50} width={50}/>}
            <Typography 
                variant="body1" 
                component={"p"}
            >
                {monitoringStatus?.running ? "Stop Monitoring Service": "Start Monitoring Service"}
            </Typography>
            <IconButton 
                type="button" 
                size="large"
                onClick={handleClick}
                color={monitoringStatus?.running ? "error" : "primary"}
                sx={{marginLeft: "auto"}}
            >
                {monitoringStatus?.running ? <StopCircleIcon fontSize="inherit"/> : <PlayCircleFilledIcon fontSize="inherit"/>}
            </IconButton>
        </Stack>
    )
}