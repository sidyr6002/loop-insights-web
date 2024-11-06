"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const getAllProjects = async () => {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: user.id,
            },
        });

        return projects;
    } catch (error) {
        console.error("[getAllProjects] Error: ", error);

        return null;
    }
};
