"use client";

import React, { memo } from "react";
import { useRouter } from "next/navigation";

import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/app/actions/projectActions";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock } from "lucide-react";
import ProjectControlOptions from "./project/project-control-options";

const Projects = () => {
    const router = useRouter();

    const {
        data,
        isLoading,
        isError,
    } = useQuery<{ hasSubscription: boolean; projects: Project[] }>({
        queryKey: ["projects"],
        queryFn: async () => {
            const data = await getAllProjects();
            return data;
        }
    });

    if (isLoading) {
        return <Skeleton className="flex-grow rounded-2xl" />;
    }

    if (isError || !data) {
        return (
            <div className="mt-8 p-3 sm:p-4 lg:p-8 flex justify-center text-lg lg:text-xl font-bold text-rose-500/90 bg-zinc-300/50 rounded-2xl">
                Something went wrong
            </div>
        );
    }

    const { hasSubscription, projects } = data;

    if (projects.length === 0) {
        return (
            <div className="mt-8 p-3 sm:p-4 lg:p-8 flex justify-center text-lg lg:text-xl font-semibold text-neutral-700 bg-zinc-300/50 rounded-2xl">
                There are no projects, create one!
            </div>
        );
    }

    const MAX_FREE_PROJECTS = 5;
    const canAddMoreProjects = hasSubscription || projects.length < MAX_FREE_PROJECTS;

    return (
        <div className="flex-grow p-3 sm:p-4 lg:p-8 bg-zinc-300/50 rounded-2xl">
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="cursor-pointer flex flex-col bg-zinc-100 rounded-2xl shadow hover:shadow-sm lg:hover:scale-105 transition-all duration-150 relative"
                    >
                        <ProjectControlOptions project={project} />
                        <CardHeader className="p-4 sm:p-6 flex flex-col space-y-2">
                            <CardTitle className="text-xl">
                                {project.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 sm:p-6 flex-grow flex justify-end items-end">
                            <Button
                                size="sm"
                                className="px-3 sm:px-4 text-xs sm:text-sm rounded-full bg-gradient-to-tr from-neutral-600 to-neutral-700 hover:from-blue-600 hover:to-blue-700 transition-colors duration-100"
                                onClick={() =>
                                    router.push(`/projects/${project.id}`)
                                }
                            >
                                View
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {!canAddMoreProjects && (
                    <Card
                        className="flex flex-col bg-zinc-100 rounded-2xl shadow opacity-50 cursor-pointer"
                        onClick={() => router.push("/subscriptions")}
                    >
                        <CardHeader className="p-2 sm:p-4 flex flex-col space-y-2 items-center justify-center">
                            <Lock className="w-8 h-8 text-neutral-500" />
                            <CardTitle className="text-xl text-center">
                                Project Limit Reached
                            </CardTitle>
                            <CardDescription className="text-sm text-center">
                                Upgrade your subscription to create more
                                projects
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-2 sm:p-4 flex-grow flex justify-end items-end">
                            <Button
                                size="sm"
                                className="px-3 sm:px-4 text-xs sm:text-sm rounded-full bg-blue-700 hover:bg-blue-700/90"
                            >
                                Upgrade Subscription
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default memo(Projects);
