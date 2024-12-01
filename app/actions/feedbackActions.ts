"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { FeedbackQueryParams, PagesQueryParams } from "@/lib/queryKeys";
import { Feedback } from "@prisma/client";
import { pages } from "next/dist/build/templates/app-page";

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

const sortKeys = ["rating", "userEmail", "createdAt"]

export const getFeedbacks = async ({ projectId, pagination, sorting, filters }: FeedbackQueryParams) => {
    try {
        //console.log("[getFeedbacks] filters: ", filters);

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

        //console.log("[getFeedbacks] whereClause: ", whereClause);
    
        const feedbacksAfterFilters: Feedback[] = await prisma.feedback.findMany({
            where: whereClause,
            orderBy: orderByClause,
            skip: pagination.pageIndex * pagination.pageSize,
            take: pagination.pageSize,
        });

        //console.log("[getFeedbacks] feedbacksAfterFilters: ", feedbacksAfterFilters);
    
        return feedbacksAfterFilters;       
    } catch (error) {
        console.error("[getFeedbacks] Error: ", error);

        return null;
    }
};

export const getPages = async ({ projectId, pageSize = 10, filters }: PagesQueryParams): Promise<{ pages: number }> => {
    // console.log("pages for project: ", projectId);
    // console.log("[getPages] filters: ", filters);

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

        const whereClause = buildWhereClause(projectId, filters);

        const feedbackCount = await prisma.feedback.count({
            where: whereClause
        });

        return JSON.parse(JSON.stringify( {
            pages: Math.ceil(feedbackCount / pageSize) as number,
        }));
    } catch (error) {
        console.error("[getPages] Error: ", error);
        return {
            pages: -1 as number
        };
    }
};