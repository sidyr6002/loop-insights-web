export const dynamic = 'force-dynamic'

import DashboardHeader from "@/components/dashboard/dashboard-header";
import ProjectsServerComponent from "@/components/dashboard/projects-server-component";

const Dashboard = () => {
    return (
        <div className="w-full max-w-6xl flex-grow flex flex-col space-y-8 mx-auto sm:px-4">
            <DashboardHeader />
            <ProjectsServerComponent />
        </div>
    );
};

export default Dashboard;
