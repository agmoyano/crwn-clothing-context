import React, { createContext, useState, useEffect } from 'react';
import { filterItemFromCart, removeItemFromCart, addItemToCart, getItemsTotal, getItemsCount } from './cart.utils';

export const CartContext = createContext(null)

const CartProvider = ({children, store: [cartItems, setCartItems]}) => {
    if(!cartItems) setCartItems([])
    const [hidden, setHidden] = useState(true);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const clearItem = item => setCartItems(filterItemFromCart(cartItems, item));
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    useEffect(()=> {
        setTotal(getItemsTotal(cartItems))
        setCount(getItemsCount(cartItems))
    }, [cartItems])
    const toggleHidden = () => setHidden(!hidden);
    return (
        <CartContext.Provider value={{
            cartItems,
            hidden,
            total,
            count,
            clearItem,
            addItem,
            removeItem,
            toggleHidden
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;