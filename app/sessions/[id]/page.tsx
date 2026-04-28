"use client"

import { useParams } from "next/navigation"

export default function SessionDetailPage() {
    const params = useParams<{id: string}>();
    const id = params.id;

    return <h1>Yo</h1>
}