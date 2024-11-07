import React, { memo } from "react";
import { PieChart } from "lucide-react";
import CreateProjectButton from "./create-project";

const DashboardHeader = () => {
    return (
        <header role="banner" aria-label="Dashboard Header" className="p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-start gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 relative">
            <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                    <PieChart className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-zinc-100" />
                    <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-zinc-50">
                        Dashboard
                    </h2>
                </div>
                <p className="mt-4 text-sm lg:text-base text-blue-100 max-w-2xl">
                    Your central hub for managing and tracking all projects.
                    Track the status, milestones, and key updates of every
                    project in real time.
                </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-grow items-center justify-between sm:justify-end">
                <h5 className="block sm:hidden font-semibold text-zinc-200">
                    Add Project
                </h5>
                <CreateProjectButton />
            </div>
        </header>
    );
};

export default memo(DashboardHeader);
