"use client"

import { Box } from "@mui/material"
import Section from "./Section"

type Props = {
    children: React.ReactNode
}

export default function PopUpModal({children}: Props) {
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
            <Section>
                {children}
            </Section>
        </Box>
    )
}