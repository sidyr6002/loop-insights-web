"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const Header = () => {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-10">
            <div className="w-full px-2.5 lg:px-12 py-2.5 bg-zinc-400/30 backdrop-blur-lg rounded-b-2xl">
                <div className="flex h-14 items-center justify-between">
                    <h1>Loop Insights</h1>
                    <div>
                        <SignedOut>
                            <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full px-4 text-sm border-none bg-transparent font-semibold text-blue-700 hover:bg-blue-700 hover:text-zinc-50 transition duration-200 ease-out"
                                onClick={() => router.push("/sign-in")}
                            >
                                Sign In{" "}
                                <span>
                                    <LogIn />
                                </span>
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={{
                                elements: {
                                    userButtonPopoverFooter: 'hidden'
                                },
                            }}/>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
