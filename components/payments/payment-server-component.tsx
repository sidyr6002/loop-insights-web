import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import Stripe from "stripe";
import { getPaymentHistory } from "@/app/actions/paymentActions";

import PaymentHistory from "@/components/payments/payment-history";

interface PaymentServerComponentProps {
    customerId: string;
}

const PaymentsServerComponent: React.FC<PaymentServerComponentProps> = ({
    customerId,
}) => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery<Stripe.Invoice[]>({
        queryKey: ["invoice", customerId],
        queryFn: async () => {
            const { invoices } = await getPaymentHistory({ customerId });

            if (!invoices) {
                throw new Error("Invoices not found");
            }

            return invoices;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PaymentHistory customerId={customerId} />
        </HydrationBoundary>
    );
};

export default PaymentsServerComponent;
