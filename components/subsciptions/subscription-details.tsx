"use client";

import React, { memo, useMemo } from "react";
import Stripe from "stripe";
import { useQuery } from "@tanstack/react-query";
import { formatAmount, formatDate } from "@/lib/utils";
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
import SubscriptionDetailsSkelton from "@/components/subsciptions/skeltons/subsciption-details-skelton";
import ManageSubscription from "@/components/subsciptions/manage-subscription";

import {
    Clock,
    AlertCircle,
    CheckCircle2,
    Calendar,
    DollarSign,
    RefreshCcw,
    AlertTriangle,
    Pause,
} from "lucide-react";

type StatusConfig = {
    icon: React.ComponentType; 
    className: string;
    text?: string;  
};

// Move status configuration logic out of render
const STATUS_CONFIGS: Record<string, StatusConfig> = {
    active: {
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        text: "Active",
    },
    canceled: {
        icon: AlertCircle,
        className: "bg-red-50 text-red-700 border-red-200",
        text: "Canceled",
    },
    draft: {
        icon: AlertTriangle,
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        text: "Past Due",
    },
    default: {
        icon: Clock,
        className: "bg-gray-50 text-gray-700 border-gray-200",
    }
};

const pauseCollectionTypes = [
    "void",
    "keep_as_draft",
    "mark_uncollectible"
]

const getStatusConfig = (status: string, pauseCollection?: Stripe.Subscription.PauseCollection | null) => {
    if (pauseCollection && pauseCollectionTypes.includes(pauseCollection.behavior)) {
        return {
            icon: Pause,
            className: "bg-blue-50 text-blue-700 border-blue-200",
            text: pauseCollection.resumes_at 
                ? `Paused (Resuming ${formatDate(pauseCollection.resumes_at)})` 
                : "Paused",
        };
    }

    const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.default;
    return {
        ...config, 
        text: config.text || status.charAt(0).toUpperCase() + status.slice(1)
    };
};

const SubscriptionDetails: React.FC<{ subscriptionId: string, extendCount: number }> = ({ subscriptionId, extendCount }) => {
    const { 
        data: subscriptionData, 
        isLoading, 
        isError 
    } = useQuery<Stripe.Subscription>({
        queryKey: ["subscription", subscriptionId],
        queryFn: async () => {
            const { subscription } = await getStripeSubscriptionData({ subscriptionId });
            if (!subscription) throw new Error("Subscription not found");
            return subscription;
        },
        staleTime: 1000 * 60 * 5 // 5 minute cache
    });

    // Memoize derived values to prevent unnecessary re-computations
    const subscriptionDetails = useMemo(() => {
        if (!subscriptionData) return null;

        const currentPeriod = subscriptionData.current_period_end * 1000;
        const daysRemaining = Math.ceil((currentPeriod - Date.now()) / (1000 * 60 * 60 * 24));
        const statusConfig = getStatusConfig(subscriptionData.status, subscriptionData.pause_collection);

        return {
            statusConfig,
            StatusIcon: statusConfig.icon,
            daysRemaining,
            planAmount: formatAmount(
                subscriptionData.items.data[0].price.unit_amount || 0, 
                subscriptionData.currency
            ),
            interval: subscriptionData.items.data[0].price.recurring?.interval
        };
    }, [subscriptionData]);

    if (isLoading) return <SubscriptionDetailsSkelton />;

    if (!subscriptionData || isError) {
        return (
            <Card className="w-full mx-auto rounded-2xl shadow-lg">
                <CardContent className="p-8 text-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">
                        Unable to load subscription details
                    </p>
                    <p className="text-sm text-gray-500">
                        Please try again later or contact support
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full mx-auto rounded-2xl shadow-lg border-gray-200">
            <CardHeader className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl font-semibold">
                        Subscription Details
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={`px-3 py-1 ${subscriptionDetails?.statusConfig.className} flex items-center gap-1.5 w-fit`}
                    >
                        {subscriptionDetails?.StatusIcon && <subscriptionDetails.StatusIcon size={14} />}
                        {subscriptionDetails?.statusConfig.text}
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
                                    {subscriptionDetails?.planAmount}
                                    <span className="text-gray-400">
                                        /{subscriptionDetails?.interval}
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
                                    {formatDate(subscriptionData.current_period_start)} - {formatDate(subscriptionData.current_period_end)}
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
                                    {subscriptionDetails?.daysRemaining} days remaining
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {(subscriptionData.cancel_at_period_end || subscriptionData.canceled_at) && (
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
                                            Your subscription will end on {formatDate(subscriptionData.current_period_end)}
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
                    className="w-full sm:w-auto rounded-3xl"
                    onClick={() => window.location.href = "/support"}
                >
                    Contact Support
                </Button>
                <ManageSubscription 
                    subscriptionId={subscriptionId} 
                    scheduledCancellation={subscriptionData.cancel_at_period_end}
                    extendCount={extendCount}
                />
            </CardFooter>
        </Card>
    );
};

export default memo(SubscriptionDetails);