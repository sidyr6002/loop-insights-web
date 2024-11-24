"use client";

// import { useSearchParams } from "next/navigation";
import { use } from "react";
import { Project } from "@prisma/client";

import { useFeedbackTable } from "@/hooks/useFeedbackTable";

import DataTable from "@/components/data/data-table";
import { feedbackColumns } from "@/components/project/feedbacks/columns";
import { useSearchParams } from "next/navigation";

interface FeedbackTableProps {
    projectId: Project["id"];
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const FeedbacksTable = ({ projectId }: FeedbackTableProps) => {
    const searchParams = useSearchParams();
    //const filters = searchParams; 
    //const jsonFilters = filters ? JSON.parse(filters) : {}

    //console.log("[FeedbacksTable] searchParams: ", searchParams);

    const {
        feedbackData,
        pages,
        isLoading,
        pagination,
        sorting,
        columnFilters,
        handlePaginationChange,
        handleSortingChange,
        handleFiltersChange,
    } = useFeedbackTable({
        projectId,
        searchParams,
    });

    return (
        <DataTable
            columns={feedbackColumns}
            data={feedbackData}
            pages={pages}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            columnFilters={columnFilters}
            onColumnFiltersChange={handleFiltersChange}
        />
    );
};

export default FeedbacksTable;
