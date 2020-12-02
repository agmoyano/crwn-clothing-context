import React, { useEffect, useState } from 'react';

const WithLocalStorage = (WrappedProvider, key) => {
    let storedData = null;
    key = key || WrappedProvider.name;
    key = 'react_with_local_storage_'+key;
    try {
        storedData = JSON.parse(localStorage.getItem(key))
    } catch(error) {}

    return ({children, ...props}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [data, setData] = useState(storedData);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(data))
        }, [data])
        return (
            <WrappedProvider {...props} store={[data, setData]}>{children}</WrappedProvider>
        )
    }
}

export default WithLocalStorage;