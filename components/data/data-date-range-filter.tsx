"use client"

import React, { useEffect } from 'react'
import { format } from "date-fns";
import { Column } from '@tanstack/react-table'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';

import { Calendar } from 'lucide-react';
import { useTableStore } from '@/providers/table-store-provider';

interface DataDateRangeFilterProps<TData, TValue> {
    column: Column<TData, TValue> | undefined
}


const DataDateRangeFilter = <TData, TValue>({column}: DataDateRangeFilterProps<TData, TValue>) => {
    const {filters} = useTableStore((state) => state);
    const [startDate, setStartDate] = React.useState<Date | undefined>();
    const [endDate, setEndDate] = React.useState<Date | undefined>();

    //console.log("[DataDateRangeFilter] column: ", column);

    useEffect(() => { 
            //console.log("[DataDateRangeFilter] filters: ", filters);
            const dateFilter = filters.find(filter => filter.id === "createdAt");
            if (dateFilter) {
                const [startDate, endDate] = dateFilter.value as Date[];
                setStartDate(startDate);
                setEndDate(endDate);
            }
    }, [filters]);

    if (!column) {
        return null;
    }

    const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
        if (type === 'start') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }

        if (date) {
            const currentFilter = column.getFilterValue() as [Date?, Date?] || [undefined, undefined];
            const newFilter = type === 'start' 
                ? [date, currentFilter[1]]
                : [currentFilter[0], date];
            
            column.setFilterValue(newFilter);
            //console.log("[DataDateRangeFilter] newFilter: ", newFilter);
        } else {
            const currentFilter = column.getFilterValue() as [Date?, Date?] || [undefined, undefined];
            const newFilter: [Date?, Date?] =
              type === "start"
                ? [undefined, currentFilter[1]]
                : [currentFilter[0], undefined];
      
            column.setFilterValue(newFilter); // Remove the filter value for deselected date
            //console.log("[DataDateRangeFilter] clearedFilter: ", newFilter);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-fit text-left text-xs sm:text-sm text-zinc-100 bg-neutral-600 hover:bg-neutral-300 font-normal">
                        {startDate ? format(startDate, 'PPP') : (
                            <span>Pick start date</span>
                        )}
                        <Calendar className="ml-auto h-3 w-3 sm:h-4 sm:w-4 opacity-80" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => handleDateChange('start', date)}
                        className='bg-neutral-300 text-zinc-800'
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-fit text-left text-xs sm:text-sm text-zinc-100 bg-neutral-600 hover:bg-neutral-300 font-normal">
                        {endDate ? format(endDate, 'PPP') : (
                            <span>Pick end date</span>
                        )}
                        <Calendar className="ml-auto h-3 w-3 sm:h-4 sm:w-4 opacity-80" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => handleDateChange('end', date)}
                        className='bg-neutral-300 text-zinc-800'
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default DataDateRangeFilter