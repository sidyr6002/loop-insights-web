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
                    Email
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
                    Rating
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
        header: "Feedback",
    },
    {
        accessorKey: "createdAt",
        header: () => <div>Date</div>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt")).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

            return <div className="text-right">{date}</div>;
        }
    },
   
];