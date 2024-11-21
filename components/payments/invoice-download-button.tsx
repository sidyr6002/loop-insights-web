import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Loader2 } from "lucide-react";
import { memo, useCallback, useState } from "react";

const InvoiceDownloadButton = ({
    invoiceId,
    onDownload,
}: {
    invoiceId: string;
    onDownload: (invoiceId: string) => Promise<void>;
}) => {
    const [downloading, setDownloading] = useState(false);

    const handleClick = useCallback(async () => {
        setDownloading(true);
        try {
            await onDownload(invoiceId);
        } finally {
            setDownloading(false);
        }
    }, [invoiceId, onDownload]);

    return (
        <Button
            size="sm"
            variant="outline"
            className="bg-blue-600 text-zinc-50 hover:bg-blue-600/90 hover:text-zinc-50 rounded-3xl"
            disabled={downloading}
            onClick={handleClick}
        >
            {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <span className="flex items-center gap-1">
                    <ArrowDownToLine size={16} /> Download
                </span>
            )}
        </Button>
    );
};

export default memo(InvoiceDownloadButton);
