"use server"

import getCurrentUser from "@/lib/currentUser";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface GetPaymentHistoryProps {
    customerId: string;
    limit?: number;
}

export async function getPaymentHistory({ customerId, limit = 10 } : GetPaymentHistoryProps) {
    try {
        console.log("[getPaymentHistory] customerId: ", customerId);

        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }

        const invoices = await stripe.invoices.list({
            customer: customerId,
            limit
        })

        //console.log("[getPaymentHistory] invoices: ", invoices);

        return { invoices: invoices.data };

    } catch (error) {
        console.log("[getPaymentHistory] Error: ", error);

        return { invoices: null };
    }
}

export async function downloadInvoice({ invoiceId }: { invoiceId: string }) {
    try {
        console.log("[downloadInvoice] invoiceId: ", invoiceId);

        const user = await getCurrentUser();

        if (!user) {
            throw new Error("User not found or not logged in.");
        }
        
        if (!invoiceId) {
            throw new Error("Invoice ID not provided.");
        }

        const invoice = await stripe.invoices.retrieve(invoiceId)
        const invoicePdfUrl = invoice.invoice_pdf;

        if (!invoicePdfUrl) {
            throw new Error("Invoice PDF URL not available.");
        }

        const response = await fetch(invoicePdfUrl);

        if (!response.ok) {
            throw new Error("Failed to download invoice PDF.");
        }

        const buffer = await response.arrayBuffer();

        return {
            buffer,
            filename: `invoice-${invoiceId}.pdf`
        }

    } catch (error) {
        console.log("[downloadInvoice] Error: ", error);

        return { buffer: null, filename: null };
    }
}