import React from "react";
import { redirect } from "next/navigation";
import createInitialUser from "@/lib/createInitialUser";

import Header from "@/components/header";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    // const user = await createInitialUser();

    // if (!user) {
    //     return redirect("/sign-in");
    // }

    return (
        <main className="min-h-screen container mx-auto flex flex-col">
            <Header type="main" />
            <div className="flex-grow px-4 sm:px-6 lg:px-12 mt-6 lg:mt-16">
                {children}
            </div>
        </main>
    );
};

export default MainLayout;
