"use cient";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { pauseSubscription } from '@/app/actions/subscriptionActions'
import { useRouter } from 'next/navigation'
import Stripe from 'stripe';
import { Pause, Play, UserRoundMinus } from 'lucide-react';
import CancelSubscription from './cancel-subscription';


interface ManageSubscriptionProps {
    subscriptionId: string,
    pauseCollectionData: Stripe.Subscription.PauseCollection | null
}
const ManageSubscription: React.FC<ManageSubscriptionProps> = ({subscriptionId, pauseCollectionData}) => {

    const router = useRouter();
    const [isCancelDialogOpen, setIsCancelDialogOpen] = React.useState(false);

    const handlePauseSubscription = async () => {
        try {
            const { success } = await pauseSubscription({subscriptionId, resumeAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});

            if (!success) {
                throw new Error("Subscription not found");
            }

        } catch (error) {
            console.error("[handlePauseSubscription] Error: ", error);
        } finally {
            router.refresh();
        }
    }

    const handleResumeSubscription = () => {
        console.log("Resume subscription");
    }

    const handleCancelSubscription = () => {
        console.log("Cancel subscription");   
    }


  return (
      <Dialog>
          <DialogTrigger className="w-full sm:w-auto">
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
                  <div className="flex items-center justify-between">
                    <div className='flex flex-col'>
                        <h3 className="font-medium">Pause/Resume your subscription</h3>
                        <p className='text-xs text-zinc-500'>If paused, it will resume in 7 days. (or) can be resumed at any time</p>
                    </div>
                      {pauseCollectionData ? (
                          <Button
                              className="rounded-full"
                              onClick={handleResumeSubscription}
                          >
                                <Play className="mr-1 h-4 w-4" />
                                Resume
                          </Button>
                      ) : (
                        <Button
                            className="rounded-full"
                            onClick={handlePauseSubscription}
                            >
                                <Pause className="mr-1 h-4 w-4" />
                                Pause
                        </Button>
                      )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Cancel your subscription</h3>
                      <p className='text-xs text-zinc-500'>You can cancel your subscription at any time.</p>
                    </div>
                    <CancelSubscription isCancelDialogOpen={isCancelDialogOpen} setIsCancelDialogOpen={setIsCancelDialogOpen}/>
                  </div>
              </div>
          </DialogContent>

      </Dialog>
  );
}

export default ManageSubscription