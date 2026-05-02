"use client"

import { useState } from "react"

import { IconButton, Stack, Tooltip, Button, Alert } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import PopUpModal from "../common/PopUpModal";

type Props = {
    sessionId: number
}

export default function DeleteSessionButton({sessionId}: Props) {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {
            showModal && 
            <PopUpModal>
                <Alert severity="warning">Delete this session?</Alert>
                <Stack direction="row" sx={{gap: 1}}>
                    <Button variant="contained">Delete</Button>
                    <Button 
                        variant="outlined"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </Stack>
            </PopUpModal>
            
            }
            <Tooltip title="Delete">
                <IconButton onClick={() => setShowModal(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}