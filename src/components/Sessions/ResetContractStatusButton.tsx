"use client"

import { useState } from "react"

import { Alert, Button, Stack, Typography } from "@mui/material"

import PopUpModal from "../common/PopUpModal"
import Section from "../common/Section";

import { useResetPlayerContactSongStatus } from "@/hooks/sessions";

type ResetContractStatusButtonProps = {
    sessionId: number
}

export default function ResetContractStatusButton({sessionId}: ResetContractStatusButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const {
        mutate: resetContractSongStatus
    } = useResetPlayerContactSongStatus();

    return (
        <>
            {showModal && <PopUpModal>
                <Section>
                    <Alert severity="warning" sx={{justifyContent: "center"}}>Reset the Contract Status of all players' songs?</Alert>
                    <Typography variant="body1">This will mean that everyone's songs can re-trigger a contract event</Typography>
                    <Stack direction={"row"} sx={{gap: 1, justifyContent: "center"}}>
                        <Button 
                            variant="contained"
                            onClick={() => {
                                resetContractSongStatus(sessionId)
                                setShowModal(false);
                            }}
                        >
                            Reset
                        </Button>
                        <Button variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
                    </Stack>
                </Section>
            </PopUpModal>}
            <Button variant={"outlined"} onClick={() => setShowModal(true)}>
                Reset Contract Status?
            </Button>
        </>
    )
}