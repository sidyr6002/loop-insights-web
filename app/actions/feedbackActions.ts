"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { Feedback, Project } from "@prisma/client";
import { PaginationState, SortingState } from "@tanstack/react-table";

interface FilterOptions {
    userEmail?: string;
    createdAt?: Array<Date>;
}

const buildWhereClause = (projectId: string, filters: FilterOptions) => {
    const whereClause: Record<string, any> = { projectId };

    // Email filter: case-insensitive search
    if (filters.userEmail) {
        whereClause.userEmail = {
            contains: filters.userEmail,
            mode: "insensitive",
        };
    }

    // Date range filter (createdAt between startDate and endDate)
    if (filters.createdAt) {
        whereClause.createdAt = {
            gte: filters.createdAt[0] || undefined,
            lte: filters.createdAt[1] || undefined,
        };
    }

    return whereClause;
};

interface getFeedbacksParams {
    projectId: Project["id"];
    pagination: PaginationState;
    sorting: SortingState;
    filters?: FilterOptions;
}

const sortKeys = ["rating", "userEmail", "createdAt"]

export const getFeedbacks = async ({ projectId, pagination, sorting, filters }: getFeedbacksParams) => {
    try {
        console.log("[getFeedbacks] filters: ", filters);

        const user = await getCurrentUser();
    
        if (!user) {
            throw new Error("User not found or not logged in.");
        }
    
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: user.id,
            }
        });
    
        if (!project) {
            throw new Error("Project not found.");
        }

        if (!sortKeys.includes(sorting[0].id)) {
            throw new Error("Invalid sorting key.");
        }

        const whereClause = buildWhereClause(projectId, filters ?? {});
        const orderByClause = { [sorting[0].id]: sorting[0].desc ? "desc" : "asc" }

        console.log("[getFeedbacks] whereClause: ", whereClause);
    
        const feedbacksAfterFilters: Feedback[] = await prisma.feedback.findMany({
            where: whereClause,
            orderBy: orderByClause,
            skip: pagination.pageIndex * pagination.pageSize,
            take: pagination.pageSize,
        });
    
        return feedbacksAfterFilters;       
    } catch (error) {
        console.error("[getFeedbacks] Error: ", error);

        return null;
    }
};

interface getPagesParams {
    projectId: Project["id"];
    pageSize: number;
    filters?: FilterOptions;
}

export const getPages = async ({ projectId, pageSize = 10, filters }: getPagesParams) => {
    try {
        const user = await getCurrentUser();
    
        if (!user) {
            throw new Error("User not found or not logged in.");
        }
    
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: user.id,
            }
        });
    
        if (!project) {
            throw new Error("Project not found.");
        }

        const whereClause = buildWhereClause(projectId, filters ?? {});

        const feedbackCount = await prisma.feedback.count({
            where: whereClause
        });

        return Math.ceil(feedbackCount / pageSize);
    } catch (error) {
        console.error("[getPages] Error: ", error);
        return -1;
    }
};