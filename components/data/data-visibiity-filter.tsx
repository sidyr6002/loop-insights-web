import React from 'react'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { Table } from '@tanstack/react-table'
import { keyNameMap } from '../project/feedbacks/columns'

interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }

const DataVisibilityFilter = <TData,>({table}: DataTablePaginationProps<TData>) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto text-neutral-50 bg-neutral-600 hover:bg-neutral-300">
        Columns
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className='bg-neutral-500'>
      {table
        .getAllColumns()
        .filter(
          (column) => column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize text-zinc-50 focus:bg-neutral-300"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(!!value)
              }
            >
              {keyNameMap[column.id]}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DataVisibilityFilter