import { DEFAULT_STATE } from "@/stores/table-store";
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from "@tanstack/react-table";
import QueryString from "qs";

interface QueryState {
    pagination: PaginationState;
    sorting: SortingState;
    filters: ColumnFiltersState;
}

export const parseQueryState = (searchParams: URLSearchParams): QueryState => {
    const parsed = QueryString.parse(searchParams.toString());

    const queryState = {
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

    //console.log("[parseQueryState] queryState: ", queryState);


    return queryState
};
