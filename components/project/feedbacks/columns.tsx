"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Feedback } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"


export const keyNameMap: Record<string, string> = {
    userName: "Name",
    userEmail: "Email",
    rating: "Rating",
    feedback: "Feedback",
    createdAt: "Date",
}

export const feedbackColumns: ColumnDef<Partial<Feedback>>[] = [
    {
        accessorKey: "userName",
        header: "Name",
    },
    {
        accessorKey: "userEmail",
        header: ({ column }) => {
            return (
                <div className="flex justify-between items-center transition duration-200 ease-in-out">
                    {keyNameMap[column.id]}
                    <div className="w-2" />
                    <span
                        className="text-zinc-100 cursor-pointer hover:text-zinc-100 hover:scale-110 hover:bg-transparent transition duration-150"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        {column.getIsSorted() === "asc" ? (
                            <ArrowDown size={16} />
                        ) : (
                            <ArrowUp size={16} />
                        )}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <div className="flex justify-between items-center transition duration-200 ease-in-out">
                    {keyNameMap[column.id]}
                    <div className="w-2" />
                    <span
                        className="text-zinc-100 cursor-pointer hover:text-zinc-100 hover:scale-110 hover:bg-transparent transition duration-150"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        {column.getIsSorted() === "asc" ? (
                            <ArrowDown size={16} />
                        ) : (
                            <ArrowUp size={16} />
                        )}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "feedback",
        header: ({ column }) => <div>{keyNameMap[column.id]}</div>
        ,
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => <div>{keyNameMap[column.id]}</div>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt")).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

            return <div className="text-left">{date}</div>;
        }
    },
   
];