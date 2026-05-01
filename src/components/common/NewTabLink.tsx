import { Box } from "@mui/material"
import LaunchIcon from '@mui/icons-material/Launch';

type NewTabLinkProps = {
    link: string
    displayText: string
}

export default function NewTabLink({link, displayText}: NewTabLinkProps) {
    return (
        <Box sx={{display: "flex", alignItems: "center", gap: "10px", justifyContent: "center"}}>
            <a href={link} target="_blank">{displayText}</a>
            <LaunchIcon />
        </Box>
    )
}