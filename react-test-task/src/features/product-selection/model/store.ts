import { create } from 'zustand'

export interface ProductSelectionState {
    selectedColorId: number | null;
    selectedSizeId: number | null;

    actions: {
        selectColor: (id: number) => void;
        selectSize: (id: number) => void;
    };
}

export const useProductSelectionStore = create<ProductSelectionState>((set) => ({
    selectedColorId: null,
    selectedSizeId: null,
    actions: {
        selectColor: (id) => set({ selectedColorId: id, selectedSizeId: null }),
        selectSize: (id) => set({ selectedSizeId: id }),
    }
}))
