"use client";

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { FaTimesCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CancelPage = () => {
    return (
        <Card className="bg-white shadow-lg rounded-xl max-w-4xl w-full">
            <CardHeader className="text-center space-y-4 sm:space-y-6">
                <FaTimesCircle className="text-red-500 w-14 h-14 sm:w-16 sm:h-16 mx-auto" />
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">
                    Payment Cancelled
                </h2>
                <p className="text-lg lg:text-xl text-gray-600">
                    Unfortunately, your payment was not completed. If this was a
                    mistake, please retry your payment or contact support.
                </p>
            </CardHeader>

            <CardContent className="mt-8 space-y-6">
                <div className="text-center">
                    <p className="text-base lg:text-lg font-semibold text-red-600">
                        Your subscription was not processed successfully. If you
                        need assistance, don't hesitate to reach out to our
                        support team.
                    </p>
                </div>
            </CardContent>

            <CardFooter className="mt-12 flex gap-6">
                <Button
                    onClick={() => (window.location.href = "/dashboard")} // Redirecting user to the dashboard
                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                    Go to Dashboard
                </Button>
                <Button
                    onClick={() => (window.location.href = "/pricing")} // Redirecting user to the pricing page to retry
                    className="w-full text-center bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                >
                    Retry Payment
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CancelPage;
