import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(
    req: NextRequest
) {
    const session_id = req.nextUrl.searchParams.get('session_id');

    console.log("[GET /api/verify-session] session_id: ", session_id);

    if (!session_id) {
        return new NextResponse(
            JSON.stringify({error: "Missing or invalid session ID"}),
            { status: 401 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(
            session_id as string
        );

        if (!session) {
            return new NextResponse(
                JSON.stringify({ error: "Session not found" }),
                { status: 404 }
            );
        }

        const sessionData = {
            amount_total: session.amount_total,
            subscription: session.subscription,
        };

        return new NextResponse(JSON.stringify(sessionData), { status: 200 });
    } catch (error) {
        console.error("Error retrieving session:", error);

        return new NextResponse(
            JSON.stringify({ error: "Error retrieving session" }),
            { status: 500 }
        )
    }
}
