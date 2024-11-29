import { tableStateToQuery, UrlQueryState } from "@/lib/urlQueryState";

export const useTableUrlSync = (state: UrlQueryState) => {
    const urlUpdate = tableStateToQuery(state);

    // console.log("[useTableUrlSync] urlUpdate: ", urlUpdate);

    window.history.replaceState({}, "", urlUpdate);
};
