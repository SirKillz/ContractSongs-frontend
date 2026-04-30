"use client"

import { Typography, Stack } from "@mui/material"

import Section from "../Section"
import { useFieldArray, AutocompleteElement } from "react-hook-form-mui"

export default function PlayerSongFields() {

    const {fields, append, remove} = useFieldArray({
        name: "songs"
    });

    return (
        <Section>
            <Typography variant="h3" component={"h3"}>Player Songs:</Typography>
            <Stack sx={{gap: 2, marginTop: "25px"}}>
                {fields.map((field, index) => (
                    <Section key={field.id}>
                        yo
                    </Section>
                ))}
            </Stack>
        </Section>
    )
}