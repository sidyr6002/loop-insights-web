import React, { memo } from "react";
import Link from "next/link";

import TooltipWrapper from "@/components/tooltip-wrapper";

import { ChevronLeft, Code, Globe } from "lucide-react";

interface ProjectHeaderProps {
    projectTitle: string;
    projectId: string;
    projectURL: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({projectTitle, projectId, projectURL}) => {
    return (
        <header
            role="banner"
            aria-label="Project Header"
            className="p-3 md:p-4 lg:p-6 flex flex-col sm:flex-row sm:items-start gap-2 rounded-2xl"
        >
            <div className="w-full flex flex-col space-y-6">
                <Link href="/dashboard" className="flex items-center gap-1 text-blue-700"><ChevronLeft className="w-4 h-4" /> Back to Dashboard</Link>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-zinc-900">
                            {projectTitle}
                        </h2>
                        <div className="flex items-center text-xs md:text-sm gap-2">
                            <span>Project ID:</span>
                            <h4 className="select-all font-medium text-blue-700">{projectId}</h4>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <TooltipWrapper content="Instructions">
                            <Link
                                href={`/projects/${projectId}/instructions`}
                                className="p-1 lg:p-1.5 flex items-center gap-2 rounded-full text-zinc-100 bg-neutral-700"
                            >
                                <Code className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                            </Link>
                        </TooltipWrapper>
                        <TooltipWrapper content="Visit the Site">
                            <Link
                                href={projectURL}
                                className="p-1 lg:p-1.5 flex items-center gap-2 rounded-full text-zinc-100 bg-blue-700"
                            >
                                <Globe className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                            </Link>
                        </TooltipWrapper>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default memo(ProjectHeader);
