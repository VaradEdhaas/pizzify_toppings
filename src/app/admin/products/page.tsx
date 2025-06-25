"use client"

import { useProducts } from "@/components/hooks/useProducts"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Input } from "@/components/ui/input"
import { SparklesCore } from "@/components/ui/sparkles"
import { Spotlight } from "@/components/ui/spotlight"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Formik, Form } from "formik"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import apiService from "@/helper/apiService"
import { Button } from "@/components/ui/button"

const Productpage = () => {
  const [activeCategory, setActiveCategory] = useState("food")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const { data = [], refetch } = useProducts()


  const filteredItems = useMemo(() => {
    return data.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, activeCategory, searchQuery])

  const handleCreateProduct = async (values: any) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (key === "imageUrl" && value) {
        formData.append("imageUrl", value as File)
      } else {
        formData.append(key, value as string)
      }
    })
    await apiService.createProduct(formData)
    refetch()
    setOpenDialog(false)
  }

  const handleDelete = async (id: string) => {
    await apiService.deleteProduct(id)
    refetch()
  }

  const handleEdit = async (id: string) => {
    const product = await apiService.getProductById(id)
    console.log("Edit product:", product)
  }

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

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-12 pl-12 pr-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-white/40"
              />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <button className="h-12 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition duration-200">
                  + Add Product
                </button>
              </DialogTrigger>
              <DialogContent className="bg-neutral-900 text-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full">
                <DialogHeader className="mb-1">
                  <DialogTitle className="text-2xl font-semibold">Add New Product</DialogTitle>
                  <DialogDescription className="text-white/50">
                    Fill in the product details below.
                  </DialogDescription>
                </DialogHeader>
                <Formik
                  initialValues={{
                    name: "",
                    price: "",
                    description: "",
                    category: activeCategory,
                    rating: "",
                    review: "",
                    imageUrl: null,
                  }}
                  onSubmit={async (values) => {
                    await handleCreateProduct(values)
                    setOpenDialog(false)
                  }}
                >
                  {({ values, handleChange, setFieldValue, handleBlur }) => (
                    <Form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
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

                        <div>
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

                        <div>
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

                        <div>
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <Select
                          value={values.category}
                          onValueChange={(val) => setFieldValue("category", val)}
                        >
                          <SelectTrigger className="bg-neutral-800 border border-white/10 text-white rounded-xl px-3 py-2">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 text-white border-white/10">
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="drinks">Drinks</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <div className="relative w-full">
                          <input
                            id="product-imageUrl"
                            type="file"
                            accept="imageUrl/*"
                            title="Upload product imageUrl"
                            onChange={(event) =>
                              setFieldValue("imageUrl", event.currentTarget.files?.[0])
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
                      <DialogFooter className="mt-8 flex flex-col sm:flex-row justify-end gap-2">
                        <Button
                          type="reset"
                          variant="outline"
                          colorVariant="crimson"
                          radius="large"
                        >
                          Reset
                        </Button>

                        <Button
                          type="submit"
                          variant="classic"
                          colorVariant="gray"
                          radius="large"
                        >
                          Add Product
                        </Button>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredItems.map((item) => (
            <div key={item._id} className="rounded-2xl p-4 backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg text-white flex flex-col justify-between">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-contain" />
              ) : (
                <div className="flex items-center justify-center w-full h-48 text-6xl bg-white/5">🍕</div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-white/70 mt-1 text-sm">{item.description || "No description"}</p>
                <p className="mt-2 text-lg font-bold text-emerald-400">₹{item.price}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => handleEdit(item._id)} className="text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-400 flex items-center gap-1">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-red-400 flex items-center gap-1">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

const inputClassNames = {
  base: "w-full",
  mainWrapper: "h-full",
  input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
  inputWrapper: [
    "bg-white/[0.03]", "border-white/[0.1]", "hover:bg-white/[0.05]",
    "focus:outline-none", "focus-visible:outline-none",
    "!cursor-text", "h-14", "rounded-md", "border", "p-3"
  ],
}

export default Productpage