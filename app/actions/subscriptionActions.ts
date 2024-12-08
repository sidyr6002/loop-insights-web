"use server";

import getCurrentUser from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Subscription } from "@prisma/client";
import { revalidatePath } from "next/cache";
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
		throw new Error("[handleSubscriptionCreate] Required data is missing. (Session ID, User ID or Subscription).");
	}

	logSession(session);

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		if (!existingUser) {
			throw new Error("[handleSubscriptionCreate] User is not authenticated.");
		}

		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

		const data: Omit<Subscription, "id" | "createdAt" | "updatedAt"> = {
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			userId: userId,
			extendCount: 0
		};

		await prisma.subscription.create({ data });
		console.log(`[handleSubscriptionCreate] Subscription ${subscription.id} created successfully.`);
	} catch (error) {
		console.error(`[handleSubscriptionCreate] Error creating subscription: ${error}`);
	} 
}

export async function handleSubscriptionDelete(event: Stripe.Event) {
	const session = event.data.object as Stripe.Checkout.Session;

	if (!session.id) {
		console.error("[handleSubscriptionDelete] Required data is missing. (Session ID).");
		return;
	}

	//console.log(`[handleSubscriptionDelete] session:`)

	try {
		const subscription = await stripe.subscriptions.retrieve(session.id as string);

		if (!subscription) {
			throw new Error("[handleSubscriptionDelete] Subscription not found.");
		}

		const existingSubscription = await prisma.subscription.findUnique({
			where: {
				stripeSubscriptionId: subscription.id
			}
		})

		if (!existingSubscription) {
			throw new Error("[handleSubscriptionDelete] Subscription not found.");
		}

		await prisma.subscription.delete({
			where: {
				id: existingSubscription.id
			}
		})

		console.log(`[handleSubscriptionDelete] Subscription ${subscription.id} deleted successfully.`);
		revalidatePath("/subscriptions");
		revalidatePath("/dashboard");
	} catch (error) {
		console.error(`[handleSubscriptionDelete] Error deleting subscription: ${error}`);
	}
}

export async function getStripeSubscriptionData ( { subscriptionId }: { subscriptionId: string } ) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        return { subscription: structuredClone(subscription) as Stripe.Subscription  };
    } catch (error) {
        console.error("[getStripeSubscriptionData] Error: ", error);

        return { subscription: null };
    }

}

export async function extendSubscription({ subscriptionId }: { subscriptionId: string }) {
	try {
		const user = await currentUser();

		if (!user) {
			throw new Error("User not authenticated.");
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: user.emailAddresses[0].emailAddress,
			},
			include: {
				subscription: true
			}
		})

		if (!existingUser) {
			throw new Error("User not found.");
		}

		if (!existingUser.subscription) {
			throw new Error("User has no active subscription.");
		}

		if (existingUser.subscription.stripeSubscriptionId !== subscriptionId) {
			throw new Error("Subscription ID does not match.");
		}

		if (existingUser.subscription.extendCount > 0) {
			throw new Error("Pause Subscription limit has been reached.");
		}

		const subscription = await stripe.subscriptions.retrieve(subscriptionId);

		if (!subscription) {
			throw new Error("Subscription fetch failed from Stripe.");
		}

		const currentPeriodEnd = subscription.current_period_end * 1000; // converting from seconds to milliseconds
		const newBillingDate = new Date(currentPeriodEnd);
		newBillingDate.setDate(newBillingDate.getDate() + 7);

		const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
			trial_end: newBillingDate.getTime() / 1000,
			proration_behavior: 'none'
		})

		await prisma.subscription.update({
			where: {
				stripeSubscriptionId: subscriptionId
			},
			data: {
				extendCount: {
					increment: 1
				}
			}
		})

		if (!subscription) {
			throw new Error("Subscription could not be paused.");
		}

		console.log("[pauseSubscription] updatedSubscription: ", updatedSubscription);

		return { success: true };
	} catch (error) {
		console.error("[pauseSubscription] Error: ", error);

		return { success: false };
	}
} 

export async function cancelSubscription({ subscriptionId }: { subscriptionId: string }) {
	try {
		const user = await currentUser();

		if (!user) {
			throw new Error("User not authenticated.");
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: user.emailAddresses[0].emailAddress,
			},
			include: {
				subscription: true
			}
		})

		if (!existingUser) {
			throw new Error("User not found.");
		}

		if (!existingUser.subscription) {
			throw new Error("User has no active subscription.");
		}

		if (existingUser.subscription.stripeSubscriptionId !== subscriptionId) {
			throw new Error("Subscription ID does not match.");
		}

		const subscription = await stripe.subscriptions.update(subscriptionId, {
			cancel_at_period_end: true
		})

		if (!subscription) {
			throw new Error("Subscription could not be cancelled.");
		}

		console.log("[cancelSubscription] subscription: ", subscription);

		return { success: true };
	} catch (error) {
		console.error("[cancelSubscription] Error: ", error);

		return { success: false };
	}
}

export async function undoCancelSubscription({ subscriptionId }: { subscriptionId: string }) {
	try {
		const user = await currentUser();

		if (!user) {
			throw new Error("User not authenticated.");
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: user.emailAddresses[0].emailAddress,
			},
			include: {
				subscription: true
			}
		})

		if (!existingUser) {
			throw new Error("User not found.");
		}

		if (!existingUser.subscription) {
			throw new Error("User has no active subscription.");
		}

		if (existingUser.subscription.stripeSubscriptionId !== subscriptionId) {
			throw new Error("Subscription ID does not match.");
		}

		const subscription = await stripe.subscriptions.retrieve(subscriptionId);
		
		const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
			cancel_at: null,
			items: [
				{
					id: subscription.items.data[0].id,
					price: subscription.items.data[0].price.id
				}
			]
		})

		if (!updatedSubscription) {
			throw new Error("Subscription could not be cancelled.");
		}

		//console.log("[undoCancelSubscription] subscription: ", updatedSubscription);

		return { success: true };

	} catch (error) {
		console.error("[undoCancelSubscription] Error: ", error);

		return { success: false };
	}
}

/// ----------------------------------------- DATABASE ACTIONS -----------------------------------------

export async function getSubscription() {
    try {
        const user = await currentUser();

		if (!user) {
			throw new Error("User not authenticated.");
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: user.emailAddresses[0].emailAddress,
			},
			include: {
				subscription: true
			}
		})

		if (!existingUser) {
			throw new Error("User not found.");
		}

        return { subscription: existingUser.subscription };
    } catch (error) {
        console.error("[getSubscription] Error: ", error);

        return  { subscription: null };
    }
}