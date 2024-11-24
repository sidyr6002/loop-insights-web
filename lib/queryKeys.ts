import { Project } from "@prisma/client";
import { PaginationState, SortingState } from "@tanstack/react-table";

export interface FeedbackQueryParams {
    projectId: Project["id"];
    pagination: PaginationState;
    sorting: SortingState;
    filters: Record<string, unknown>;
}


export interface PagesQueryParams {
    projectId: Project["id"];
    pageSize: number;
    filters: Record<string, unknown>;
}


export const queryKeys = {
    feedbacks: {
        all: ["feedbacks"] as const,
        list: (params: FeedbackQueryParams) =>
            [...queryKeys.feedbacks.all, params] as const,
        filtered: (filters: Record<string, unknown>) =>
            [...queryKeys.feedbacks.all, { filters }] as const,
    },
    pages: {
        all: ["feedbackPages"] as const,
        filtered: (params: PagesQueryParams) =>
            [...queryKeys.pages.all, params] as const,
    },
} as const;