"use client";

import React, { useEffect } from "react";
import { getStripeSubscriptionData } from "@/app/actions/subscriptionActions";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Clock,
    CreditCard,
    AlertCircle,
    CheckCircle2,
    Calendar,
    DollarSign,
    RefreshCcw,
    AlertTriangle,
} from "lucide-react";

import Stripe from "stripe";
import { useQuery } from "@tanstack/react-query";
import { formatAmount, formatDate } from "@/lib/utils";

const getStatusConfig = (status: string) => {
	switch (status) {
		case "active":
			return {
				icon: CheckCircle2,
				className:
					"bg-emerald-50 text-emerald-700 border-emerald-200",
				text: "Active",
			};
		case "canceled":
			return {
				icon: AlertCircle,
				className: "bg-red-50 text-red-700 border-red-200",
				text: "Canceled",
			};
		case "past_due":
			return {
				icon: AlertTriangle,
				className: "bg-yellow-50 text-yellow-700 border-yellow-200",
				text: "Past Due",
			};
		default:
			return {
				icon: Clock,
				className: "bg-gray-50 text-gray-700 border-gray-200",
				text: status.charAt(0).toUpperCase() + status.slice(1),
			};
	}
  };

interface SubscriptionDetailsProps {
    subscriptionId: string;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
    subscriptionId,
}) => {
    const { data: subscriptionData, isLoading, isError } = useQuery<Stripe.Subscription | null>({
		queryKey: ["subscription", subscriptionId],
		queryFn: async () => {
			const { subscription } = await getStripeSubscriptionData({ subscriptionId });
			if (!subscription) {
				throw new Error("Subscription not found");
			}
			return subscription;
		},
	});

    if (isLoading) {
        return (
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardContent className="p-8">
                    <div className="animate-pulse flex flex-col space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!subscriptionData || isError) {
        return (
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardContent className="p-8">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        <p className="text-lg font-medium">
                            Unable to load subscription details
                        </p>
                        <p className="text-sm text-gray-500">
                            Please try again later or contact support
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const statusConfig = getStatusConfig(subscriptionData.status);
    const StatusIcon = statusConfig.icon;
    const currentPeriod = subscriptionData.current_period_end * 1000;
    const daysRemaining = Math.ceil(
        (currentPeriod - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Card className="w-full mx-auto rounded-2xl shadow-lg border-gray-200">
            <CardHeader className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl font-semibold">
                        Subscription Details
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={`px-3 py-1 ${statusConfig.className} flex items-center gap-1.5 w-fit`}
                    >
                        <StatusIcon size={14} />
                        {statusConfig.text}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-4">
                            <DollarSign className="h-5 w-5 shrink-0 text-gray-500 mt-1" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-gray-900">
                                    Current Plan
                                </p>
                                <p className="text-sm flex gap-1.5 text-gray-500">
                                    {formatAmount(
                                        subscriptionData.items.data[0].price.unit_amount || 0,
										subscriptionData.currency
                                    )}
                                    <span className="text-gray-400">
                                        /{ subscriptionData.items.data[0].price.recurring?.interval }
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Calendar className="h-5 w-5 shrink-0 text-gray-500 mt-1" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-gray-900">
                                    Billing Period
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatDate(
                                        subscriptionData.current_period_start
                                    )}{" "}
                                    -{" "}
                                    {formatDate(
                                        subscriptionData.current_period_end
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-4">
                            <RefreshCcw className="h-5 w-5 shrink-0 text-gray-500 mt-1" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-gray-900">
                                    Next Billing
                                </p>
                                <p className="text-sm text-gray-500">
                                    {daysRemaining} days remaining
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {(subscriptionData.cancel_at_period_end ||
                    subscriptionData.canceled_at) && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            {subscriptionData.cancel_at_period_end && (
                                <div className="flex items-start space-x-4">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-1" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-gray-900">
                                            Scheduled Cancellation
                                        </p>
                                        <p className="text-sm text-red-500">
                                            Your subscription will end on{" "}
                                            {formatDate(
                                                subscriptionData.current_period_end
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => (window.location.href = "/support")}
                >
                    Contact Support
                </Button>
                <Button
                    className="w-full sm:w-auto"
                    onClick={() => (window.location.href = "/billing")}
                >
                    Manage Subscription
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SubscriptionDetails;
