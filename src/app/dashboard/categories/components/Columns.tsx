"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, Copy, Eye, MoreHorizontal, Trash } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Category } from "@/db/schema";
import { Badge } from "@/components/ui/Badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
export const columns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                </button>
            )
        },
        cell: (cell) => (
            <span className="font-medium"><Badge variant="outline">{cell.row.original.name}</Badge></span>
        )
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                </button>
            )
        },
        cell: (cell) => (
            <span className="font-medium"><Badge variant="outline">{cell.row.original.description.slice(0, 100)}...</Badge></span>
        )
    },
    {
        accessorKey: "thumbnail",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Thumbnail
                </button>
            )
        },
        cell: (cell) => (
            // @ts-ignore
            <>{cell.row.original.thumbnail && <Image className="w-8 h-8 object-cover hover:cursor-zoom-in" src={cell.row.original.thumbnail[0].url} width={50} height={50} alt={cell.row.original.name} />}</>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        }
        ,
        cell: (cell) => formatDate(cell.getValue() as Date),
    },
    {
        id: "actions",
        header: ({ column }) => {
            return (
                <span
                    className="flex"
                >
                    Actions
                </span>
            )
        },
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 items-center">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id.toString())}
                        >
                            <Copy className="w-4 h-4 mr-2" />  Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem><Link className="flex items-center" href={`/products/${product.id}`}> <Eye className="w-4 h-4 mr-2" /> Product Page</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem> <Trash className="w-4 h-4 mr-2" /> Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
