import React, { useState } from 'react';

const WithLocalStorage = (WrappedProvider, key) => {
    let storedData = null;
    key = key || WrappedProvider.name;
    key = 'react_with_local_storage_'+key;
    try {
        storedData = JSON.parse(localStorage.getItem(key))
    } catch(error) {}

    return ({children, ...props}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [data, setData] = useState(storedData)
        const storeData = (data) => {
            setData(data);
            localStorage.setItem(key, JSON.stringify(data))
        }
        return (
            <WrappedProvider {...props} store={[data, storeData]}>{children}</WrappedProvider>
        )
    }
}

export default WithLocalStorage;