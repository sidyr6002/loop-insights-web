"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

interface SubscriptionButtonProps {
    priceId: string | undefined;
    subscriptionPage?: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
    priceId,
    subscriptionPage
}) => {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const [isLoading, setIsLoading] = React.useState(false);

    //console.log("[SubscriptionButton] priceId: ", priceId, "subscriptionPage: ", subscriptionPage);
    
    const handleSubscribe = React.useCallback(async () => {
        if (!priceId) {
            return router.push("/sign-up");
        }

        setIsLoading(true);

        try {
            if (isSignedIn) {
                router.push(`/checkout?priceId=${priceId}`);
            } else {
                localStorage.setItem("priceId", priceId);
                router.push("/sign-up");
            }
        } catch (error) {
            console.error("Error setting priceId:", error);
        } finally {
            setIsLoading(false);
        }
    }, [priceId, isSignedIn, router]);

    const subscriptionTitle = subscriptionPage ? "You are on free plan" : "Get Started";
    const buttonTitle = priceId ? "Subscribe" : subscriptionTitle;

    return (
        <button
            className="w-full border-none py-2 px-4 text-sm lg:text-md bg-zinc-800 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSubscribe}
            disabled={isLoading || priceId === undefined && subscriptionPage}
        >
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : buttonTitle}
        </button>
    );
};

export default SubscriptionButton;
