"use client";

import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
    const router = useRouter()
    const { isSignedIn } = useAuth();

    console.log("[HomePage] isSignedIn: ", isSignedIn);

    useEffect(() => {
        const priceId = localStorage.getItem("priceId");

        console.log("[HomePage] priceId: ", priceId);

        if (priceId) {
            localStorage.removeItem("priceId");
            router.push(`/checkout?priceId=${priceId}`);
        }

        if (isSignedIn) {
            router.push("/dashboard");
        }
    }, [isSignedIn]);

    return router.push("/home");
}

export default HomePage;
