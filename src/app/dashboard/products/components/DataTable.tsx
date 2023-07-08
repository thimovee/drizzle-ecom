"use client"
import * as React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, PaginationState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, PlusCircle, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <div className="rounded-md">
            <div className="flex pt-2 pb-4 w-full justify-between">
                <Input className="max-w-fit focus:outline-none" onChange={(event: any) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)}
                    placeholder="Filter products..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""} />
                <div className="flex gap-2">
                    {table.getFilteredSelectedRowModel().rows.length > 0 && <Button variant="destructive" className="items-center  text-slate-100"> <Trash className="w-4 h-4 mr-2" /> Delete ({table.getFilteredSelectedRowModel().rows.length})</Button>}
                    <Button className="items-center bg-slate-900 text-slate-100"> <PlusCircle className="w-4 h-4 mr-2" /> Add Product</Button>
                    <Button className="items-center bg-slate-900 text-slate-100"> <Download className="w-4 h-4 mr-2" /> Download</Button>
                </div>
            </div>
            <div className="border-b border-b-transparent">
                <Table className="min-h-[620px]">
                    <TableHeader className="bg-slate-100 font-semibold ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="max-w-fit">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-hidden">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex justify-between mt-4 px-2">
                    <div className="flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getRowModel().rows.length} row(s) selected.
                    </div>
                    <span className="text-sm flex items-center mr-4 font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </span>
                    <div className="flex gap-2">
                        <Button className="border rounded p-2 items-center" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}> <ChevronsLeft className="w-4 h-4" /> </Button>
                        <Button className="border rounded p-2 items-center" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}> <ChevronLeft className="w-4 h-4" /> </Button>
                        <Button className="border rounded p-2 items-center" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}> <ChevronRight className="w-4 h-4" /> </Button>
                        <Button className="border rounded p-2 items-center" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}> <ChevronsRight className="w-4 h-4" /> </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}