'use client';

import { useEffect } from "react";

export function Providers({ children }: {children: React.ReactNode}) {
    useEffect(() => {
        if(!localStorage.getItem("userId")) {
            localStorage.setItem("userId", crypto.randomUUID())
        }
    }, [])

    return (
        <>
        {children}
        </>
    )
}