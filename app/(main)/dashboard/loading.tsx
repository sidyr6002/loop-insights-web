import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoadingPage = () => {
    return (
        <div className="w-full max-w-6xl mx-auto sm:px-4 space-y-8">
            <Skeleton className="h-44 lg:h-40 rounded-2xl" />
            <Skeleton className="h-[480px] rounded-2xl" />
        </div>
    );
};

export default DashboardLoadingPage;
