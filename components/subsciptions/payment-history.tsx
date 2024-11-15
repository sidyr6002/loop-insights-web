"use client";

import { downloadInvoice, getPaymentHistory } from "@/app/actions/paymentActions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Stripe from "stripe";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { formatAmount, formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowDownToLine, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

interface PaymentHistoryProps {
    customerId: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
    customerId,
}: PaymentHistoryProps) => {
    const { getToken} = useAuth();
    const [downloadingInvoice, setDownloadingInvoice] = React.useState(false);

    const {
        data: invoicesData,
        isLoading,
        isError,
    } = useQuery<Stripe.Invoice[] | null>({
        queryKey: ["invoice", customerId],
        queryFn: async () => {
            const { invoices } = await getPaymentHistory({ customerId });
            //console.log("[PaymentHistory] invoices: ", invoices);

            return invoices;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!invoicesData || isError) {
        return <div>Error</div>;
    }

    const handleInvoiceDownload = async (invoiceId: string) => {
        setDownloadingInvoice(true);
        try {
            const token = await getToken();
            
            const responce = await fetch(`/api/download-invoice?invoiceId=${invoiceId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!responce.ok) {
                throw new Error("Failed to download invoice.");
            }

            const blob = await responce.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `invoice-${invoiceId}.pdf`;
            link.click();
        } catch (error) {
            console.error("[handleInvoiceDownload] Error: ", error);
        } finally {
            setDownloadingInvoice(false);
        }
    };

    return (
        <Card className="w-full bg-white shadow-md rounded-xl">
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
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-blue-600 text-zinc-50 hover:bg-blue-600/90 hover:text-zinc-50 rounded-3xl"
                                        disabled={downloadingInvoice}
                                        onClick={() =>
                                            handleInvoiceDownload(invoice.id)
                                        }
                                    >
                                        {downloadingInvoice ? (
                                            <span>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <ArrowDownToLine size={16} />{" "}
                                                Download
                                            </span>
                                        )}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default PaymentHistory;
