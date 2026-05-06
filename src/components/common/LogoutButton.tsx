"use client"

import { useState } from "react"

import { Button, Alert, Stack } from "@mui/material"

import PopUpModal from "./PopUpModal"

import { useDeleteApiTokens } from "@/hooks/apiKeyManagementHooks"

export default function LogoutButton() {

    const [showModal, setShowModal] = useState(false);

    const {
        mutate: deleteApiTokens
    } = useDeleteApiTokens()

    return (
        <>
            {showModal && <PopUpModal>
                <Alert severity="warning">Are you sure you want to sign out?</Alert>
                <Stack direction={"row"} sx={{gap: 1, justifyContent: "center"}}>
                    <Button 
                        variant="contained" 
                        color={"error"}
                        onClick={() => {
                            deleteApiTokens()
                            setShowModal(false)
                        }}
                    >
                        Sign Out
                    </Button>
                    <Button variant="outlined" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Stack>
            </PopUpModal>}
            <Button 
                variant="contained" 
                color="error"
                onClick={() => setShowModal(true)}
            >
                Sign Out
            </Button>
        </>
        
    )
}