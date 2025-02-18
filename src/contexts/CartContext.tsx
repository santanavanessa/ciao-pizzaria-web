import { ReactNode, createContext, useEffect, useState } from "react";
import { Product } from "../../pages/Home/components/ProductCard";
import { produce } from "immer";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartQuantity: number;
    cartItemsTotal: number;
    addProductToCart: (product: CartItem) => void;
    changeCartItemQuantity: (
        cartItemId: number, 
        type: 'increase' | 'decrease',
    ) => void;
    removeCartItem: (cartItemId: number) => void;
    cleanCart: () => void;
}

interface CartContextProviderProps {
    children: ReactNode;
}

const PRODUCT_ITEMS_STORAGE_KEY = "productdelivery:cartItems";

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = localStorage.getItem(PRODUCT_ITEMS_STORAGE_KEY);
        if (storedCartItems) {
            return JSON.parse(storedCartItems);
        }
        return [];
    });

    const cartQuantity = cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0);

    const cartItemsTotal = cartItems.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    function addProductToCart(product: CartItem) {
        const productAlreadyExistsInCart = cartItems.findIndex(
            (cartItem) => cartItem.id === product.id
        );

        const newCart = produce(cartItems, (draft) => {
            if (productAlreadyExistsInCart < 0) {
                draft.push(product);
            } else {
                draft[productAlreadyExistsInCart].quantity += product.quantity;
            }
        });

        setCartItems(newCart);
    }

    function changeCartItemQuantity(
        cartItemId: number,
        type: 'increase' | 'decrease'
    ) {
        const newCart = produce(cartItems, (draft) => {
            const productExistsInCart = cartItems.findIndex(
                (cartItem) => cartItem.id === cartItemId
            );

            if (productExistsInCart >= 0) {
                const item = draft[productExistsInCart];
                draft[productExistsInCart].quantity =
                    type === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
            }
        });
        setCartItems(newCart);
    }

    function removeCartItem(cartItemId: number) {
        const newCart = produce(cartItems, (draft) => {
            const productExistsInCart = cartItems.findIndex(
                (cartItem) => cartItem.id === cartItemId
            );
            if (productExistsInCart >= 0) {
                draft.splice(productExistsInCart, 1);
            }
        });
        setCartItems(newCart);
    }

    function cleanCart() {
        setCartItems([]);
    }

    useEffect(() => {
        localStorage.setItem(PRODUCT_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addProductToCart,
                cartQuantity,
                cartItemsTotal,
                changeCartItemQuantity,
                removeCartItem,
                cleanCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
