"use client"

import { useRouter } from "next/navigation"
import { Stack, Button } from "@mui/material"

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
            <Button 
                variant="contained"
                color="error"
            >
                Log Out
            </Button>
        </Stack>
    )
    
}