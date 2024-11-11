"use client";

import React, { useEffect } from "react";
import DataTable from "@/components/data/data-table";

import { Feedback, Project } from "@prisma/client";
import { feedbackColumns } from "./columns";
import { getFeedbacks, getPages } from "@/app/actions/feedbackActions";

import qs from "qs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnFiltersState, PaginationState, SortingColumn, SortingState } from "@tanstack/react-table";
import useDebounce from "@/hooks/debounce";

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

    const [isLoading, setIsLoading] = React.useState(true);
    const [feedbackData, setFeedbackData] = React.useState<Feedback[]>([]);
    const [pages, setPages] = React.useState<number>(-1);

    const [paginationState, setPaginationState] = React.useState<PaginationState>(initialPagination);
    const [sortingState, setSortingState] = React.useState<SortingState>(initialSorting);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters);
    const [resetPage, setResetPage] = React.useState(false);

    useEffect(() => {

        //console.log("[FeedbacksTable] columnFilters: ", columnFilters);

        const fetchFeedbacks = async () => {
            try {
                const filters = Object.fromEntries(
                    columnFilters.map(filter => [filter.id, filter.value])
                );

                console.log("[FeedbacksTable] filters: ", filters);

                const feedbacks = await getFeedbacks({projectId, pagination: paginationState, sorting: sortingState, filters});
                    
                if (!feedbacks) {
                    throw new Error("Something went wrong in fetching feedbacks.");
                }

                setFeedbackData(feedbacks);

                // Reset pagination to first page for new filters
                if (!resetPage && filters && Object.keys(filters).length > 0 && paginationState.pageIndex > 0) {
                    setPaginationState(prev => ({ ...prev, pageIndex: 0 }));
                    setResetPage(true);
                }
            } catch (error) {
                console.error("[FeedbacksTable] Error: ", error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchFeedbacks();
    }, [projectId, paginationState, sortingState, columnFilters]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const filters = Object.fromEntries(
                    columnFilters.map(filter => [filter.id, filter.value])
                );
                
                const totalPages = await getPages({ projectId, pageSize: paginationState.pageSize, filters });
                
                if (totalPages === -1) {
                    throw new Error("Something went wrong in fetching total pages.");
                }

                setPages(totalPages);
            } catch (error) {
                console.error('[FeedbacksTable] Error fetching total pages:', error);
            }
        };

        fetchPages();
    }, [projectId, paginationState.pageSize, columnFilters]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <DataTable
            columns={feedbackColumns}
            data={feedbackData}
            pagination={paginationState}
            onPaginationChange={setPaginationState}
            pages={pages}
            sorting={sortingState}
            onSortingChange={setSortingState}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
        />
    );
};

export default FeedbacksTable;
