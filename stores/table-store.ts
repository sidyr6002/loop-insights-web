import { create } from "zustand";
import type {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { useTableUrlSync } from "@/hooks/useTableUrlSync";

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
        const updatedState = {
            ...currentState,
            pagination: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        }

        set(updatedState);
        useTableUrlSync({
            pagination: updatedState.pagination,
            sorting: updatedState.sorting,
            filters: updatedState.filters
        });
    },

    setSorting: (sorting, resetPage = true) => {
        const currentState = get();
        const updatedState = {
            ...currentState,
            sorting,
            pagination: {
                ...currentState.pagination,
                pageIndex: resetPage ? 0 : currentState.pagination.pageIndex,
            },
        }

        set(updatedState);
        useTableUrlSync({
            pagination: updatedState.pagination,
            sorting: updatedState.sorting,
            filters: updatedState.filters
        });
    },

    setFilters: (filters, resetPage = true) => {
        const currentState = get();
        const updatedState = {
            ...currentState,
            filters,
            pagination: {
                ...currentState.pagination,
                pageIndex: resetPage ? 0 : currentState.pagination.pageIndex,
            },
        }

        set(updatedState);
        useTableUrlSync({
            pagination: updatedState.pagination,
            sorting: updatedState.sorting,
            filters: updatedState.filters
        });
    },

    resetState: () => set({ ...DEFAULT_STATE }),
}));
