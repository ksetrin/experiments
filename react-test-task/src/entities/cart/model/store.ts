import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: number;
    colorId: number;
    sizeId: number;
    quantity: number;
    price: number;
    name: string;
    colorName: string;
    sizeName: string;
    imageUrl: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: number, colorId: number, sizeId: number) => void;
    updateQuantity: (productId: number, colorId: number, sizeId: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (newItem) => set((state) => {
                const existingItemIndex = state.items.findIndex(
                    (item) =>
                        item.productId === newItem.productId &&
                        item.colorId === newItem.colorId &&
                        item.sizeId === newItem.sizeId
                );

                if (existingItemIndex > -1) {
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + 1
                    };
                    return { items: updatedItems };
                }

                return { items: [...state.items, { ...newItem, quantity: 1 }] };
            }),
            removeItem: (productId, colorId, sizeId) => set((state) => ({
                items: state.items.filter(
                    (item) =>
                        !(item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)
                ),
            })),
            updateQuantity: (productId, colorId, sizeId, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.productId === productId && item.colorId === colorId && item.sizeId === sizeId
                        ? { ...item, quantity: Math.max(1, quantity) }
                        : item
                ),
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
