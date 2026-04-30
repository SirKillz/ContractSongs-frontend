"use client"

import { Typography, Stack, IconButton, Tooltip, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

import Section from "../common/Section"
import { useFieldArray, AutocompleteElement } from "react-hook-form-mui"

import { SpotifySong } from "@/types/spotify"

function transformPlaylistSongs(playlist_songs: SpotifySong[]) {
    return playlist_songs.map((song) => {
        return {id: song.id, label: song.name}
    })
}

type props = {
    playlist_songs: SpotifySong[]
    playerIndex: number
}

export default function PlayerSongFields({playlist_songs, playerIndex}: props) {

    const {fields, append, remove} = useFieldArray({
        name: `players.${playerIndex}.songs`
    });

    return (
        <Section>
            <Typography variant="h3" component={"h3"}>Player Songs:</Typography>
            <Stack sx={{gap: 2, marginTop: "25px"}}>
                {fields.map((field, index) => (
                    <Section key={field.id}>
                        <Stack direction="row" sx={{alignItems: "center", gap: 1}}>
                            <AutocompleteElement 
                                name={`players.${playerIndex}.songs.${index}.id`}
                                options={transformPlaylistSongs(playlist_songs)}
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