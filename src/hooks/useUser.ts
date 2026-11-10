"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserAction } from "../actions/authActions";

export function useUser() {
    
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserAction,
    });
}