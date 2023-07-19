"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/db/schema";

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
        accessorKey: "Products",
        header: ({ column }) => {
            return (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Products
                </button>
            );
        },
        cell: (cell) => (
            <div className="flex flex-col">
                {cell.row.original.productNames.split(",").map((productName, index) => (
                    <div className="flex items-center gap-2" key={index}>
                        <span className="font-medium">- {productName}</span>
                    </div>
                ))}
            </div>
        ),
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
]
