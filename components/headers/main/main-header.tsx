"use client";

import React, { memo } from "react";
import { UserButton, useSession } from "@clerk/nextjs";
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MainMobileHeader from "./main-header-mobile";
import Image from "next/image";

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
    const pathname = usePathname();
    const { isLoaded } = useSession();

    return (
        <header className="sticky top-0 z-50 lg:mx-9 lg:translate-y-5 transition-all duration-300">
            <div className="hidden lg:block px-2.5 lg:px-9 py-0.5 rounded-full bg-neutral-400/40 text-zinc-900 backdrop-blur-sm backdrop-saturate-200">
                <div className="flex h-14 items-center justify-between">
                    <Image src="/images/logo.png" width={56} height={28} alt="logo" onClick={() => window.location.href = "/"} className="cursor-pointer"/>
                    <div className="flex-grow">
                        <div className="px-6 py-2 text-base text-neutral-700 flex justify-center items-center gap-16">
                            <Link href="/dashboard" className={cn("hover:text-blue-700", pathname.includes("dashboard") && "text-blue-700")}>Dashboard</Link>
                            <Link href="/subscriptions" className={cn("hover:text-blue-700", pathname.includes("subscription") && "text-blue-700")}>Subscription</Link>
                        </div>
                    </div>
                    <UserAuthSection isLoaded={isLoaded} />
                </div>
            </div>

            <MainMobileHeader />
        </header>
    );
};

export default memo(MainHeader);
