"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";

type ContractSongOverlayProps = {
    isVisible: boolean;
    playerNames: string[];
}

export default function ContractSongOverlay({isVisible, playerNames}: ContractSongOverlayProps) {
    if (!isVisible) return null;

    const displayPlayerNames = playerNames.length > 0 ? playerNames.join(", ") : "Unknown Player";

    return (
        <Box
            role="alert"
            aria-live="assertive"
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: (theme) => theme.zIndex.modal,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.72)",
                px: 2,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "64px minmax(0, 1fr) 64px",
                        sm: "120px minmax(0, 1fr) 120px",
                        md: "168px minmax(0, 1fr) 168px",
                    },
                    alignItems: "center",
                    gap: {
                        xs: 1.5,
                        sm: 3,
                        md: 5,
                    },
                    width: "min(100%, 1100px)",
                }}
            >
                <SirenImage />
                <Box
                    sx={{
                        minWidth: 0,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            color: "common.white",
                            lineHeight: 1.15,
                        }}
                    >
                        New Contract Song For:
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            color: "primary.main",
                            mt: 1.5,
                            overflowWrap: "anywhere",
                            lineHeight: 1.25,
                        }}
                    >
                        {displayPlayerNames}
                    </Typography>
                </Box>
                <SirenImage />
            </Box>
        </Box>
    )
}

function SirenImage() {
    return (
        <Box
            aria-hidden="true"
            sx={{
                position: "relative",
                width: {
                    xs: 64,
                    sm: 120,
                    md: 168,
                },
                aspectRatio: "1 / 1",
            }}
        >
            <Image
                alt=""
                src="/siren.gif"
                fill
                sizes="(max-width: 600px) 64px, (max-width: 900px) 120px, 168px"
                style={{objectFit: "contain"}}
                unoptimized
            />
        </Box>
    )
}
