"use client";
import { stripePromise } from '@/lib/stripe';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react'
import { createCheckoutSession } from '../actions/checkoutSession';
import { Loader2 } from 'lucide-react';

// Define a Loading Spinner Fallback Component
const LoadingSpinner = () => (
    <div className="h-screen w-full flex items-center justify-center">
        <Loader2 strokeWidth={1.5} className="h-16 w-16 sm:h-24 sm:w-24 animate-spin text-neutral-700/40" />
    </div>
);

// Async function for the checkout process (use inside Suspense boundary)
const CheckoutHandler = ({ priceId }: { priceId: string }) => {
    useEffect(() => {
        if (!priceId) {
            console.error("[CheckoutPage] Price ID or token is missing.");
            return;
        }
        
        const handleCheckout = async () => {
            try {
                const { sessionId } = await createCheckoutSession({
                    priceId
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
            }
        };
        
        handleCheckout();
    }, [priceId]);
    
    return null; // We don't need to return anything from this component
};

// Wrapper component to handle search params
const CheckoutPageContent = () => {
    const searchParams = useSearchParams();
    const priceId = searchParams.get('priceId');
    
    return priceId ? <CheckoutHandler priceId={priceId} /> : <LoadingSpinner />;
};

// Main page component
const CheckoutPage = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CheckoutPageContent />
        </Suspense>
    );
};

export default CheckoutPage;