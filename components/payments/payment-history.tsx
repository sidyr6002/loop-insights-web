"use client";

import React, { memo, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";

import Stripe from "stripe";
import { getPaymentHistory } from "@/app/actions/paymentActions";
import { useQuery } from "@tanstack/react-query";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PaymentHistorySkelton from "@/components/payments/skeltons/payment-history-skelton";

import dynamic from "next/dynamic";

const InvoiceDownloadButton = dynamic(() => import("@/components/payments/invoice-download-button"), {
    ssr: false,
});

import { formatAmount, formatDate } from "@/lib/utils";

interface PaymentHistoryProps {
    customerId: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
    customerId,
}: PaymentHistoryProps) => {
    const { getToken} = useAuth();

    const {
        data: invoicesData,
        isLoading,
        isError,
    } = useQuery<Stripe.Invoice[]>({
        queryKey: ["invoice", customerId],
        queryFn: async () => {
            const { invoices } = await getPaymentHistory({ customerId });

            if (!invoices) {
                throw new Error("Invoices not found");
            }

            return invoices;
        },
    });

    const handleInvoiceDownload = useCallback(async (invoiceId: string) => {
        try {
            const token = await getToken();
            const response = await fetch(`/api/download-invoice?invoiceId=${invoiceId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to download invoice.");
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `invoice-${invoiceId}.pdf`;
            link.click();
        } catch (error) {
            console.error("[handleInvoiceDownload] Error: ", error);
        }
    }, [getToken]);

    if (isLoading) {
        return <PaymentHistorySkelton />;
    }

    if (!invoicesData || isError) {
        return (
            <Card className="w-full bg-red-50 border border-red-200 shadow-md rounded-2xl">
                <CardHeader className="bg-red-200/40 backdrop-blur-2xl rounded-t-lg">
                    <CardTitle className="text-red-800 font-bold text-xl">
                        Something Went Wrong
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0.5 py-4 sm:px-6 sm:py-6">
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">
                            We encountered an issue while fetching your payment
                            history. Please try again later.
                        </p>
                        <Button
                            className="bg-red-600 text-white hover:bg-red-700 rounded-lg"
                        >
                            Retry
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white shadow-md rounded-2xl">
            <CardHeader className="bg-blue-300/20 backdrop-blur-2xl rounded-t-lg">
                <CardTitle className="text-neutral-800 font-bold text-xl">
                    Payment History
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0.5 py-4 sm:px-6 sm:py-6">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-blue-100">
                            <TableCell className="font-medium text-neutral-800 p-3">
                                Invoice ID
                            </TableCell>
                            <TableCell className="font-medium text-neutral-800 p-3">
                                Date
                            </TableCell>
                            <TableCell className="font-medium text-neutral-800 p-3">
                                Amount Due
                            </TableCell>
                            <TableCell className="font-medium text-neutral-800 p-3">
                                Amount Paid
                            </TableCell>
                            <TableCell className="font-medium text-neutral-800 p-3">
                                Status
                            </TableCell>
                            <TableCell className="font-medium text-neutral-800 p-3 sr-only">
                                Download
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoicesData.map((invoice) => (
                            <TableRow
                                key={invoice.id}
                                className="border-b border-gray-200"
                            >
                                <TableCell className="p-3 text-gray-700">
                                    {invoice.id}
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    {formatDate(invoice.period_start)}
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    {formatAmount(
                                        invoice.amount_due,
                                        invoice.currency
                                    )}
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    {formatAmount(
                                        invoice.amount_paid,
                                        invoice.currency
                                    )}
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    {invoice.status}
                                </TableCell>
                                <TableCell className="p-3 text-gray-700 flex justify-end">
                                    <InvoiceDownloadButton 
                                        invoiceId={invoice.id} 
                                        onDownload={handleInvoiceDownload} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default memo(PaymentHistory);
