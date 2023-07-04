export type PostDetail = {
    id: number;
    category: string;
    user: string;
    chat_id: string;
    title: string;
    description: string;
    price: number;
    slug: string;
    metadata: {
        en_label: string;
        fa_label: string;
        type: string;
        is_required: boolean;
        value: string;
    }[];
    post_images: string[];
    updated_at: string;
};
