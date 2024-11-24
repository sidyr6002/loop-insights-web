import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table";


// Default states
export const DEFAULT_STATE = {
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    sorting: [
        {
            id: "createdAt",
            desc: true,
        },
    ] as SortingState,
    filters: [] as ColumnFiltersState,
    columnVisibility: {} as VisibilityState,
    preferredPageSize: 10,
};

interface TableState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
    preferredPageSize: number;

    setPagination: (pagination: PaginationState) => void;
    setSorting: (sorting: SortingState) => void;
    setFilters: (filters: ColumnFiltersState) => void;
    setPreferredPageSize: (size: number) => void;
    resetState: () => void;
}

// Zustand store for table state
export const useTableStore = create<TableState>()(
    persist(
        (set, get) => ({
            ...DEFAULT_STATE,
            setPagination: (pagination) => {
                console.log("[setPagination] pagination: ", pagination);
                const currentState = get();
                set({
                    ...currentState,
                    pagination: {
                        pageIndex: pagination.pageIndex,
                        pageSize: pagination.pageSize
                    }
                });
            },
            setSorting: (sorting) => {
                const currentState = get();
                set({
                    ...currentState,
                    sorting,
                    pagination: {
                        ...currentState.pagination,
                        pageIndex: 0,
                    },
                });
            },
            setFilters: (filters) => {
                const currentState = get();
                set({
                    ...currentState,
                    filters,
                    pagination: {
                        ...currentState.pagination,
                        pageIndex: 0,
                    },
                });
            },
            setPreferredPageSize: (preferredPageSize) => {
                const currentState = get();
                set({
                    ...currentState,
                    preferredPageSize,
                    pagination: { 
                        pageIndex: 0, 
                        pageSize: preferredPageSize 
                    },
                });
            },
            resetState: () => set(DEFAULT_STATE),
        }),
        {
            name: "table-state-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                pagination: state.pagination,
                sorting: state.sorting,
                filters: state.filters,
                preferredPageSize: state.preferredPageSize,
            }),
        }
    )
);
