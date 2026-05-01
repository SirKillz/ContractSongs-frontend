"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingOverlayProps = {
    loadingText: string;
    isVisible: boolean;
}

export default function LoadingOverlay({loadingText, isVisible}: LoadingOverlayProps) {
    if (!isVisible) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: (theme) => theme.zIndex.modal,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <Typography
                component="h1"
                variant="h1"
                sx={{
                    color: "common.white",
                    textAlign: "center",
                }}
            >
                {loadingText}
            </Typography>
            <CircularProgress />
        </Box>
    )
}
