import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// improved on https://blog.logrocket.com/using-localstorage-react-hooks/

export function getStorageValue<T>(key: string, defaultValue: T): T {
    // getting stored value
    const saved = localStorage.getItem(key);
    if (saved === null) {
        return defaultValue;
    }
    const initial = JSON.parse(saved) as T;
    return initial;
}

export const useLocalStorage = <S>(key: string, initialState: S): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, initialState);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
