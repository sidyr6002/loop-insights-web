"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlignJustify, LogIn } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeMobileHeader from "./home-header-mobile";

// Custom hook for scroll handling with throttle
const useScrollPosition = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updatePosition = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", updatePosition, { passive: true });
        updatePosition(); // Check initial position

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return isScrolled;
};

const UserAuthSection = memo(
    ({
        isLoaded,
        isSignedIn,
    }: {
        isLoaded: boolean;
        isSignedIn: boolean | undefined;
    }) => {
        if (!isLoaded) {
            return <Skeleton className="w-8 h-8 rounded-full" />;
        }

        return isSignedIn ? (
            <UserButton
                appearance={{
                    elements: {
                        userButtonPopoverFooter: "hidden",
                    },
                }}
            />
        ) : (
            <SignInButton>
                <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full px-4 text-sm border-none bg-transparent font-semibold text-blue-700 hover:bg-blue-700 hover:text-zinc-50 transition duration-200 ease-out"
                >
                    Sign In <LogIn className="ml-2" />
                </Button>
            </SignInButton>
        );
    }
);

const MobileHeader = memo(() => (
    <div className="flex lg:hidden mx-2 mt-3 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-9 py-3 gap-4 rounded-full bg-zinc-300/90 backdrop-blur-sm relative">
        <AlignJustify className="w-6 h-6 font-semibold" />
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Loop Insights
        </h2>
    </div>
));

const HomeHeader: React.FC = () => {
    const { isLoaded, isSignedIn } = useSession();
    const isScrolled = useScrollPosition();
    const pathname = usePathname();

    const headerClasses = useMemo(
        () =>
            cn(
                "sticky top-0 z-50 transition-all duration-200",
                isScrolled ? "lg:mx-12 lg:translate-y-5" : "lg:translate-y-0"
            ),
        [isScrolled]
    );

    const containerClasses = useMemo(
        () =>
            cn(
                "hidden lg:block w-full px-2.5 bg-neutral-400/40 text-zinc-900 backdrop-blur-sm backdrop-saturate-200 lg:px-12 py-2.5 rounded-b-xl transition-all duration-200",
                isScrolled && "py-1 rounded-full"
            ),
        [isScrolled]
    );

    return (
        <header className={headerClasses}>
            <div className={containerClasses}>
                <div className="flex h-14 items-center justify-between">
                    <Image src="/images/logo.png" width={56} height={28} alt="logo" onClick={() => window.location.href = "/"} className="cursor-pointer" />
                    <div className="flex-grow">
                        <div className="px-6 py-2 text-base text-neutral-700 flex justify-center items-center gap-16">
                            <Link href="#pricing" className="hover:text-blue-700">Pricing</Link>
                            <Link href="#features" className="hover:text-blue-700">Features</Link>
                            <Link href="#testimonials" className="hover:text-blue-700">Testimonials</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <UserAuthSection
                            isLoaded={isLoaded}
                            isSignedIn={isSignedIn}
                        />
                    </div>
                </div>
            </div>
            <HomeMobileHeader />
        </header>
    );
};

export default memo(HomeHeader);
