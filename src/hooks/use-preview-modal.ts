import { create } from 'zustand';
import { ExtendedProduct } from '@/app/dashboard/products/components/Columns';

interface PreviewModalStore {
    isOpen: boolean;
    data?: ExtendedProduct;
    onOpen: (data: ExtendedProduct) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: ExtendedProduct) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;