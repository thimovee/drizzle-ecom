"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Product } from "@/db/schema";
import { Badge } from "@/components/ui/Badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export interface ExtendedProduct extends Product {
    categoryName: string
}
function handleDeletion() {
    toast.error("You need admin priviliges to delete this product.")
}
export const columns: ColumnDef<ExtendedProduct>[] = [
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
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <span className="font-medium">{cell.row.original.name}</span>
        )
    },
    {
        accessorKey: "categoryName",
        header: ({ column }) => {
            return (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Category
                </button>
            );
        },
        cell: (cell) => (
            <span className="font-medium">
                <Badge variant="outline">{cell.row.original.categoryName}</Badge>
            </span>
        ),
    },

    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                </button>
            )
        }
        ,
        cell: (cell) => (
            <span className=" font-medium">{formatPrice(cell.row.original.price)}</span>
        )
    },
    {
        accessorKey: "inventory",
        header: ({ column }) => {
            return (
                <button
                    className="hidden lg:flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Inventory
                </button>
            )
        }
        ,
        cell: (cell) => (
            <span className="hidden lg:flex font-medium">{cell.row.original.inventory}</span>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="hidden lg:flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            )
        }
        ,
        cell: (cell) => <span className="hidden lg:flex px-4">{formatDate(cell.getValue() as Date)}</span>
    },
    {
        id: "actions",
        header: ({ column }) => {
            return (
                <span
                    className="hidden md:flex"
                >
                    Actions
                </span>
            )
        },
        cell: ({ row }) => {
            const product = row.original

            return (
                <div className="hidden md:flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 items-center">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-slate-800">
                            <DropdownMenuItem asChild><a href={`/dashboard/products/edit/${product.id}`} className="flex"><Edit className="w-4 h-4 mr-2" />  Edit</a></DropdownMenuItem>
                            <DropdownMenuItem asChild><a className="flex items-center" href={`/products/${product.id}`}> <Eye className="w-4 h-4 mr-2" /> View</a></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem> <span onClick={handleDeletion} className="flex w-full"><Trash className="w-4 h-4 mr-2" /> Delete</span></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
