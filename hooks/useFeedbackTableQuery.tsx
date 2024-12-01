import { getFeedbacks, getPages } from "@/app/actions/feedbackActions";
import { queryKeys } from "@/lib/queryKeys";
import { Feedback, Project } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import React from "react";


interface QueryParams {
    projectId: Project["id"];
    pagination: PaginationState;
    sorting: SortingState;
    filters: Record<string, unknown>;
}

const getFeedbacksWithFallback = async (
    params: QueryParams
): Promise<Feedback[]> => {
    try {
        const response = await getFeedbacks(params);

        //console.log("[getFeedbacksWithFallback] response: ", response);
        if (!response || !Array.isArray(response)) {
            console.error("[getFeedbacksWithFallback] Invalid response format");
            return [];
        }

        return response;
    } catch (error) {
        console.error(
            "[getFeedbacksWithFallback] Error fetching feedbacks:",
            error
        );
        return [];
    }
};


export const useFeedbackTableQuery = (params: QueryParams) => {
    const queryClient = useQueryClient();

    // Main data query
    const {
        data: feedbackData = [],
        isLoading,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: queryKeys.feedbacks.list(params),
        queryFn: () => getFeedbacksWithFallback(params),
        staleTime: 30_000,
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Pages query
    const { data: pages = -1, isLoading: isLoadingPages } = useQuery({
        queryKey: queryKeys.pages.filtered({
            projectId: params.projectId,
            pageSize: params.pagination.pageSize,
            filters: params.filters,
        }),
        queryFn: async () => {
            try {
                const { pages } = await getPages({
                    projectId: params.projectId,
                    pageSize: params.pagination.pageSize,
                    filters: params.filters,
                });

                return pages;
            } catch (error) {
                console.error("[useFeedbackTableQuery] Error fetching pages:", error);

                return -1;
            }
        },
        staleTime: 30_000,
        retry: 2,
        refetchOnMount: true,
        enabled: !isLoading,
    });

    // Prefetch next page
    React.useEffect(() => {
        if (params.pagination.pageIndex < pages - 1) {
            const nextPageParams = {
                ...params,
                pagination: {
                    ...params.pagination,
                    pageIndex: params.pagination.pageIndex + 1,
                },
            };

            queryClient.prefetchQuery({
                queryKey: queryKeys.feedbacks.list(nextPageParams),
                queryFn: () => getFeedbacksWithFallback(nextPageParams),
            });
        }
    }, [params, pages, queryClient]);


    return {
        feedbackData,
        pages,
        isLoading: isLoading || isLoadingPages,
        isFetching,
        error,
        refetch,
    };
};
