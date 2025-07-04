"use client";

import { useProducts } from "@/components/hooks/useProducts";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import apiService from "@/helper/apiService";
import { toast } from "react-toastify";
import { ProductForm } from "./ProductForm";
import Image from "next/image";
import { Product, ProductFormValues } from "@/types/product";

const Productpage = () => {
  const [activeCategory, setActiveCategory] = useState("food");
  const [openDialog, setOpenDialog] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data = [], refetch } = useProducts();

  const filteredItems = useMemo(() => {
    return data.filter((item) => item.category === activeCategory);
  }, [data, activeCategory]);

  const handleCreateProduct = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key === "imageUrl" && value instanceof File) {
          formData.append("imageUrl", value);
        } else {
          formData.append(key, value);
        }
      }

      await apiService.createProduct(formData);
      toast.success("Your product has been added successfully in the inventory!");
      refetch();
      setOpenDialog(false);
    } catch (error) {
      toast.error((error as Error)?.message || "Something went wrong.");
      console.error(error);
    }
  };

  const handleUpdateProduct = async (id: string, values: ProductFormValues) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key === "imageUrl" && value instanceof File) {
          formData.append("imageUrl", value);
        } else {
          formData.append(key, value);
        }
      }

      await apiService.updateProduct(id, formData);
      toast.success("Product updated successfully!");
      refetch();
      setEditProduct(null);
      setOpenDialog(false);
    } catch (error) {
      toast.error((error as Error)?.message || "Something went wrong.");
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await apiService.deleteProduct(productToDelete._id);
      toast.success("Product deleted successfully.");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    } finally {
      setProductToDelete(null);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const product = await apiService.getProductById(id);
      setEditProduct({
        ...product,
        price: Number(product.price),
      });
      setOpenDialog(true);
    } catch (error) {
      toast.error("Failed to load product for editing.");
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditProduct(null);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pb-32">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />

      <BackgroundBeamsWithCollision>
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8 relative z-10">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-1">
              <TabsTrigger value="food" className="px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black text-white/60 hover:text-white">Pizzas</TabsTrigger>
              <TabsTrigger value="drinks" className="px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black text-white/60 hover:text-white">Beverages</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={openDialog} onOpenChange={(state) => {
            setOpenDialog(state);
            if (!state) setEditProduct(null);
          }}>
            <DialogTrigger asChild>
              <button
                className="h-12 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition duration-200"
                onClick={() => {
                  setEditProduct(null);
                  setOpenDialog(true);
                }}
              >
                + Add Product
              </button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 text-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full">
              <DialogHeader className="mb-1">
                <DialogTitle className="text-2xl font-semibold">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogDescription className="text-white/50">
                  {editProduct ? "Update the product details below." : "Fill in the product details below."}
                </DialogDescription>
              </DialogHeader>

              <ProductForm
                activeCategory={activeCategory}
                initialValues={
                  editProduct
                    ? {
                      name: editProduct.name ?? "",
                      price: editProduct.price?.toString() ?? "",
                      description: editProduct.description ?? "",
                      category: editProduct.category ?? "",
                      rating: editProduct.rating?.toString() ?? "",
                      review: editProduct.review?.toString() ?? "",
                      imageUrl: editProduct.imageUrl ?? "",
                    }
                    : undefined
                }
                isEditMode={!!editProduct}
                onSubmit={async (values) => {
                  const formatted = {
                    ...values,
                    price: Number(values.price),
                    rating: Number(values.rating),
                    review: Number(values.review),
                    imageUrl: values.imageUrl ?? undefined,
                  };
                  if (editProduct) {
                    await handleUpdateProduct(editProduct._id, formatted);
                  } else {
                    await handleCreateProduct(formatted);
                  }
                }}
                closeDialog={handleDialogClose}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredItems.map((item) => (
            <div key={item._id} className="rounded-2xl p-4 backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg text-white flex flex-col justify-between">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-contain rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 text-6xl bg-white/5">🍕</div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-white/70 mt-1 text-sm">{item.description || "No description"}</p>
                <p className="mt-2 text-lg font-bold text-emerald-400">₹{item.price}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="cursor-pointer text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-400 flex items-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => setProductToDelete(item)}
                  className="cursor-pointer text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-red-400 flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
          <DialogContent className="bg-neutral-900 text-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-lg">Confirm Delete</DialogTitle>
              <DialogDescription className="text-white/60">
                Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="cursor-pointer text-sm px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="cursor-pointer text-sm px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Productpage;
