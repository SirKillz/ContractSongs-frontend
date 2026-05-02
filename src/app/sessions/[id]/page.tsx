"use client"

import { Typography } from "@mui/material";
import { useParams } from "next/navigation"
import AutoHeightPage from "@/components/common/AutoHeightPage";
import { useGetSession } from "@/hooks/sessions";

export default function SessionDetailPage() {
    const params = useParams<{id: string}>();
    const id = params.id;

    const {
        isPending: isGettingSession,
        isError: isErrorGettingSession,
        data: sessionData
    } = useGetSession({
        enabled: !!id,
        id: Number(id)
    })

    return (
        <AutoHeightPage>
            <Typography variant="h1" component={"h1"}>{}</Typography>
        </AutoHeightPage>
    )
}