import { Table } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/debounce";
import { useTableStore } from "@/stores/table-store";

interface DataEmailSearchProps<TData> {
    table: Table<TData>;
}

const DataEmailSearch = <TData,>({ table }: DataEmailSearchProps<TData>) => {
    const { filters } = useTableStore();
    const [emailSearch, setEmailSearch] = React.useState<string>("");

    const debouncedEmailFilter = useDebounce(emailSearch, 500);

    useEffect(() => {
        const userEmail = filters.find(filter => filter.id === "userEmail");
        if (userEmail) {
            setEmailSearch(userEmail.value as string);
        }
    }, [filters]);

    useEffect(() => {
        table.getColumn("userEmail")?.setFilterValue(debouncedEmailFilter);
    }, [debouncedEmailFilter, table]);

    return (
        <Input
            placeholder="Filter emails..."
            value={emailSearch}
            onChange={(event) => setEmailSearch(event.target.value)}
            className="w-full sm:max-w-sm bg-neutral-300 focus-visible:ring-offset-0 focus-visible:ring-0"
        />
    );
};

export default DataEmailSearch;
