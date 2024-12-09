import Stripe from "stripe"; // Assuming you have this function defined in `utils`
import { handleSubscriptionCreate, handleSubscriptionDelete } from "@/app/actions/subscriptionActions";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
    return NextResponse.json({ message: "Hello, Next.js!" });
}

export async function POST(req: NextRequest) {
    const buf = await req.text();
    const signature =  req.headers.get("stripe-signature") as string;

    console.log("[POST /api/stripe-webhook] signature: ", signature);

    if (!signature) {
        return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    let event: Stripe.Event;
    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error("Missing Stripe Webhook Secret");
        }

        event = await stripe.webhooks.constructEventAsync(
            buf,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`Webhook Error: ${message}`);

        return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
                await handleSubscriptionCreate(event);
                break;
            case "customer.subscription.deleted":
                await handleSubscriptionDelete(event);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error(`Error handling event ${event.type}:`, error);
        return new NextResponse(`Error handling event ${event.type}`, {
            status: 500,
        });
    }

    return NextResponse.json({ received: true });
}
