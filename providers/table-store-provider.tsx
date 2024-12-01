'use client'

import { createTableStore, initialiseTableStore, TableStore } from "@/stores/table-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type tableStoreApi = ReturnType<typeof createTableStore>;

const TableStoreContext = createContext<tableStoreApi | undefined>(undefined);

export const TableStoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<tableStoreApi>();

    if (!storeRef.current) {
        storeRef.current = createTableStore(initialiseTableStore());
    }

    return (
        <TableStoreContext.Provider value={storeRef.current}>
            {children}
        </TableStoreContext.Provider>
    )
}

export const useTableStore = <T,> (
    selector: (store: TableStore) => T,
): T => {
    const tableStoreContext = useContext(TableStoreContext);

    if (!tableStoreContext) {
        throw new Error("useTableStore must be used within a <TableStoreProvider />");
    }

    return useStore(tableStoreContext, selector);
}