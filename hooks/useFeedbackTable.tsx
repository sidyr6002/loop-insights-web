import React, { startTransition, useCallback, useEffect } from "react";
import type {
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { useFeedbackTableQuery } from "@/hooks/useFeedbackTableQuery";
import { Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { queryToTableState } from "@/lib/urlQueryState";
import { isEqual } from "lodash";
import { useTableStore } from "@/providers/table-store-provider";

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
        setFilters
    } = useTableStore((state) => state);

    //console.log("[useFeedbackTable] filters: ", filters);

    const searchParams = useSearchParams();

    // Convert filters to API format
    const filterParams = React.useMemo(
        () =>
            Object.fromEntries(
                filters.map((filter) => [filter.id, filter.value])
            ),
        [filters]
    );

    useEffect(() => {
        const {
            pagination: urlQueryPagination,
            sorting: urlQuerySorting,
            filters: urlQueryFilters
        } = queryToTableState(searchParams)

        if (!isEqual(pagination, urlQueryPagination)) {
            //console.log("[useFeedbackTable] urlQueryPagination: ", urlQueryPagination);
            setPagination(urlQueryPagination);
        }

        if (!isEqual(sorting, urlQuerySorting)) {
            //console.log("[useFeedbackTable] urlQuerySorting: ", urlQuerySorting);
            setSorting(urlQuerySorting, false);
        }

        if (!isEqual(filters, urlQueryFilters)) {
            //console.log("[useFeedbackTable] urlQueryFilters: ", urlQueryFilters);
            setFilters(urlQueryFilters, false);
        }
    }, [searchParams,setPagination, setSorting, setFilters])

    // // Query data
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
        sorting: sorting,
        filters: filterParams,
    });

    // Change handlers with proper types
    const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newPagination = typeof updater === "function" ? updater(pagination) : updater;
                if(!isEqual(pagination, newPagination)) {
                    //console.log("[handlePaginationChange] newPagination: ", newPagination);
                    setPagination(newPagination);
                }
            });
        },
        [setPagination, pagination]
    );

    const handleSortingChange: OnChangeFn<SortingState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newSorting = typeof updater === "function" ? updater(sorting) : updater;
                if(!isEqual(sorting, newSorting)) {
                    //console.log("[handleSortingChange] newSorting: ", newSorting);
                    setSorting(newSorting);
                }
            });
        },
        [setSorting, sorting]
    );

    const handleFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
        (updater) => {
            startTransition(() => {
                const newFilters = typeof updater === "function" ? updater(filters) : updater;
                if (!isEqual(filters, newFilters)) {
                    //console.log("[handleFiltersChange] newFilters: ", newFilters);
                    setFilters(newFilters);
                }
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
