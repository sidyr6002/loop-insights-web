import React from "react";
import { cn } from "@/lib/utils";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import SubscriptionButton from "@/components/subscription-button";

import { X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

if (!process.env.STRIPE_MONTHLY_PRICE_ID || !process.env.STRIPE_YEARLY_PRICE_ID) {
    throw new Error("Missing Stripe price IDs");
}

const plans = [
    {
        name: "Free",
        price: 0,
        period: "/year",
        description: "For small teams getting started",
        features: [
            { name: "Complete documentation", included: true },
            { name: "2GB Cloud storage", included: true },
            { name: "Unlimited projects", included: false },
            { name: "Support team full assist", included: false },
        ],
    },
    {
        name: "Monthy",
        price: 6.99,
        period: "/month",
        description: "For growing teams and organizations",
        priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
        features: [
            { name: "Complete documentation", included: true },
            { name: "5GB Cloud storage", included: true },
            { name: "Unlimited projects", included: true },
            { name: "Support team full assist", included: false },
        ],
    },
    {
        name: "Yearly",
        price: 39.99,
        period: "/year",
        description: "Upgrade to save more!",
        priceId: process.env.STRIPE_YEARLY_PRICE_ID,
        features: [
            { name: "Complete documentation", included: true },
            { name: "50GB Cloud storage", included: true },
            { name: "Unlimited projects", included: true },
            { name: "Support team full assist", included: true },
        ],
    },
];

const PricingSection = async({subscriptionPage = false}: {subscriptionPage?: boolean}) => {
    return (
        <section className={cn("my-36 space-y-16", subscriptionPage && "my-6")} id="pricing">
            <div className="text-center mb-16 space-y-6">
                <h3 className={cn("hidden", subscriptionPage && "block text-md lg:text-lg xl:text-xl font-semibold text-gray-700")}>You are on free plan, upgrade to get more features</h3>
                <h3 className={cn("text-md lg:text-lg xl:text-xl font-semibold text-gray-700", subscriptionPage && "hidden")}>
                    Pricing Plans
                </h3>
                <div className="flex flex-col items-center space-y-9">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                        Invest in a plan that&apos;s as ambitious as your corporate
                        goals.
                    </h2>
                    <p className="text-sm lg:text-md xl:text-lg max-w-3xl text-gray-600">
                        Compare the benefits and features of each plan below to
                        find the ideal match for your business&apos;s budget and
                        ambitions.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {plans.map((plan, index) => (
                    <Card
                        key={plan.name}
                        className="bg-gray-50 rounded-2xl overflow-hidden shadow-md shadow-neutral-400/40"
                    >
                        <CardHeader className="p-5 lg:p-6 relative">
                            <h3 className="text-mid lg:text-lg xl:text-xl font-semibold text-zinc-700">
                                {plan.name}
                            </h3>
                            <p className="text-xs md:text-sm text-zinc-500">
                                {plan.description}
                            </p>
                            <div className="flex items-baseline pt-2">
                                <span className="text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-900">
                                    ${plan.price}
                                </span>
                            </div>
                            <span className={cn("hidden text-xs md:text-sm px-3 py-1.5 rounded-bl-2xl text-zinc-100 absolute -top-2 -right-1 bg-blue-600", index === 1 && "block")}>Popular plan</span>
                        </CardHeader>

                        <CardContent className="p-5 lg:p-6 border-t border-neutral-200">
                            <ul className="space-y-4">
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center text-neutral-600"
                                    >
                                        {feature.included ? (
                                            <FaCheckCircle className="w-4 h-4 lg:w-5 lg:h-5 fill-blue-500 mr-3 flex-shrink-0" />
                                        ) : (
                                            <X className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300 mr-3 flex-shrink-0" />
                                        )}
                                        <span className="text-sm lg:text-md">{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="p-5 lg:p-6">
                            <SubscriptionButton priceId={plan.priceId} subscriptionPage={subscriptionPage}/>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
