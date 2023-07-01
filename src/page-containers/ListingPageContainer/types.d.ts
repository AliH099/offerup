export interface MyPostInterface {
    slug: string;
    title: string;
    price: number;
    updated_at: string;
    post_images: { id: number; url: string; is_thumbnail: boolean }[];
}
