"use client";

import { useState } from "react";
import { Project } from "@prisma/client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import EditProject from "@/components/dashboard/project/edit-project";
import DeleteProject from "@/components/dashboard/project/delete-project";

interface ProjectOptionsProps {
    project: Project;
}

const ProjectControlOptions: React.FC<ProjectOptionsProps> = ({ project }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);

    return (
        <div className="absolute top-2 right-2 z-10">
            <DropdownMenu open={optionsOpen} onOpenChange={setOptionsOpen}>
                <DropdownMenuTrigger className="h-6 w-6 p-0 hover:text-blue-600">
                        <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <EditProject
                        project={project}
                        setOptionsOpen={setOptionsOpen}
                    />
                    <DeleteProject
                        project={project}
                        setOptionsOpen={setOptionsOpen}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProjectControlOptions;
