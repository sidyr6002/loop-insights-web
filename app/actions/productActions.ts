"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

export async function addProject(project: z.infer<typeof projectSchema>) {
    const { projectTitle, projectURL, projectDescription } = project;

    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        const newProject = await prisma.project.create({
            data: {
                title: projectTitle,
                url: projectURL,
                description: projectDescription,
                userId: user.id,
            },
        });

        if (!newProject) {
            throw new Error("Project creation failed.");
        }

        return newProject;
    } catch (error) {
        console.error("[addProject] Error: ", error);

        return null;
    }
}
