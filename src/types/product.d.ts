
export interface Product {
    _id: string;
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    rating?: number;
    review?: number;
    imageUrl?: string;
}

export interface ProductFormValues {
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    rating?: number;
    review?: number;
    imageUrl?: File | string;
}

