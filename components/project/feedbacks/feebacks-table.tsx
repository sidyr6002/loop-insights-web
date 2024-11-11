"use client";

import React, { startTransition, useEffect } from "react";
import DataTable from "@/components/data/data-table";

import { Feedback, Project } from "@prisma/client";
import { feedbackColumns } from "./columns";
import { getFeedbacks, getPages } from "@/app/actions/feedbackActions";

import qs from "qs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnFiltersState, PaginationState, SortingColumn, SortingState } from "@tanstack/react-table";

import lodash from "lodash";

const parseQueryState = (searchParams: URLSearchParams) => {
    const parsed = qs.parse(searchParams.toString());
    
    return {
        pagination: {
            pageIndex: Number(parsed.page || 1) - 1,
            pageSize: Number(parsed.size || 10),
        },
        sorting: parsed.sort ? [{
            id: parsed.sort as string,
            desc: parsed.order === "desc",
        }] : [{
            id: "createdAt",
            desc: true,
        }],
        filters: Object.entries(parsed).reduce((acc, [key, value]) => {
            if (!['page', 'size', 'sort', 'order'].includes(key)) {
                acc.push({ id: key, value });
            }
            return acc;
        }, [] as ColumnFiltersState)
    };
};

interface FeedbackTableProps {
    projectId: Project["id"]
}

const FeedbacksTable = ({
    projectId,
}: FeedbackTableProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {pagination: initialPagination, sorting: initialSorting, filters: initialFilters} = parseQueryState(searchParams);

    const [feedbackData, setFeedbackData] = React.useState<Feedback[]>([]);
    const [pages, setPages] = React.useState<number>(-1);

    const [isLoading, setIsLoading] = React.useState(false);

    const [paginationState, setPaginationState] = React.useState<PaginationState>(initialPagination);
    const [sortingState, setSortingState] = React.useState<SortingState>(initialSorting);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters);
    const [resetPage, setResetPage] = React.useState(false);

    //console.log("[FeedbacksTable] paginationState: ", paginationState, " sortingState: ", sortingState, " columnFilters: ", columnFilters);

    const isMounted = React.useRef(false);
    
    // Debounced fetch function
    const debouncedFetch = React.useCallback(
        React.useMemo(
            () =>
                lodash.debounce((callback: () => Promise<void>) => {
                    if (isMounted.current) {
                        callback();
                    }
                }, 100),
            []
        ),
        []
    );

    const fetchFeedbacks = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const filters = Object.fromEntries(
                columnFilters.map(filter => [filter.id, filter.value])
            );

            const feedbacks = await getFeedbacks({
                projectId, 
                pagination: paginationState, 
                sorting: sortingState, 
                filters
            });
                
            if (!feedbacks) {
                throw new Error("Something went wrong in fetching feedbacks.");
            }

            startTransition(() => {
                setFeedbackData(feedbacks);
            });
        } catch (error) {
            console.error("[FeedbacksTable] Error: ", error);
        } finally {
            setIsLoading(false);
        }
    }, [projectId, paginationState, sortingState, columnFilters]);

    const fetchPages = React.useCallback(async () => {
        try {
            const filters = Object.fromEntries(
                columnFilters.map(filter => [filter.id, filter.value])
            );
            
            const totalPages = await getPages({ 
                projectId, 
                pageSize: paginationState.pageSize, 
                filters 
            });
            
            if (totalPages === -1) {
                throw new Error("Something went wrong in fetching total pages.");
            }

            startTransition(() => {
                setPages(totalPages);
            });
        } catch (error) {
            console.error('[FeedbacksTable] Error fetching total pages:', error);
        }
    }, [projectId, paginationState.pageSize, columnFilters]);

    // Handle pagination changes
    const handlePaginationChange = React.useCallback((newPagination: React.SetStateAction<PaginationState>) => {
        setIsLoading(true); // Immediately show loading state
        setPaginationState(newPagination);
    }, []);

    // Effect for data fetching
    useEffect(() => {
        isMounted.current = true;
        debouncedFetch(fetchFeedbacks);
        return () => {
            isMounted.current = false;
            debouncedFetch.cancel();
        };
    }, [paginationState, sortingState, columnFilters, debouncedFetch, fetchFeedbacks]);

    // Effect for pages fetching
    useEffect(() => {
        fetchPages();
    }, [projectId, paginationState.pageSize, columnFilters, fetchPages]);

    // Reset page when filters change
    useEffect(() => {
        if (!resetPage && Object.keys(columnFilters).length > 0 && paginationState.pageIndex > 0) {
            setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
            setResetPage(false);
        }
    }, [columnFilters, paginationState.pageIndex, resetPage]);

    return (
        <DataTable
            columns={feedbackColumns}
            data={feedbackData}
            pagination={paginationState}
            onPaginationChange={handlePaginationChange}
            pages={pages}
            sorting={sortingState}
            onSortingChange={setSortingState}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            isLoading={isLoading}
        />
    );
};

export default FeedbacksTable;
