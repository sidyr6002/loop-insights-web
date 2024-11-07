import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
    children: React.ReactNode;
    content: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
    children,
    content,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent className="text-sm rounded-2xl">
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipWrapper;
