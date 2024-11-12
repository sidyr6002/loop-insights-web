"use client";

import {
    startTransition,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { Feedback, Project } from "@prisma/client";
import { getFeedbacks, getPages } from "@/app/actions/feedbackActions";
import lodash from "lodash";
import qs from "qs";

interface QueryState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
}

interface UseFeedbackTableProps {
    projectId: Project["id"];
    searchParams: URLSearchParams;
}

interface UseFeedbackTableReturn {
    feedbackData: Feedback[];
    pages: number;
    isLoading: boolean;
    paginationState: PaginationState;
    sortingState: SortingState;
    columnFilters: ColumnFiltersState;
    handlePaginationChange: (newPagination: React.SetStateAction<PaginationState>) => void;
    setSortingState: (newSorting: React.SetStateAction<SortingState>) => void;
    setColumnFilters: (newFilters: React.SetStateAction<ColumnFiltersState>) => void;
}

const parseQueryState = (searchParams: URLSearchParams): QueryState => {
    const parsed = qs.parse(searchParams.toString());

    return {
        pagination: {
            pageIndex: Number(parsed.page || 1) - 1,
            pageSize: Number(parsed.size || 10),
        },
        sorting: parsed.sort
            ? [
                  {
                      id: parsed.sort as string,
                      desc: parsed.order === "desc",
                  },
              ]
            : [
                  {
                      id: "createdAt",
                      desc: true,
                  },
              ],
        filters: Object.entries(parsed).reduce((acc, [key, value]) => {
            if (!["page", "size", "sort", "order"].includes(key)) {
                acc.push({ id: key, value });
            }
            return acc;
        }, [] as ColumnFiltersState),
    };
};

export const useFeedbackTable = ({
    projectId,
    searchParams,
}: UseFeedbackTableProps): UseFeedbackTableReturn => {
    const {
        pagination: initialPagination,
        sorting: initialSorting,
        filters: initialFilters,
    } = parseQueryState(searchParams);

    // Data state
    const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
    const [pages, setPages] = useState<number>(-1);
    
    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Table state
    const [paginationState, setPaginationState] = useState<PaginationState>(initialPagination);
    const [sortingState, setSortingState] = useState<SortingState>(initialSorting);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialFilters);
    
    // Reset state
    const [resetPage, setResetPage] = useState(false);
    const isMounted = useRef(false);

    // Memoized debounced fetch function
    const debouncedFetch = useCallback(
        useMemo(
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

    // Fetch feedbacks
    const fetchFeedbacks = useCallback(async () => {
        setIsLoading(true);
        try {
            const filters = Object.fromEntries(
                columnFilters.map((filter) => [filter.id, filter.value])
            );

            const feedbacks = await getFeedbacks({
                projectId,
                pagination: paginationState,
                sorting: sortingState,
                filters,
            });

            if (!feedbacks) {
                throw new Error("Something went wrong in fetching feedbacks.");
            }

            startTransition(() => {
                setFeedbackData(feedbacks);
            });
        } catch (error) {
            console.error("[useFeedbackTable] Error: ", error);
        } finally {
            setIsLoading(false);
        }
    }, [projectId, paginationState, sortingState, columnFilters]);

    // Fetch total pages
    const fetchPages = useCallback(async () => {
        try {
            const filters = Object.fromEntries(
                columnFilters.map((filter) => [filter.id, filter.value])
            );

            const totalPages = await getPages({
                projectId,
                pageSize: paginationState.pageSize,
                filters,
            });

            if (totalPages === -1) {
                throw new Error(
                    "Something went wrong in fetching total pages."
                );
            }

            startTransition(() => {
                setPages(totalPages);
            });
        } catch (error) {
            console.error(
                "[useFeedbackTable] Error fetching total pages:",
                error
            );
        }
    }, [projectId, paginationState.pageSize, columnFilters]);

    // Handle pagination changes
    const handlePaginationChange = useCallback(
        (newPagination: React.SetStateAction<PaginationState>) => {
            setIsLoading(true);
            setPaginationState(newPagination);
        },
        []
    );

    // Effects
    useEffect(() => {
        isMounted.current = true;
        debouncedFetch(fetchFeedbacks);
        return () => {
            isMounted.current = false;
            debouncedFetch.cancel();
        };
    }, [
        paginationState,
        sortingState,
        columnFilters,
        debouncedFetch,
        fetchFeedbacks,
    ]);

    useEffect(() => {
        fetchPages();
    }, [projectId, paginationState.pageSize, columnFilters, fetchPages]);

    useEffect(() => {
        if (
            !resetPage &&
            Object.keys(columnFilters).length > 0 &&
            paginationState.pageIndex > 0
        ) {
            setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
            setResetPage(false);
        }
    }, [columnFilters, paginationState.pageIndex, resetPage]);

    return {
        feedbackData,
        pages,
        isLoading,
        paginationState,
        sortingState,
        columnFilters,
        handlePaginationChange,
        setSortingState,
        setColumnFilters,
    };
};
