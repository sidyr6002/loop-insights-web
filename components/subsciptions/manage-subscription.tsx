"use cient";

import React, { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const CancelSubscription = dynamic(() => import("@/components/subsciptions/cancel-subscription"), {
    ssr: false
})
const FreeTrailSubscription = dynamic(() => import("@/components/subsciptions/free-trail-subscription"), {
    ssr: false
})
const UndoCancelSubscription = dynamic(() => import("@/components/subsciptions/undo-cancel-subscription"), {
    ssr: false
})

interface ManageSubscriptionProps {
    subscriptionId: string;
    scheduledCancellation: boolean;
    extendCount: number
}
const ManageSubscription: React.FC<ManageSubscriptionProps> = ({
    subscriptionId,
    scheduledCancellation,
    extendCount
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //console.log("[ManageSubscription] pauseCollection: ", pauseCollection);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="w-full sm:w-auto" asChild>
                <Button className="w-full rounded-3xl">
                    Manage Subscription
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:rounded-2xl">
                <DialogHeader className="py-4">
                    <DialogTitle className="text-xl sm:text-2xl">
                        Manage your subscription
                    </DialogTitle>
                    <DialogDescription>
                        You can manage your subscription here.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col gap-4">
                    {scheduledCancellation ? (
                        <>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        Undo cancellation
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        Your subscription is set to be{" "}
                                        <span className="text-red-500">
                                            cancelled
                                        </span>
                                        . You can still{" "}
                                        <span className="text-green-500">
                                            uncancel
                                        </span>{" "}
                                        it.
                                    </p>
                                </div>
                                <UndoCancelSubscription
                                    subscriptionId={subscriptionId}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={cn(
                                    "flex items-center justify-between gap-1",
                                    extendCount > 0 && "hidden"
                                )}
                            >
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        Use the free trial
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        You can enjoy a free trial for 7 days
                                    </p>
                                </div>
                                <FreeTrailSubscription
                                    subscriptionId={subscriptionId}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        Cancel your subscription
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        You can cancel your subscription at any
                                        time.
                                    </p>
                                </div>
                                <CancelSubscription
                                    subscriptionId={subscriptionId}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ManageSubscription;
