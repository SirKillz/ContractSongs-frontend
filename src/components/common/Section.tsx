import { Box } from "@mui/material"

type props = {
    children: React.ReactNode
}

export default function Section({children}: props) {
    return (
        <Box sx={{
            borderRadius: "16px",
            boxShadow: "5px 5px 10px 5px rgba(174, 172, 172, 0.15)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "25px"
        }}>
            {children}
        </Box>
    )
}