export const dynamic = 'force-dynamic' 

import { getSubscription } from '@/app/actions/subscriptionActions'

import PricingSection from '@/components/lading-page/pricing';
import PaymentsServerComponent from '@/components/payments/payment-server-component';
import SubscriptionsServerComponent from '@/components/subsciptions/subscription-server-component';

const Subscriptions = async () => {
    const { subscription } = await getSubscription();

    if (!subscription) {
        return (
            <PricingSection subscriptionPage/>
        )
    }

    //console.log("[Subscriptions] subscription: ", subscription);

    return (
        <div className='w-full max-w-6xl flex-grow flex flex-col space-y-8 mx-auto sm:px-4'>
            <SubscriptionsServerComponent subscriptionId={subscription.stripeSubscriptionId} extendCount={subscription.extendCount} />
            <PaymentsServerComponent customerId={subscription.stripeCustomerId} />
        </div>
    )
}

export default Subscriptions