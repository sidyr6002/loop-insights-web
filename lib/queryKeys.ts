import { Project } from "@prisma/client";
import { PaginationState, SortingState } from "@tanstack/react-table";

export interface FeedbackQueryParams {
    projectId: Project["id"];
    pagination: PaginationState;
    sorting: SortingState;
    filters: Record<string, unknown>;
}


export interface PagesQueryParams {
    projectId: string;
    pageSize: number;
    filters: Record<string, unknown>;
}

export const queryKeys = {
    feedbacks: {
        all: ["feedbacks"] as const,
        list: (params: FeedbackQueryParams) => [
            ...queryKeys.feedbacks.all, 
            'list', 
            {
                projectId: params.projectId,
                pageIndex: params.pagination.pageIndex,
                pageSize: params.pagination.pageSize,
                sort: params.sorting[0]?.id,
                sortOrder: params.sorting[0]?.desc ? 'desc' : 'asc',
                filters: params.filters
            }
        ] as const,
    },
    pages: {
        all: ["feedbackPages"] as const,
        filtered: (params: PagesQueryParams) => [
            ...queryKeys.pages.all, 
            'filtered',
            {
                projectId: params.projectId,
                pageSize: params.pageSize,
                filters: params.filters
            }
        ] as const,
    },
} as const;