import React from "react";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import ProjectsSection from "@/components/dashboard/projects-sections";

const Dashboard = () => {
    return (
        <div className="w-full max-w-6xl mx-auto sm:px-4">
            <DashboardHeader />
            <ProjectsSection />
        </div>
    );
};

export default Dashboard;
