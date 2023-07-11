"use client"

import { Toaster as RadToaster } from "sonner"

export function Toaster() {
    return (
        <RadToaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#FFFFFF",
                    color: "#000000",
                    border: "1px solid #000000",
                },
            }}
        />
    )
}