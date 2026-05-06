"use client"

import { useRouter } from "next/navigation"
import { Stack, Button } from "@mui/material"
import LogoutButton from "./LogoutButton";

export default function NavBar() {

    const router = useRouter();

    return (
        <Stack 
            direction="row" 
            sx={{
                gap: 2, 
                backgroundColor: "primary.light", 
                padding: "10px",
                justifyContent: "center"
            }}
            >
            <Button 
                variant="contained"
                onClick={() => router.push("/sessions")}
            >
                Sessions
            </Button>
            <LogoutButton />
        </Stack>
    )
    
}