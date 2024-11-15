"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import ProjectsSection from "@/components/dashboard/projects-sections";

const Dashboard = () => {
    const [priceId, setPriceId] = React.useState<string | null>(null);
    const router = useRouter();

    useLayoutEffect(() => {
        const storedProductId = localStorage.getItem("priceId");
        setPriceId(storedProductId);
    }, []);

    if (priceId) {
        localStorage.removeItem("priceId");
        return router.push(`/checkout?priceId=${priceId}`);
    }

    return (
        <div className="w-full max-w-6xl flex-grow flex flex-col space-y-8 mx-auto sm:px-4">
            <DashboardHeader />
            <ProjectsSection />
        </div>
    );
};

export default Dashboard;
