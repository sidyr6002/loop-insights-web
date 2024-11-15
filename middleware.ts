import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/home(.*)",
    "/api/feedback(.*)",
    "/api/stripe-webhook(.*)",
    "/",
]);

export default clerkMiddleware(async (auth, req) => {
    const res = NextResponse.next();

    // Add CORS headers to the response (applied to all requests)
    res.headers.set("Access-Control-Allow-Origin", "*");  // Adjust to your domain if necessary
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // If the request method is OPTIONS, respond with a 200 OK to handle preflight requests
    if (req.method === "OPTIONS") {
        return res;
    }

    if (!isPublicRoute(req)) {
        await auth.protect();
    }

    return res;
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
