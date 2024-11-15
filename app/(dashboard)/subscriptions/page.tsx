import { getSubscription } from '@/app/actions/subscriptionActions'
import PaymentHistory from '@/components/subsciptions/payment-history';
import SubscriptionDetails from '@/components/subsciptions/subscription-details';
import React from 'react'

const Subscriptions = async () => {
    const { subscription } = await getSubscription();

    if (!subscription) {
        return (
            <div className='w-full max-w-6xl flex-grow flex flex-col space-y-8 mx-auto sm:px-4'>
                <h1 className='text-3xl font-bold'>No subscription found.</h1>
            </div>
        )
    }

    // console.log("[Subscriptions] subscription: ", subscription);

    return (
        <div className='w-full max-w-6xl flex-grow flex flex-col space-y-8 mx-auto sm:px-4'>
            <SubscriptionDetails subscriptionId={subscription.stripeSubscriptionId} />
            <PaymentHistory customerId={subscription.stripeCustomerId} />
        </div>
    )
}

export default Subscriptions