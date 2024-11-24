import { getStripeSubscriptionData } from "@/app/actions/subscriptionActions";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import Stripe from "stripe";
import SubscriptionDetails from "@/components/subsciptions/subscription-details";

interface SubscriptionServerComponentProps {
    subscriptionId: string;
    extendCount: number;
}

const SubscriptionsServerComponent: React.FC<
    SubscriptionServerComponentProps
> = ({ subscriptionId, extendCount }) => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery<Stripe.Subscription>({
        queryKey: ["subscription", subscriptionId],
        queryFn: async () => {
            const { subscription } = await getStripeSubscriptionData({
                subscriptionId,
            });

            if (!subscription) {
                throw new Error("Subscription not found");
            }

            return subscription;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SubscriptionDetails subscriptionId={subscriptionId} extendCount={extendCount} />
        </HydrationBoundary>
    );
};

export default SubscriptionsServerComponent;
