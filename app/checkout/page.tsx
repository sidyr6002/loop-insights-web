"use client";

import { stripePromise } from '@/lib/stripe';
import { useAuth } from '@clerk/clerk-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { createCheckoutSession } from '../actions/checkoutSession';
import { Loader2 } from 'lucide-react';

const CheckoutPage = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    const { getToken } = useAuth();
    const searchParams = useSearchParams();
    
    const priceId = searchParams.get('priceId');

    useEffect(() => {
        if (!priceId) {
            console.error("[CheckoutPage] Price ID or token is missing.");
            return;
        }

        const handleCheckout = async () => {
            try {
                const token = await getToken();

                if (!token) {
                    throw new Error("Token not found");
                }

                const { sessionId } = await createCheckoutSession({
                    priceId,
                    token
                });

                if (!sessionId) {
                    throw new Error("Session ID not found");
                }

                const stripe = await stripePromise;
    
                if (!stripe) {
                    throw new Error("Stripe not initialized");
                }
    
                await stripe.redirectToCheckout({ sessionId });
            } catch (error) {
                console.error("[handleSubscribe] Error: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        handleCheckout();
    }, [priceId]);


    return (
        <div className='h-svh w-full flex items-center justify-center'>
            <Loader2 strokeWidth={1.5} className="h-16 w-16 sm:h-24 sm:w-24 animate-spin text-neutral-700/40" />
        </div>
    )
}

export default CheckoutPage