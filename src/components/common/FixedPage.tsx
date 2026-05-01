import { Box } from "@mui/material";

type props = {
    children: React.ReactNode
}

export default function FixedPage({children}: props) {
    return (
        <Box
            sx={{
                height: "100vh",
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