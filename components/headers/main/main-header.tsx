"use client";

import React, { memo } from "react";
import { UserButton, useSession } from "@clerk/nextjs";
import { Skeleton } from "../../ui/skeleton";
import { AlignJustify } from "lucide-react";

const UserAuthSection = memo(({ isLoaded }: { isLoaded: boolean }) => {
    return (
        <div className="flex items-center">
            {!isLoaded ? (
                <Skeleton className="w-8 h-8 rounded-full" />
            ) : (
                <UserButton
                    appearance={{
                        elements: {
                            userButtonPopoverFooter: "hidden",
                            userButtonAvatarBox: "w-8 h-8 rounded-full",
                        },
                    }}
                />
            )}
        </div>
    );
});

const MainHeader: React.FC = () => {
    const { isLoaded } = useSession();

    const headerClasses =
        "sticky top-0 z-50 lg:mx-9 lg:translate-y-5 transition-all duration-300";
    const containerClasses =
        "hidden lg:block w-full px-2.5 lg:px-9 py-0.5 rounded-full bg-neutral-400/40 text-zinc-900 backdrop-blur-sm backdrop-saturate-200";

    return (
        <header className={headerClasses}>
            <div className={containerClasses}>
                <div className="flex h-14 items-center justify-between">
                    <h1 className="text-lg font-bold text-neutral-800 flex items-center">
                        L<span>oo</span>p Insights
                    </h1>
                    <UserAuthSection isLoaded={isLoaded} />
                </div>
            </div>
            <div className="flex lg:hidden mx-2 mt-3 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-9 py-3 gap-4 rounded-full bg-zinc-300/90 backdrop-blur-sm relative">
                <AlignJustify className="w-6 h-6 font-semibold" />
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Loop Insights
                </h2>
            </div>
        </header>
    );
};

export default memo(MainHeader);
