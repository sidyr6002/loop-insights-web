// app/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // ShadCN UI Button Component
import { cn } from "@/lib/utils"; // Utility classnames function
import { Loader2 } from "lucide-react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

interface StripeSession {
    amount_total: number;
    subscription: string;
}

const SuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const session_id = searchParams.get("session_id");
    const [session, setSession] = useState<StripeSession | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session_id) {
            const fetchSessionDetails = async () => {
                try {
                    const response = await fetch(
                        `/api/verify-session?session_id=${session_id}`
                    );
                    const sessionData = await response.json();
                    setSession(sessionData);
                } catch (error) {
                    console.error("Error fetching session data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchSessionDetails();
        }
    }, [session_id]);

    if (loading) {
        return (
            <div className="text-center text-xl">
                <Loader2
                    strokeWidth={1}
                    className="animate-spin w-24 h-24 text-gray-400/70"
                />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center text-xl text-red-500">
                Failed to load session data.
            </div>
        );
    }

    return (
        <Card className="bg-white shadow-lg rounded-xl max-w-3xl w-full">
            <CardHeader className="text-center flex flex-col gap-2">
                <FaCheckCircle className="text-green-500 w-14 h-14 sm:w-16 sm:h-16 mx-auto" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-6">
                    Payment Successful!
                </h2>
                <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mt-2">
                    Thank you for your subscription! Your payment has been
                    successfully processed.
                </p>
            </CardHeader>

            <CardContent className="mt-4 sm:mt-8 space-y-6">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <p className="font-medium text-gray-700">Amount Paid:</p>
                    <p className="text-lg sm:text-xl text-gray-900">
                        ${(session.amount_total / 100).toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <p className="font-medium text-gray-700">
                        Subscription ID:
                    </p>
                    <p className="text-lg sm:text-xl text-gray-900 truncate">
                        {session.subscription}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="mt-12 text-center">
                <Button
                    onClick={() => router.push("/dashboard")}
                    className={cn("w-full", "text-white")}
                >
                    Go to Dashboard
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SuccessPage;
