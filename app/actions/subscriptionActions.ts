"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Subscription } from "@prisma/client";
import { Stripe } from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("Missing Stripe secret key");
}

const logSession = (session: Stripe.Checkout.Session) => {
	console.log(`[handleSubscriptionCreate] session:`, {
		id: session.id,
		subscription: session.subscription,
		userId: session.metadata?.userId
	});
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function handleSubscriptionCreate(event: Stripe.Event) {
	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session.metadata?.userId;
    
	if (!session.id || !userId || !session.subscription) {
		console.error("[handleSubscriptionCreate] Required data is missing. (Session ID, User ID or Subscription).");
		return;
	}

	logSession(session);

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		if (!existingUser) {
			console.error("[handleSubscriptionCreate] User is not authenticated.");
			return;
		}

		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

		const data: Omit<Subscription, "id" | "createdAt" | "updatedAt"> = {
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			userId: userId
		};

		await prisma.subscription.create({ data });
		console.log(`[handleSubscriptionCreate] Subscription ${subscription.id} created successfully.`);
	} catch (error) {
		console.error(`[handleSubscriptionCreate] Error creating subscription: ${error}`);
	} 
}

export async function getStripeSubscriptionData ( { subscriptionId }: { subscriptionId: string } ) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        console.log("[getStripeSubscriptionData] subscriptionId: ", subscriptionId);

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const plainSubscription = JSON.parse(JSON.stringify(subscription)) as Stripe.Subscription;

        return { subscription: plainSubscription };
    } catch (error) {
        console.error("[getStripeSubscriptionData] Error: ", error);

        return { subscription: null };
    }

}

/// ----------------------------------------- DATABASE ACTIONS -----------------------------------------

export async function getSubscription() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId: user.id,
            },
        });

        return { subscription: subscriptions[0] };
    } catch (error) {
        console.error("[getSubscription] Error: ", error);

        return  { subscription: null };
    }
}