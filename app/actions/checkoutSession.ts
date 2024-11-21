"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface CheckoutSessionProps {
    priceId: string
    token: string
}

export async function createCheckoutSession({ priceId, token }: CheckoutSessionProps) {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("User not authenticated");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        })

        if (!existingUser) {
            throw new Error("User not found");
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card", "link", "amazon_pay"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            metadata: { userId: existingUser.id },
        });

        //console.log("[createCheckoutSession] session: ", session);

        return {
            sessionId: session.id
        }
    } catch (error) {
        console.error("[createCheckoutSession] Error: ", error);

        return {
            sessionId: null
        }
    }
}