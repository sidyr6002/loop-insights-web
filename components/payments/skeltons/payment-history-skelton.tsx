import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";

const PaymentHistorySkelton = () => {
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
                            <TableCell className="p-3">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                            <TableCell className=" p-3">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                            <TableCell className=" p-3">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                            <TableCell className=" p-3">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                            <TableCell className=" p-3">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                            <TableCell className=" p-3 sr-only">
                                <Skeleton className="w-28 h-5" />
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(4)].map((_, index) => (
                            <TableRow
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <TableCell className="p-3 text-gray-700">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                                <TableCell className="p-3 text-gray-700">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                                <TableCell className="p-3 text-gray-700 flex justify-end">
                                    <Skeleton className="w-28 h-5" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default PaymentHistorySkelton;
