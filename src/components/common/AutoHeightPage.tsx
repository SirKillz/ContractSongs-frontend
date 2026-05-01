import { Box } from "@mui/material";

type props = {
    children: React.ReactNode
}

export default function AutoHeightPage({children}: props) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                padding: "25px"
            }}
        >
            {children}
        </Box>
    )
}