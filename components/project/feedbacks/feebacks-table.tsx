"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Project } from "@prisma/client";

import DataTable from "@/components/data/data-table";
import { feedbackColumns } from "@/components/project/feedbacks/columns";
import { useFeedbackTable } from "@/hooks/useFeedbackTable";

interface FeedbackTableProps {
    projectId: Project["id"];
}

const FeedbacksTable = ({ projectId }: FeedbackTableProps) => {
    const searchParams = useSearchParams();

    const {
        feedbackData,
        pages,
        isLoading,
        paginationState,
        sortingState,
        columnFilters,
        handlePaginationChange,
        setSortingState,
        setColumnFilters,
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
            pagination={paginationState}
            onPaginationChange={handlePaginationChange}
            sorting={sortingState}
            onSortingChange={setSortingState}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
        />
    );
};

export default FeedbacksTable;
