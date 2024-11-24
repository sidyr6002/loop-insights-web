'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

import {
    extendSubscription
} from "@/app/actions/subscriptionActions";

import { Button } from "@/components/ui/button";

import { Clock, Loader2 } from "lucide-react";

interface FreeTrailSubscriptionProps {
    subscriptionId: string;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FreeTrailSubscription: React.FC<FreeTrailSubscriptionProps> = ({
    subscriptionId,
    setIsDialogOpen
}) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const handleExtendSubscription = async () => {
        setLoading(true);
        try {
            const { success } = await extendSubscription({
                subscriptionId
            });

            if (!success) {
                toast({
                    variant: "destructive",
                    description: "Subscription pause failed. Please try again.",
                });
                throw new Error("Subscription not found");
            }

            toast({
                description: "Subscription paused successfully.",
            });
            queryClient.invalidateQueries({
                queryKey: ["subscription", subscriptionId],
                exact: true,
            });

            setIsDialogOpen(false);
        } catch (error) {
            console.error("[handlePauseSubscription] Error: ", error);
        } finally {
            setLoading(false);
            router.refresh();
        }
    };

    return (
        <Button className="rounded-full" onClick={handleExtendSubscription}>
            {
                loading ? (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                    <span className="flex items-center gap-2">
                       <Clock className="mr-1 h-4 w-4" />
                       Extend 7 Days
                    </span>
                )
            }
        </Button>
    );
};

export default FreeTrailSubscription;
