"use client";

import React from "react";
import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider
                afterSignOutUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/home`}
            >
                    {children}
                <Toaster />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ClerkProvider>
        </QueryClientProvider>
    );
};

export default Providers;
