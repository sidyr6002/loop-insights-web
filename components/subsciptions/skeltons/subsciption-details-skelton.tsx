import React from 'react'

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';


const SubscriptionDetailsSkelton = () => {
  return (
    <Card className="w-full mx-auto rounded-2xl shadow-lg border-gray-200">
    <CardHeader className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Skeleton className="h-6 w-1/3" /> {/* Title Skeleton */}
            <Skeleton className="h-6 w-1/4" /> {/* Badge Skeleton */}
        </div>
    </CardHeader>

    <CardContent className="space-y-6">
        <div className="grid gap-4">
            {/* First Row: Current Plan & Billing Period */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-4">
                    <Skeleton className="h-5 w-5 shrink-0" /> {/* Icon Skeleton */}
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-1/2" /> {/* Label Skeleton */}
                        <Skeleton className="h-4 w-3/4" /> {/* Value Skeleton */}
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <Skeleton className="h-5 w-5 shrink-0" /> {/* Icon Skeleton */}
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-1/2" /> {/* Label Skeleton */}
                        <Skeleton className="h-4 w-3/4" /> {/* Value Skeleton */}
                    </div>
                </div>
            </div>

            {/* Second Row: Next Billing */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-4">
                    <Skeleton className="h-5 w-5 shrink-0" /> {/* Icon Skeleton */}
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-1/2" /> {/* Label Skeleton */}
                        <Skeleton className="h-4 w-1/4" /> {/* Value Skeleton */}
                    </div>
                </div>
            </div>
        </div>

        {/* Conditional: Cancellation Details */}
        <div>
            <Separator className="my-4" />
            <div className="space-y-4">
                <div className="flex items-start space-x-4">
                    <Skeleton className="h-5 w-5 shrink-0" /> {/* Icon Skeleton */}
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-1/2" /> {/* Label Skeleton */}
                        <Skeleton className="h-4 w-3/4" /> {/* Value Skeleton */}
                    </div>
                </div>
            </div>
        </div>
    </CardContent>

    <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Skeleton className="h-10 w-full sm:w-32" /> {/* Button Skeleton */}
        <Skeleton className="h-10 w-full sm:w-40" /> {/* Button Skeleton */}
    </CardFooter>
</Card>

  )
}

export default SubscriptionDetailsSkelton