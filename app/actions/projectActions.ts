"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { projectSchema } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const MAX_FREE_PROJECTS = 5;
const activeSubscriptionOptions = ["active", "trialing"];

export const getAllProjects = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
            include: {
                subscription: true
            }
        });

        
        if (!existingUser) {
            throw new Error("User not found.");
        }
        
        const stripeSubscription = existingUser.subscription
            ? await stripe.subscriptions.retrieve(existingUser.subscription.stripeSubscriptionId)
            : null;

        const hasSubscription = stripeSubscription
            ? activeSubscriptionOptions.includes(stripeSubscription.status) && !stripeSubscription.pause_collection
            : false;
            
        const projects = await prisma.project.findMany({
            where: {
                userId: existingUser.id,
            },
            orderBy: {
                createdAt: "asc",
            }
        });

        return { hasSubscription, projects };
    } catch (error) {
        console.error("[getAllProjects] Error: ", error);

        return { hasSubscription: false, projects: [] };
    }
};

export async function createProject(project: z.infer<typeof projectSchema>) {
    const { projectTitle, projectURL, projectDescription } = project;

    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
            include: {
                subscription: true
            }
        });

        if (!existingUser) {
            throw new Error("User not found.");
        }

        const stripeSubscription = existingUser.subscription
            ? await stripe.subscriptions.retrieve(existingUser.subscription.stripeSubscriptionId)
            : null;

        const hasSubscription = stripeSubscription
            ? activeSubscriptionOptions.includes(stripeSubscription.status) && !stripeSubscription.pause_collection
            : false;

        const countProjects = await prisma.project.count({
            where: {
                userId: existingUser.id,
            },
        });

        if (!hasSubscription && countProjects >= MAX_FREE_PROJECTS) {
            throw new Error("You have reached the maximum number of free projects.");
        }

        const newProject = await prisma.project.create({
            data: {
                title: projectTitle,
                url: projectURL,
                description: projectDescription,
                userId: existingUser.id,
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

export async function editProject({ projectId, project }: { projectId: string, project: z.infer<typeof projectSchema> }) {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        });

        if (!existingUser) {
            throw new Error("User not found in database.");
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
                userId: existingUser.id,
                NOT: {
                    title: project.projectTitle,
                    url: project.projectURL,
                    description: project.projectDescription,
                },
            },
            data: {
                title: project.projectTitle,
                url: project.projectURL,
                description: project.projectDescription,
            },
        });

        if (!updatedProject) {
            throw new Error("Project update failed.");
        }

        return {project: updatedProject}
    } catch (error) {
        console.error("[editProject] Error: ", error);

        return {project: null}
    }
}

export async function deleteProject({ projectId }: { projectId: string }) {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not authenticated.");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        });

        if (!existingUser) {
            throw new Error("User not found in database.");
        }

        const deletedProject = await prisma.project.delete({
            where: {
                id: projectId,
                userId: existingUser.id,
            },
        });

        if (!deletedProject) {
            throw new Error("Project deletion failed.");
        }

        return {project: deletedProject}
    } catch (error) {
        console.error("[deleteProject] Error: ", error);

        return {project: null}
    }
}
