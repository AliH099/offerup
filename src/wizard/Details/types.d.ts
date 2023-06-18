export interface CategoriesForm {
    category: number;
}

export interface DetailsStepProps {
    categories: Categories[];
}

type Categories = {
    id: number;
    name: string;
    slug: string;
    updated_at: string;
    created_at: string;
};

export interface CategorySchema {
    fields: {
        en_label: string;
        fa_label: string;
        type: string;
        is_required: boolean;
    }[];
    conditions: string[];
}
