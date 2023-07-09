import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(price))
}

export function formatDate(date: Date | string) {
    return dayjs(date).format("MMMM D, YYYY")
}

export function isArrayOfFile(files: unknown): files is File[] {
    const isArray = Array.isArray(files)
    if (!isArray) return false
    return files.every((file) => file instanceof File)
}

export function formatBytes(
    bytes: number,
    decimals = 0,
    sizeType: "accurate" | "normal" = "normal"
) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
    if (bytes === 0) return "0 Byte"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
        }`
}