"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type Product } from "@/db/schema"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/Button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { filterProductsAction } from "@/app/_actions/product"
import { Search } from "lucide-react"
import Link from "next/link"

export function Combobox() {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const debouncedQuery = useDebounce(query, 300)
    const [data, setData] = React.useState<
        | {
            products: Pick<Product, "id" | "name">[]
        }[]
        | null
    >(null)
    const [isPending, startTransition] = React.useTransition()

    React.useEffect(() => {
        if (debouncedQuery.length === 0) setData(null)

        if (debouncedQuery.length > 0) {
            startTransition(async () => {
                const data = await filterProductsAction(debouncedQuery)
                // @ts-ignore
                setData(data)
            })
        }
    }, [debouncedQuery])

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen((isOpen) => !isOpen)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])


    React.useEffect(() => {
        if (!isOpen) {
            setQuery("")
        }
    }, [isOpen])

    return (
        <>
            <Button
                variant="outline"
                className=" relative h-10 p-0 w-fit pr-4 lg:pr-20 items-center justify-start "
                onClick={() => setIsOpen(true)}
            >
                <Search className="h-4 w-4 mx-2" aria-hidden="true" />
                <span className="">Search products...</span>
                <span className="sr-only">Search products</span>
                <kbd className="hidden pointer-events-none absolute right-1.5 top-2  h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
                    <span className="text-xs">Ctrl</span>K
                </kbd>
            </Button>
            <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
                <CommandInput
                    placeholder="Search products..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {isPending ? (
                        <div className="space-y-1 overflow-hidden px-1 py-2">
                            <Skeleton className="h-8 rounded-sm" />
                            <Skeleton className="h-8 rounded-sm" />
                            <Skeleton className="h-8 rounded-sm" />
                        </div>
                    ) : (
                        <>
                            {data && <ul className="flex flex-col gap-2 w-full p-2">
                                {data.map((product) => (
                                    // @ts-ignore
                                    <a href={`/products/${product.id}`} className="hover:cursor-pointer h-8 rounded-md hover:bg-zinc-100 w-full flex items-center" key={product.id}>
                                        {/* @ts-ignore */}
                                        <h3 className="font-medium text-sm leading-none pl-4">{product.name}</h3>
                                    </a>
                                ))}
                            </ul>}
                        </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}