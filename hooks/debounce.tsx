import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

const useDebounce = (value: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    const debouncedSetter = useMemo(
        () =>
            debounce((newValue: string) => {
                setDebouncedValue(newValue);
            }, delay),
        [delay]
    );

    useEffect(() => {
        debouncedSetter(value);
        
        return () => {
            debouncedSetter.cancel();
        };
    }, [value, debouncedSetter]);

    return debouncedValue;
};

export default useDebounce;
