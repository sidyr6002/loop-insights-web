"use client";

import React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, UserRoundMinus } from "lucide-react";
import { cancelSubscription } from "@/app/actions/subscriptionActions";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CancelSubscriptionProps {
    subscriptionId: string;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelSubscription: React.FC<CancelSubscriptionProps> = ({
    subscriptionId,
    setIsDialogOpen,
}) => {
    const router = useRouter();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [isCancelDialogOpen, setIsCancelDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCancelSubscription = async () => {
        setIsLoading(true);
        try {
            const { success } = await cancelSubscription({ subscriptionId });

            if (!success) {
                toast({
                    variant: "destructive",
                    description: "Failed to cancel subscription",
                });
                throw new Error("Subscription not found");
            }

            toast({
                description: "Subscription cancelled successfully.",
            });
            setIsCancelDialogOpen(false);
            setIsDialogOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["subscription", subscriptionId],
                exact: true,
            });
        } catch (error) {
            console.error("[handleCancelSubscription] Error: ", error);
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    className="rounded-full bg-red-500 hover:bg-red-500/90"
                    onClick={() => setIsCancelDialogOpen(true)}
                >
                    <UserRoundMinus className="mr-1 h-4 w-4" />
                    Cancel
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:rounded-2xl">
                <DialogHeader className="py-4">
                    <DialogTitle className="text-xl sm:text-2xl">
                        Cancel Subscription
                    </DialogTitle>
                    <DialogDescription className="flex flex-col">
                        Are you sure you want to cancel your subscription? This
                        action cannot be undone.
                        <span className="mt-4 text-sm text-red-500 font-semibold">
                            Please note: You can only keep up to 5 projects. If
                            you choose to proceed with cancellation, any
                            additional projects beyond the top 5 will be deleted
                            automatically. Make sure to retain the ones you wish
                            to keep
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                            setIsCancelDialogOpen(false);
                            window.location.href = "/dashboard";
                        }}
                    >
                        Go to Dashboard
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleCancelSubscription}
                        disabled={isLoading}
                        className="rounded-full"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span className="flex items-center">
                                Cancel
                            </span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelSubscription;
