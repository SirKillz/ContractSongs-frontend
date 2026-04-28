import { useQuery } from "@tanstack/react-query";

import { getSessions } from "@/api/sessions";

type useGetSessionsOptions = {
    enabled?: boolean
}

export function useGetSessions({enabled}: useGetSessionsOptions) {
    return useQuery({
        queryKey: ["sessions"],
        queryFn: getSessions,
        staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enabled
    })
}