import { DEFAULT_STATE } from "@/stores/table-store";
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import QueryString from "qs";

export interface UrlQueryState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
}

export const queryToTableState = (
    searchParams: URLSearchParams
): UrlQueryState => {
    const parsed = QueryString.parse(searchParams.toString());

    console.log("[getQueryState] parsed: ", parsed);

    const queryState: UrlQueryState = {
        pagination: {
            pageIndex: Number(parsed.page || 1) - 1,
            pageSize: Number(parsed.size || 10),
        } as PaginationState,
        sorting: parsed.sort
            ? [
                  {
                      id: parsed.sort as string,
                      desc: parsed.order === "desc",
                  },
              ]
            : DEFAULT_STATE.sorting,
        filters: Object.entries(parsed).reduce((acc, [key, value]) => {
            if (!["page", "size", "sort", "order"].includes(key)) {
                acc.push({ id: key, value });
            }
            return acc;
        }, [] as ColumnFiltersState),
    };

    console.log("[getQueryState] queryState: ", queryState);

    return queryState;
};

export const tableStateToQuery = (state: UrlQueryState) => {
    const queryParams: Record<string, any> = {
        page: state.pagination.pageIndex + 1,
        size: state.pagination.pageSize,
    };

    if (state.sorting.length > 0) {
        queryParams.sort = state.sorting[0].id;
        queryParams.order = state.sorting[0].desc ? "desc" : "asc";
    }

    state.filters.forEach((filter) => {
        if (filter.value !== undefined && filter.value !== "") {
            queryParams[filter.id] = filter.value;
        }
    });

    return QueryString.stringify(queryParams, {
        arrayFormat: "brackets",
        skipNulls: true,
        addQueryPrefix: true,
    });
};
