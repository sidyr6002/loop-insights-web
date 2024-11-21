"use client";

import { useState } from "react";
import { Project } from "@prisma/client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-blue-600"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
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
