import { createContext, useReducer, useState } from "react";

export const foodappContext = createContext();

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        let cart = [...state];
        let index = cart.findIndex((item) => item.dishId === action.payload.dishId);
        cart[index] && (cart[index].quantity = (cart[index].quantity || 0) + 1)
        !cart[index] && cart.push({ ...action.payload, quantity: 1 })
        return cart

    } else if (action.type === 'DELETE') {
        let cart = state;
        let index = cart.findIndex((item) => item.dishId === action.payload.dishId);

        if (cart[index].quantity === 1) {
            cart.splice(index, 1)
        } else {
            cart[index].quantity = cart[index].quantity - 1;
        }

        return [...cart]
    }
}


export const FoodAppProvider = ({ children }) => {
    // const [cart, setCart] = useState([]);
    const [cart, cartDispatch] = useReducer(cartReducer, [])

    // Add to cart

    // Delete from cart

    return <foodappContext.Provider value={{
        cart,
        cartDispatch
    }}>
        {children}
    </foodappContext.Provider>
}