"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import { Box } from "@mui/material";

type props = {
    loadingText: string
}

export default function CustomLoading({loadingText}: props) {
    return (
        <Box
            sx={{
                padding: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}
        >
            <Typography component={"p"} variant="body1">{loadingText}</Typography>
            <CircularProgress />
        </Box>
    )
}