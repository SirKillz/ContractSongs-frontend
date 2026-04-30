import { Typography, Stack, Button } from "@mui/material";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";

import Section from "@/components/common/Section";
import { useGetSpotifyPlaylists } from "@/hooks/spotify";
import { SpotifyPlaylist, SpotifySong } from "@/types/spotify";
import PlayerFields from "./PlayerForm/PlayerFormFields";

type PlayerInput = {
    name: string
    songs: SpotifySong[]
}

type SessionFormValues = {
    playlist: SpotifyPlaylist
    players: PlayerInput[]
}

function resolvePlaylistOptions(playlistData: SpotifyPlaylist[]) {
    return playlistData.map((pl) => {
        return {id: pl.id, label: pl.name}
    })
}

export default function SessionForm() {

    const {
            isPending: isLoadingPlaylists,
            isError: isErrorGettingPlaylists,
            data: spotifyPlaylistData
        } = useGetSpotifyPlaylists({enabled: true});

    return (
        <Section>
            <Typography variant="h1" component={"h1"}>Create New Session</Typography>
            <FormContainer<SessionFormValues>
                onSuccess={(data: SessionFormValues) => console.log(data)}
                defaultValues={{
                    playlist: {},
                    players: [{name: "", songs: [{id: "123", name: "Gang Plan Galleon"}]}],
                }}
            >
                <Stack sx={{marginTop: "25px", gap: 2}}>
                    {!isErrorGettingPlaylists &&
                    <AutocompleteElement 
                        name="playlist"
                        options={spotifyPlaylistData ? resolvePlaylistOptions(spotifyPlaylistData.playlists): []}
                        label={isLoadingPlaylists ? "Loading Playlists..." : "Select Spotify Playlist"}
                        loading={isLoadingPlaylists}
                        required
                    />}
                    <PlayerFields />
                    <Button variant="contained" type="submit">Create Session</Button>
                </Stack>
            </FormContainer>
        </Section>
    )
}