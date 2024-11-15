"use client";
import React from "react";
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

const ProjectsSection = () => {
    const router = useRouter();

    const {
        data: projects,
        isLoading,
        isError,
    } = useQuery<Project[] | null>({
        queryKey: ["projects"],
        queryFn: async () => {
            const projects = await getAllProjects();
            return projects;
        },
        refetchInterval: 3000,
    });

    if (isLoading) {
        return <Skeleton className="flex-grow rounded-2xl" />;
    }

    if (isError || !projects) {
        return (
            <div className="mt-8 p-3 sm:p-4 lg:p-8 flex justify-center text-lg lg:text-xl font-bold text-rose-500/90 bg-zinc-300/50 rounded-2xl">
                Something went wrong
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="mt-8 p-3 sm:p-4 lg:p-8 flex justify-center text-lg lg:text-xl font-semibold text-neutral-700 bg-zinc-300/50 rounded-2xl">
                There are no projects, create one!
            </div>
        );
    }

    return (
        <div className="flex-grow p-3 sm:p-4 lg:p-8 bg-zinc-300/50 rounded-2xl">
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="flex flex-col bg-zinc-100 rounded-2xl shadow hover:shadow-sm lg:hover:scale-105 transition-all duration-150"
                    >
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
            </div>
        </div>
    );
};

export default ProjectsSection;
