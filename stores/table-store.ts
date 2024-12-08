import { create, createStore } from "zustand";
import type {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import { useTableUrlSync } from "@/hooks/useTableUrlSync";

interface TableState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
}

interface TableActions {
    setPagination: (pagination: PaginationState) => void;
    setSorting: (sorting: SortingState, resetPage?: boolean) => void;
    setFilters: (filters: ColumnFiltersState, resetPage?: boolean) => void;
}

export interface TableStore extends TableState, TableActions {}

export const DEFAULT_STATE: TableState = {
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

export const initialiseTableStore = () : TableState => {
    const firstData = {
        pagination: DEFAULT_STATE.pagination,
        sorting: DEFAULT_STATE.sorting,
        filters: DEFAULT_STATE.filters
    }

    //useTableUrlSync(firstData)
    return firstData
}

export const createTableStore = (initialState: TableState = DEFAULT_STATE) => {
    return createStore<TableStore>()((set, get) => ({
        ...initialState,
    
        setPagination: (pagination) => {
            //console.log("[setPagination] pagination: ", pagination);
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
    }));
} 
