"use client";

import React, { memo, useState } from "react";
import { AlignJustify, LogIn, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { Skeleton } from "../../ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UserAuthSection: React.FC<{
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
}> = memo(
    ({
        isLoaded,
        isSignedIn,
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

UserAuthSection.displayName = "UserAuthSection";

const HomeMobileHeader: React.FC = () => {
    const { isLoaded, isSignedIn } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="lg:hidden mx-2 mt-3 sm:mx-4 md:mx-6 px-4 sm:px-6 md:px-9 py-3 gap-4 flex items-center rounded-full bg-zinc-300/90 backdrop-blur-sm">
            <button className="p-0 m-0" onClick={toggleMenu}>
                <AlignJustify className="w-5 h-5 font-semibold" />
            </button>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-neutral-800">
                <Image src="/images/logo.png" width={48} height={24} alt="logo" onClick={() => window.location.href = "/"} />
            </div>
            {isMenuOpen && (
                <nav
                    className={cn(
                        "absolute top-0 left-0 w-full bg-zinc-200 h-svh px-4 pt-4 pb-8 flex flex-col items-start gap-6 transition-transform transform duration-300 opacity-100",
                        isMenuOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-[-100%] opacity-0"
                    )}
                >
                    <button
                        onClick={toggleMenu}
                        className="self-end text-xl text-neutral-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <Link href="#pricing" onClick={toggleMenu} className="hover:text-blue-700">Pricing</Link>
                    <Link href="#features" onClick={toggleMenu} className="hover:text-blue-700">Features</Link>
                    <Link href="#testimonials" onClick={toggleMenu} className="hover:text-blue-700">Testimonials</Link>
                    <div className="flex-grow" />
                    <UserAuthSection isLoaded={isLoaded} isSignedIn={isSignedIn} />
                </nav>
            )}
        </header>
    );
};

export default HomeMobileHeader;
