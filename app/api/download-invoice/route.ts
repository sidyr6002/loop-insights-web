import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const invoiceId = url.searchParams.get("invoiceId");

    if (!invoiceId) {
        return new NextResponse(
            JSON.stringify({ error: "Invoice ID is required" }),
            {
                status: 400,
            }
        );
    }

    try {
        // Retrieve the invoice from Stripe
        const invoice = await stripe.invoices.retrieve(invoiceId);

        // Check if the invoice PDF URL is available
        const invoicePdfUrl = invoice.invoice_pdf;

        if (!invoicePdfUrl) {
            return new NextResponse(
                JSON.stringify({ error: "Invoice PDF not available" }),
                { status: 404 }
            );
        }

        // Fetch the PDF content
        const response = await fetch(invoicePdfUrl);

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Failed to download invoice" }),
                { status: 500 }
            );
        }

        const buffer = await response.arrayBuffer();

        return new Response(buffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="invoice-${invoiceId}.pdf"`,
            },
        });
    } catch (error) {
        console.error("Error retrieving invoice:", error);
        
        return new Response(
            JSON.stringify({ error: "Failed to retrieve invoice" }),
            { status: 500 }
        );
    }
}
