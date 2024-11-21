"use client";

import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UserRoundMinus } from 'lucide-react'

interface CancelSubscriptionProps {
    isCancelDialogOpen: boolean;
    setIsCancelDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelSubscription: React.FC<CancelSubscriptionProps> = ({isCancelDialogOpen, setIsCancelDialogOpen}) => {
    const handleCancelSubscription = () => {
        console.log("Cancel subscription");
    }
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
                    <DialogHeader className='py-4'>
                        <DialogTitle className="text-xl sm:text-2xl">Cancel Subscription</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel your subscription? 
                            This action cannot be undone.
                            <div className='mt-4 text-sm text-red-500 font-semibold'>
                                Please note: You can only keep up to 5 projects. If you choose to proceed with cancellation, any additional projects beyond the top 5 will be deleted automatically. Make sure to retain the ones you wish to keep
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className='rounded-full' onClick={() => {
                                setIsCancelDialogOpen(false)
                                window.location.href = "/dashboard"
                            }}>Go to Dashboard</Button>
                        </DialogClose>
                        <Button 
                            variant="destructive" 
                            onClick={handleCancelSubscription}
                            // disabled={isLoading}
                            className='rounded-full'
                        >
                            Confirm Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
  )
}

export default CancelSubscription