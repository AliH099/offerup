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
    images: { source: string; id: number }[];
    mainData: { title?: string; description?: string; price?: number };
    metaData: MetaData[];
    addToImages: (images: string) => void;
    removeFromImages: (id: number) => void;
    setMainData: (data: { title?: string; description?: string; price?: number }) => void;
    setMetaData: (metaData: MetaData[]) => void;
}

const useWizardStore = create<WizardState>()(
    devtools((set, get) => ({
        images: [],
        mainData: {},
        metaData: [],

        addToImages: (image) => {
            set({ images: [...get().images, { source: image, id: new Date().valueOf() }] });
        },

        removeFromImages: (id) => {
            set({ images: get().images.filter((image) => image.id !== id) });
        },
        setMainData: (data) => {
            set({ ...get().images, mainData: { ...get().mainData, ...data } });
        },
        setMetaData: (metaData) => {
            set({ ...get().images, ...get().mainData, metaData: metaData });
        },
    })),
);

export default useWizardStore;
