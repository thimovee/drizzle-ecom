"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Category } from "@/db/schema";
import { Badge } from "@/components/ui/Badge";
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
                    className="hidden md:flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                </button>
            )
        },
        cell: (cell) => (
            <span className="font-medium hidden md:flex">{cell.row.original.description.slice(0, 100)}...</span>
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
                    className="hidden md:flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        }
        ,
        cell: (cell) => <span className="hidden md:flex">{formatDate(cell.getValue() as Date)}</span>
    },
]
