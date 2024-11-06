"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider afterSignOutUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/home`}>
                {children}
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ClerkProvider>
        </QueryClientProvider>
    );
};

export default Providers;
