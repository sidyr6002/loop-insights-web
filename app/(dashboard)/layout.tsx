import Header from "@/components/header";

import createInitialUser from "@/lib/createInitialUser";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await createInitialUser();

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen container flex flex-col mx-auto">
            <Header type="main" />
            <div className="flex-grow flex flex-col px-4 sm:px-6 lg:px-12 my-6 lg:my-12">
                {children}
            </div>
        </main>
    );
};

export default MainLayout;
