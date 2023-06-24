import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type OrderData = {
    product: number;
    guarantee?: number;
};

export type MetaData = {
    en_label: string;
    fa_label: string;
    type: string;
    is_required: boolean;
    value: string;
};

export interface WizardState {
    images: { source: string; id: number; file: File }[];
    mainData: { title?: string; description?: string; category?: number };
    metadata: MetaData[];
    price?: number;
    postID?: number;
    addToImages: (images: string, file: File) => void;
    removeFromImages: (id: number) => void;
    setMainData: (data: { title?: string; description?: string; category?: number }) => void;
    setMetaData: (metaData: MetaData[]) => void;
    setPrice: (price: number) => void;
    setPostID: (id: number) => void;
}

const useWizardStore = create<WizardState>()(
    devtools((set, get) => ({
        images: [],
        mainData: {},
        metadata: [],
        addToImages: (image: string, file: File) => {
            set({
                images: [...get().images, { source: image, id: new Date().valueOf(), file: file }],
            });
        },

        removeFromImages: (id) => {
            set({ images: get().images.filter((image) => image.id !== id) });
        },
        setMainData: (data) => {
            set({ ...get(), mainData: { ...get().mainData, ...data } });
        },
        setMetaData: (metaData) => {
            set({ ...get(), metadata: metaData });
        },
        setPrice: (price) => {
            set({ ...get(), price: price });
        },
        setPostID(id) {
            set({ ...get(), postID: id });
        },
    })),
);

export default useWizardStore;
