import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type OrderData = {
    product: number;
    guarantee?: number;
};

export interface WizardState {
    images: { source: string; id: number }[];
    mainData: { title?: string; description?: string; price?: number };
    addToImages: (images: string) => void;
    removeFromImages: (id: number) => void;
    setMainData: (data: { title?: string; description?: string; price?: number }) => void;
}

const useWizardStore = create<WizardState>()(
    devtools((set, get) => ({
        images: [],
        mainData: {},
        addToImages: (image) => {
            set({ images: [...get().images, { source: image, id: new Date().valueOf() }] });
        },

        removeFromImages: (id) => {
            set({ images: get().images.filter((image) => image.id !== id) });
        },
        setMainData: (data) => {
            set({ ...get().images, mainData: { ...get().mainData, ...data } });
        },
    })),
);

export default useWizardStore;
