"use client";

import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const inputClassNames = {
    base: "w-full",
    mainWrapper: "h-full",
    input: [
        "bg-transparent",
        "text-white",
        "placeholder:text-neutral-500",
        "text-base",
        "font-light",
    ],
    inputWrapper: [
        "bg-white/[0.03]",
        "border-white/[0.1]",
        "hover:bg-white/[0.05]",
        "focus:outline-none",
        "focus-visible:outline-none",
        "!cursor-text",
        "h-10",
        "rounded-md",
        "border",
        "p-3",
    ],
};

export interface ProductFormValues {
    name: string;
    price: string;
    description: string;
    category: string;
    rating: string;
    review: string;
    imageUrl: File | string | null;
}

interface ProductFormProps {
    activeCategory: string;
    onSubmit: (values: ProductFormValues) => Promise<void>;
    closeDialog: () => void;
    initialValues?: ProductFormValues;
    isEditMode?: boolean;
}

export const ProductForm = ({
    activeCategory,
    onSubmit,
    closeDialog,
    initialValues,
    isEditMode = false,
}: ProductFormProps) => {
    const defaultValues: ProductFormValues = {
        name: "",
        price: "",
        description: "",
        category: activeCategory,
        rating: "",
        review: "",
        imageUrl: null,
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues || defaultValues}
            onSubmit={async (values) => {
                await onSubmit(values);
                closeDialog();
            }}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => (
                <Form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <Input
                                name="name"
                                placeholder="Product Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                classNames={inputClassNames}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium mb-2">Price</label>
                            <Input
                                name="price"
                                type="number"
                                placeholder="Price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                classNames={inputClassNames}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            <Input
                                name="rating"
                                type="number"
                                placeholder="Rating (0–5)"
                                value={values.rating}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                classNames={inputClassNames}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium mb-2">Review Count</label>
                            <Input
                                name="review"
                                type="number"
                                placeholder="Review count"
                                value={values.review}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                classNames={inputClassNames}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <Select
                                value={values.category}
                                onValueChange={(val) => setFieldValue("category", val)}
                            >
                                <SelectTrigger className="bg-neutral-800 border border-white/10 text-white rounded-xl px-3 py-2 w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 text-white border-white/10">
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="drinks">Drinks</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Input
                            name="description"
                            placeholder="Product description..."
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            classNames={inputClassNames}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="product-imageUrl" className="text-sm font-medium text-white">
                            Upload Product Image
                        </label>
                        {isEditMode && typeof initialValues?.imageUrl === "string" && (
                            <div className="mb-2">
                                <Image
                                    src={initialValues.imageUrl}
                                    alt="Current Product"
                                    width={128}
                                    height={128}
                                    className="rounded-md border border-white/10 object-contain"
                                />
                                <p className="text-xs text-white/50 mt-1">Current image preview</p>
                            </div>
                        )}
                        <div className="relative w-full">
                            <input
                                id="product-imageUrl"
                                type="file"
                                accept="image/*"
                                title="Upload product image"
                                onChange={(event) =>
                                    setFieldValue("imageUrl", event.currentTarget.files?.[0] || null)
                                }
                                className="peer block w-full text-sm text-white file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-white/10 file:text-white/80 hover:file:bg-white/20
                  bg-neutral-800 rounded-xl border border-white/10 px-4 py-2
                  cursor-pointer transition"
                            />
                            <p className="mt-1 text-xs text-white/50 peer-hover:text-white/70">
                                Only JPG, PNG or WEBP files under 5MB.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-end gap-2">
                        <Button
                            className="cursor-pointer"
                            type="reset"
                            variant="outline"
                            colorVariant="crimson"
                            radius="large"
                        >
                            Reset
                        </Button>
                        <Button
                            className="cursor-pointer"
                            type="submit"
                            variant="classic"
                            colorVariant="gray"
                            radius="large"
                        >
                            {isEditMode ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
