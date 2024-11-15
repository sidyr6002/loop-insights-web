"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";

interface SubscriptionButtonProps {
    priceId: string | undefined;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
    priceId
}) => {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const handleSubscribe = async () => {
        if (!priceId) {
            return router.push("/sign-up");
        }

        if (isSignedIn) {
            return router.push(`/checkout?priceId=${priceId}`);
        } else {
            localStorage.setItem("priceId", priceId);

            return router.push("/sign-up");
        }
    };

    return (
        <button
            className="w-full border-none py-2 px-4 text-sm lg:text-md bg-zinc-800 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSubscribe}
        >
            {priceId ? "Subscribe" : "Get Started"}
        </button>
    );
};

export default SubscriptionButton;
