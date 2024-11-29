"use client";

import { memo } from "react";
import { Project } from "@prisma/client";

import { useFeedbackTable } from "@/hooks/useFeedbackTable";

import DataTable from "@/components/data/data-table";
import { feedbackColumns } from "@/components/project/feedbacks/columns";

interface FeedbackTableProps {
    projectId: Project["id"];
}

const FeedbacksTable = ({ projectId }: FeedbackTableProps) => {
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

export default memo(FeedbacksTable);
