'use client';

import React from "react";
import { Button } from "../ui/button";
import { undoCancelSubscription } from "@/app/actions/subscriptionActions";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Redo2 } from "lucide-react";

interface UndoCancelSubscriptionProps {
    subscriptionId: string;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UndoCancelSubscription: React.FC<UndoCancelSubscriptionProps> = ({
    subscriptionId,
    setIsDialogOpen,
}) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);

    const handleUndoCancelSubscription = async () => {
        setLoading(true);
        try {
            const { success } = await undoCancelSubscription({
                subscriptionId,
            });

            if (!success) {
                toast({
                    variant: "destructive",
                    description: "Reactivation of subscription failed.",
                });
                throw new Error("Subscription undo cancel failed.");
            }

            toast({
                description: "Subscription is reactivated successfully.",
            });
            queryClient.invalidateQueries({
                queryKey: ["subscription", subscriptionId],
                exact: true,
            });

            setIsDialogOpen(false);
        } catch (error) {
            console.error("[handleUndoCancelSubscription] Error: ", error);

            toast({
                variant: "destructive",
                description: "Something went wrong, please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button
            className="rounded-full bg-blue-600 hover:bg-blue-600/90"
            onClick={handleUndoCancelSubscription}
            disabled={loading}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <span className="flex items-center gap-2">
                    <Redo2 className="h-4 w-4" />
                    Reactivate
                </span>
            )}
        </Button>
    );
};

export default UndoCancelSubscription;
