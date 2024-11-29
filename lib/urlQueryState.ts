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

// ?page=1&size=10&sort=createdAt&order=desc&startDate=2024-11-12T18%3A30%3A00.000Z&endDate=2024-11-14T18%3A30%3A00.000Z

export const queryToTableState = (
    searchParams: URLSearchParams
): UrlQueryState => {
    const parsed = QueryString.parse(searchParams.toString());

    const queryState: UrlQueryState = {
        pagination: {
            pageIndex: Math.max(Number(parsed.page || 1) - 1, 0), 
            pageSize: Math.max(Number(parsed.size || 10), 1), 
        } as PaginationState,
        sorting: parsed.sort
            ? [
                  {
                      id: parsed.sort as string,
                      desc: parsed.order === "desc", // Sorting direction
                  },
              ]
            : DEFAULT_STATE.sorting,
        filters: [], // Start with an empty array for filters
    };

    // Check for `startDate` and `endDate` and build the filter for 'createdAt'
    const startDate = parsed.startDate
        ? new Date(parsed.startDate as string)
        : undefined;
    const endDate = parsed.endDate
        ? new Date(parsed.endDate as string)
        : undefined;

    // If either `startDate` or `endDate` exists, create the `createdAt` filter
    if (startDate || endDate) {
        queryState.filters.push({
            id: "createdAt", // Filter for 'createdAt'
            value: [startDate, endDate] as [Date?, Date?],
        });
    }

    Object.entries(parsed).forEach(([key, value]) => {
        if (
            !["page", "size", "sort", "order", "startDate", "endDate"].includes(
                key
            )
        ) {
            queryState.filters.push({ id: key, value });
        }
    });

    //console.log("[getQueryState] queryState: ", queryState);

    return queryState;
};

export const tableStateToQuery = (state: UrlQueryState) => {
    //console.log("[tableStateToQuery] state: ", state);
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
            if (filter.id === "createdAt") {
                //console.log("[tableStateToQuery] createdAt: ", filter.value);
                const [startDate, endDate] = filter.value as Date[];
                queryParams["startDate"] = startDate;
                queryParams["endDate"] = endDate;
            } else {
                queryParams[filter.id] = filter.value;
            }
            //console.log("[tableStateToQuery] filter: ", filter);
        }
    });

    //console.log("[tableStateToQuery] queryParams: ", queryParams);

    return QueryString.stringify(queryParams, {
        arrayFormat: "brackets",
        skipNulls: true,
        addQueryPrefix: true,
    });
};
