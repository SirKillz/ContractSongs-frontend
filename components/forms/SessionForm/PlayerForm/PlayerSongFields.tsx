"use client"

import { Typography, Stack, IconButton, Tooltip, Button, Alert } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

import Section from "@/components/common/Section"
import { useFieldArray, AutocompleteElement, useWatch } from "react-hook-form-mui"

import { SpotifySong } from "@/types/spotify"
import { SessionFormValues } from "@/types/sessionForm"
import { useGetSpotifyPlaylistSongs } from "@/hooks/spotify"

function resolveSongOptions(playlist_songs: SpotifySong[]) {
    return playlist_songs.map((song) => {
        return {id: song.id, label: song.name}
    })
}

type Props = {
    playerIndex: number
}

export default function PlayerSongFields({playerIndex}: Props) {

    const spotifyPlaylist = useWatch<SessionFormValues>({
            name: "playlist.id"
        })
        
        const {
            isFetching: isGettingPlaylistSongs,
            isError: isErrorGettingPlaylistSongs,
            data: songsData
        } = useGetSpotifyPlaylistSongs({
            enabled: !!spotifyPlaylist,
            playlist_id: typeof(spotifyPlaylist) === "string" ? spotifyPlaylist : ""
        })

    const {fields, append, remove} = useFieldArray({
        name: `players.${playerIndex}.songs`
    });

    return (
        <Section>
            <Typography variant="h3" component={"h3"}>Player Songs:</Typography>
            {isErrorGettingPlaylistSongs && 
                <Alert severity="error">Error Getting Playlist Songs - You must be an owner or collaborator!</Alert>
            }
            <Stack sx={{gap: 2, marginTop: "25px"}}>
                {fields.map((field, index) => (
                    <Section key={field.id}>
                        <Stack direction="row" sx={{alignItems: "center", gap: 1}}>
                            <AutocompleteElement 
                                name={`players.${playerIndex}.songs.${index}.id`}
                                options={songsData ? resolveSongOptions(songsData) : []}
                                loading={isGettingPlaylistSongs}
                                autocompleteProps={{
                                    sx: {flex: 1}
                                }}
                            />
                            <Tooltip title="Remove song">
                                <IconButton
                                    aria-label={`Remove song ${index + 1}`}
                                    onClick={() => remove(index)}
                                    type="button"
                                >
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Section>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    onClick={() => append({name: ""})}
                    type="button"
                >
                    Add song
                </Button>
            </Stack>
        </Section>
    )
}