import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTableStore } from "@/stores/table-store";

export const useTableUrlSync = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { 
        pagination, 
        sorting, 
        filters, 
        setPagination, 
        setSorting, 
        setFilters 
    } = useTableStore();

    // Create a single synchronization effect
    useEffect(() => {
        // Parsing logic inside the effect to avoid multiple re-renders
        const params = Object.fromEntries(searchParams.entries());
        
        // Parse pagination
        const page = params.page ? parseInt(params.page, 10) - 1 : 0;
        const pageSize = params.size ? parseInt(params.size, 10) : 10;
        
        // Determine if we need to update pagination
        if (page !== pagination.pageIndex || pageSize !== pagination.pageSize) {
            setPagination({ 
                pageIndex: page, 
                pageSize 
            });
        }

        // Parse and set sorting
        const sortColumn = params.sort || 'createdAt';
        const sortOrder = params.order === 'desc' ? 'desc' : 'asc';
        const currentSort = sorting[0];
        
        if (
            currentSort.id !== sortColumn || 
            currentSort.desc !== (sortOrder === 'desc')
        ) {
            setSorting([{ 
                id: sortColumn, 
                desc: sortOrder === 'desc' 
            }], false);
        }

        // Parse and set filters
        const newFilters = Object.entries(params)
            .filter(([key]) => !['page', 'size', 'sort', 'order'].includes(key))
            .map(([id, value]) => ({ id, value }));

        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            setFilters(newFilters, false);
        }

        // Sync state back to URL if needed
        const queryParams = new URLSearchParams();
        
        // Add pagination
        if (page > 0) queryParams.set('page', (page + 1).toString());
        if (pageSize !== 10) queryParams.set('size', pageSize.toString());
        
        // Add sorting
        queryParams.set('sort', sorting[0].id);
        if (sorting[0].desc) queryParams.set('order', 'desc');
        
        // Add filters
        filters.forEach(filter => {
            if (filter.value) {
                queryParams.set(filter.id, filter.value.toString());
            }
        });

        // Only replace if query is different
        const newSearch = queryParams.toString() ? `?${queryParams.toString()}` : '';
        if (newSearch !== searchParams.toString()) {
            router.replace(`${pathname}${newSearch}`, { scroll: false });
        }
    }, [
        searchParams, 
        pagination, 
        sorting, 
        filters, 
        pathname, 
        router,
        setPagination,
        setSorting,
        setFilters
    ]);

    return null;
};