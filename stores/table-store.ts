import { create } from "zustand";
import type {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";

export const DEFAULT_STATE = {
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    } as PaginationState,
    sorting: [
        {
            id: "createdAt",
            desc: true,
        },
    ] as SortingState,
    filters: [] as ColumnFiltersState,
};

interface TableState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;

    setPagination: (pagination: PaginationState) => void;
    setSorting: (sorting: SortingState, resetPage?: boolean) => void;
    setFilters: (filters: ColumnFiltersState, resetPage?: boolean) => void;
    resetState: () => void;
}

export const useTableStore = create<TableState>()((set, get) => ({
    ...DEFAULT_STATE,

    setPagination: (pagination) => {
        const currentState = get();

        set({
            ...currentState,
            pagination: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
    },

    setSorting: (sorting, resetPage = true) => {
        const currentState = get();

        set({
            ...currentState,
            sorting,
            pagination: {
                ...currentState.pagination,
                pageIndex: resetPage ? 0 : currentState.pagination.pageIndex,
            },
        });
    },

    setFilters: (filters, resetPage = true) => {
        const currentState = get();

        set({
            ...currentState,
            filters,
            pagination: {
                ...currentState.pagination,
                pageIndex: resetPage ? 0 : currentState.pagination.pageIndex,
            },
        });
    },

    resetState: () => set({ ...DEFAULT_STATE }),
}));
