"use client";

import React from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input";
import DataTablePagination from "./data-table.pagination";
import { cn } from "@/lib/utils";
import DataEmailSearch from "./data-email-search";
import { Button } from "../ui/button";
import { keyNameMap } from "../project/feedbacks/columns";
import DataVisibilityFilter from "./data-visibiity-filter";
import DataDateRangeFilter from "./data-date-range-filter";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pages: number;
    pagination: PaginationState;
    sorting: SortingState;
    onPaginationChange: OnChangeFn<PaginationState>;
    onSortingChange: OnChangeFn<SortingState>;
    columnFilters: ColumnFiltersState;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
}

const DataTable = <TData, TValue>({
    columns,
    data,
    pages,
    pagination,
    sorting,
    onPaginationChange,
    onSortingChange,
    columnFilters,
    onColumnFiltersChange,
}: DataTableProps<TData, TValue>) => {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: onSortingChange,
        onPaginationChange: onPaginationChange,
        onColumnFiltersChange: onColumnFiltersChange,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility
        },
        pageCount: pages,
        manualSorting: true,
        manualPagination: true,
        manualFiltering: true,
    });

    return (
        <div className="px-2 sm:px-4">
            <div className="flex justify-end pb-4">
                <DataDateRangeFilter column={table.getColumn("createdAt")} table={table} />
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-2 items-center pb-4">
                <DataEmailSearch table={table} />
                <DataVisibilityFilter table={table} />
            </div>
            <div className="rounded-xl border">
                <Table className="border-separate bg-zinc-300">
                    <TableHeader className="border-separate">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-blue-700/95 hover:bg-blue-700"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-sm lg:text-base text-neutral-50 rounded-md"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="border-separate rounded-2xl">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="even:bg-zinc-400/20"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-xs lg:text-sm rounded-md text-neutral-800"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
};

export default DataTable;
