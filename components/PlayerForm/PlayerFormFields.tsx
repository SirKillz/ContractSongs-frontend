"use client"

import { Stack, Tooltip, IconButton, Button, Typography,  } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

import {useFieldArray, TextFieldElement} from "react-hook-form-mui"

import Section from "../common/Section"

import PlayerSongFields from "./PlayerSongFields"

export default function PlayerFields() {
    const {fields, append, remove} = useFieldArray({
        name: "players",
    })

    return (
        <Section>
            <Typography variant="h2" component={"h2"}>Session Players:</Typography>
            <Stack sx={{gap: 2, marginTop: "25px"}}>
                {fields.map((field, index) => (
                    <Section key={field.id}>
                        <Stack direction="row" sx={{alignItems: "center", gap: 1}}>
                            <TextFieldElement
                                name={`players.${index}.name`}
                                label={`Player ${index + 1}`}
                                fullWidth
                                required
                            />
                            <Tooltip title="Remove player">
                                <IconButton
                                    aria-label={`Remove player ${index + 1}`}
                                    onClick={() => remove(index)}
                                    type="button"
                                >
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <PlayerSongFields 
                            playlist_songs={
                                [
                                    {id: "123", name: "Gang Plan Galleon", artist: "David Wise", been_contracted: false},
                                    {id: "456", name: "Stickerbush Symphony", artist: "David Wise", been_contracted: false},
                                ]
                            }
                            playerIndex={index}
                        />
                    </Section>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    onClick={() => append({name: ""})}
                    type="button"
                >
                    Add player
                </Button>
            </Stack>
        </Section>
    )
}