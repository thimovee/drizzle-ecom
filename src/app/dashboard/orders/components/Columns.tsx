"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/db/schema";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "@/components/ui/Modal";

export interface ExtendedOrder extends Order {
    productNames: string,
    totalOrderPrice: number
}

export const columns: ColumnDef<ExtendedOrder>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <span className="font-medium">{cell.row.original.id}</span>
        )
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Address
                </button>
            )
        }
        ,
        cell: (cell) => (
            <span className=" font-medium">{cell.row.original.address}</span>
        )
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Phone
                </button>
            )
        }
        ,
        cell: (cell) => (
            <span className=" font-medium">{cell.row.original.phone}</span>
        )
    },
    {
        accessorKey: "totalOrderPrice",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total
                </button>
            )
        }
        ,
        cell: (cell) => (
            <span className=" font-medium">{formatPrice(cell.row.original.totalOrderPrice)}</span>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="hidden xl:flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        }
        ,
        cell: (cell) => <span className="hidden xl:flex">{formatDate(cell.getValue() as Date)}</span>
    },
]
