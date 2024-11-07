import React from "react";
import Link from "next/link";

import TooltipWrapper from "@/components/tooltip-wrapper";

import { Globe } from "lucide-react";

interface ProjectHeaderProps {
    projectTitle: string;
    projectDescription: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({projectTitle, projectDescription}) => {
    return (
        <header
            role="banner"
            aria-label="Project Header"
            className="p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-start gap-2 rounded-2xl"
        >
            <div className="w-full flex flex-col space-y-3">
                <div className="flex justify-between items-center space-x-3">
                    <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-zinc-900">
                        {projectTitle}
                    </h2>
                    <TooltipWrapper content="Visit the Site">
                        <Link
                            href="/projects"
                            className="p-1 lg:p-1.5 flex items-center gap-2 rounded-full text-zinc-100 bg-blue-700"
                        >
                            <Globe className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        </Link>
                    </TooltipWrapper>
                </div>
                <p className="text-sm lg:text-base text-zinc-500 max-w-2xl">
                    {projectDescription}
                </p>
            </div>
        </header>
    );
};

export default ProjectHeader;
