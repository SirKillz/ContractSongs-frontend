"use client"

import { Typography } from "@mui/material";
import AutoHeightPage from "@/components/common/AutoHeightPage";
import { useParams } from "next/navigation";
import Section from "@/components/common/Section";

import { useGetSession } from "@/hooks/sessions";

export default function EditSessionPage() {

    const params = useParams<{id: string}>();
    const id = params.id;

    const {
        isPending: isGettingSession,
        isError: isErrorGettingSession,
        data: sessionData
    } = useGetSession({enabled: true, id: Number(id)})

    return (
        <AutoHeightPage>
            <Section>
                <Typography variant="h1" component={"h1"}>Edit Session</Typography>
            </Section>
        </AutoHeightPage>
    )
}