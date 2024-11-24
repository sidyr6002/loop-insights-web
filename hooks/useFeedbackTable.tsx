import React, { startTransition, useCallback } from "react";
import type {
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { useTableStore } from "@/stores/table-store";
import { parseQueryState } from "@/lib/parseQueryState";
import { useFeedbackTableQuery } from "./useFeedbackTableQuery";
import { Project } from "@prisma/client";

interface UseFeedbackTableProps {
    projectId: Project["id"];
    searchParams: URLSearchParams;
}

export const useFeedbackTable = ({
    projectId,
    searchParams,
}: UseFeedbackTableProps) => {
    const {
        pagination,
        sorting,
        filters,
        preferredPageSize,
        setPagination,
        setSorting,
        setFilters,
        setPreferredPageSize,
    } = useTableStore();

    console.log(
        "[useFeedbackTable] pagination: ",
        pagination,
    )

    // Initialize from URL params
    React.useEffect(() => {
        const {
            pagination: urlPagination,
            sorting: urlSorting,
            filters: urlFilters,
        } = parseQueryState(searchParams);

        const currentState = useTableStore.getState();

        // Compare and update pagination if different
        if (
            urlPagination.pageIndex !== currentState.pagination.pageIndex ||
            urlPagination.pageSize !== currentState.pagination.pageSize
        ) {
            setPagination(urlPagination);
        }

        // Compare and update sorting if different
        if (JSON.stringify(urlSorting) !== JSON.stringify(currentState.sorting)) {
            setSorting(urlSorting);
        }

        // Compare and update filters if different
        if (JSON.stringify(urlFilters) !== JSON.stringify(currentState.filters)) {
            setFilters(urlFilters);
        }
    }, [searchParams]);

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
                setPagination(
                    typeof updater === "function" ? updater(pagination) : updater
                );
            });
        },
        [setPagination, pagination]
    );

    const handleSortingChange: OnChangeFn<SortingState> = useCallback(
        (updater) => {
            startTransition(() => {
                setSorting(
                    typeof updater === "function" ? updater(sorting) : updater
                );
            });
        },
        [setSorting, sorting]
    );

    const handleFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
        (updater) => {
            startTransition(() => {
                setFilters(
                    typeof updater === "function" ? updater(filters) : updater
                );
            });
        },
        [setFilters, filters]
    );

    // URL sync effect
    // React.useEffect(() => {
    //     const queryString = qs.stringify({
    //         page: pagination.pageIndex + 1,
    //         size: pagination.pageSize,
    //         sort: sorting[0]?.id,
    //         order: sorting[0]?.desc ? "desc" : "asc",
    //         ...filterParams,
    //     });

    //     window.history.replaceState(
    //         {},
    //         "",
    //         `${window.location.pathname}?${queryString}`
    //     );
    // }, [pagination, sorting, filterParams]);

	//console.log('[useFeedbackTable] feedbackData: ', feedbackData);

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
        preferredPageSize,

        // Handlers
        handlePaginationChange,
        handleSortingChange,
        handleFiltersChange,
        setPreferredPageSize,
    };
};
