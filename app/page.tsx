"use client";

import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
    const router = useRouter()
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;

        const priceId = localStorage.getItem("priceId");

        console.log("[HomePage] priceId: ", priceId);

        if (priceId) {
            localStorage.removeItem("priceId");
            router.push(`/checkout?priceId=${priceId}`);
        }

        console.log("[HomePage] isSignedIn: ", isSignedIn);

        if (isSignedIn) {
            router.push("/dashboard");
        } else {
            router.push("/home");
        }
    }, [isSignedIn, isLoaded, router]);

    return null;
}

export default HomePage;
