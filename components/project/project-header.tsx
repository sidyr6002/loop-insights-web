import React, { memo } from "react";
import Link from "next/link";

import TooltipWrapper from "@/components/tooltip-wrapper";

import { ChevronLeft, Globe } from "lucide-react";

interface ProjectHeaderProps {
    projectTitle: string;
    projectURL: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({projectTitle, projectURL}) => {
    return (
        <header
            role="banner"
            aria-label="Project Header"
            className="p-3 md:p-4 lg:p-6 flex flex-col sm:flex-row sm:items-start gap-2 rounded-2xl"
        >
            <div className="w-full flex flex-col space-y-6">
                <Link href="/dashboard" className="flex items-center gap-1 text-blue-700"><ChevronLeft className="w-4 h-4" /> Back to Dashboard</Link>
                <div className="flex justify-between items-center space-x-3">
                    <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-zinc-900">
                        {projectTitle}
                    </h2>
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
        </header>
    );
};

export default memo(ProjectHeader);
