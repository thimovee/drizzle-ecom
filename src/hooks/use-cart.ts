import { create } from 'zustand';
import { toast } from 'sonner';
import { persist, createJSONStorage } from "zustand/middleware";
import { AlertTriangle } from 'lucide-react';
import { ExtendedProduct } from '@/app/dashboard/products/components/Columns';

interface CartStore {
    items: ExtendedProduct[];
    addItem: (data: ExtendedProduct) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: ExtendedProduct) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast('Item already in cart.');
            }

            set({ items: [...get().items, data] });
            toast.success('Item added to cart.');
        },
        removeItem: (id: number) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success('Item removed from cart.');
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;