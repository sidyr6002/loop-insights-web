"use client"
import React from 'react'

import { Button } from "@/components/ui/button";
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
    table:  Table<TData>
}

const DataTablePagination = <TData,>({ table }: DataTablePaginationProps<TData>) => {
  return (
    <div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
        >
            First
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            Previous
        </Button>
        <div className="text-sm px-2">
            {table.getState().pagination.pageIndex + 1}
        </div>
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            Next
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() =>
                table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
        >
            Last
        </Button>
    </div>
</div>
  )
}

export default DataTablePagination