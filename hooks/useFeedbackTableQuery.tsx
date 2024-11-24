import { getFeedbacks, getPages } from "@/app/actions/feedbackActions";
import { FeedbackQueryParams, queryKeys } from "@/lib/queryKeys";
import { Feedback } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const getFeedbacksWithFallback = async (
    params: FeedbackQueryParams
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

export const useFeedbackTableQuery = (params: FeedbackQueryParams) => {
    const queryClient = useQueryClient();

    //console.log("[useFeedbackTableQuery] params: ", params);

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
        queryFn: () =>
            getPages({
                projectId: params.projectId,
                pageSize: params.pagination.pageSize,
                filters: params.filters,
            }),
        staleTime: 30_000,
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
