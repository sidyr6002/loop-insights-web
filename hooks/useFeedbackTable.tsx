import React, { startTransition, useCallback } from "react";
import type {
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { useTableStore } from "@/stores/table-store";
import { useFeedbackTableQuery } from "@/hooks/useFeedbackTableQuery";
import { Project } from "@prisma/client";
import { queryToTableState } from "@/lib/urlQueryState";
import { isEqual } from "lodash";

interface UseFeedbackTableProps {
    projectId: Project["id"];
}

export const useFeedbackTable = ({
    projectId,
}: UseFeedbackTableProps) => {
    const {
        pagination,
        sorting,
        filters,
        setPagination,
        setSorting,
        setFilters,
    } = useTableStore();

    // Convert filters to API format
    const filterParams = React.useMemo(
        () =>
            Object.fromEntries(
                filters.map((filter) => [filter.id, filter.value])
            ),
        [filters]
    );

    // Query data
    const {
        feedbackData,
        pages,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useFeedbackTableQuery({
        projectId,
        pagination,
        sorting,
        filters: filterParams,
    });

    // Change handlers with proper types
    const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newPagination = typeof updater === "function" ? updater(pagination) : updater;
                setPagination(newPagination);
            });
        },
        [setPagination, pagination]
    );

    const handleSortingChange: OnChangeFn<SortingState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newSorting = typeof updater === "function" ? updater(sorting) : updater;
                setSorting(newSorting);
            });
        },
        [setSorting, sorting]
    );

    const handleFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newFilters = typeof updater === "function" ? updater(filters) : updater;
                setFilters(newFilters);
            });
        },
        [setFilters, filters]
    );

    return {
        // Data
        feedbackData,
        pages,
        isLoading,
        isFetching,
        error,
        refetch,

        // State
        pagination,
        sorting,
        columnFilters: filters,

        // Handlers
        handlePaginationChange,
        handleSortingChange,
        handleFiltersChange,
    };
};
