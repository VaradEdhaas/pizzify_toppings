// MenuPage.tsx
"use client";

import { useState, useMemo } from "react";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { Star, Plus, Filter, Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/components/hooks/useProducts";
import { toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./hooks/useCart";
import { FloatingCartBar } from "./FloatingBarCart";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { DynamicBackgroundWrapper } from "./layout/DynamicBackgroundWrapper";
import { Skeleton } from "./ui/skeleton";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("food");
  const [searchQuery, setSearchQuery] = useState("");

  const { currentUser } = useAuth();
  const userId = currentUser?.user?._id ?? "";

  const { data = [], isLoading: productLoading } = useProducts();
  const { cart, isLoading: cartLoading, addToCart } = useCart(userId);

  const isLoading = productLoading || cartLoading;

  const filteredItems = useMemo(() => {
    return data.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, activeCategory, searchQuery]);

  const totalCartItems = cart?.products?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0;

  const handleAddToCart = (productId: string) => {
    if (!userId) return toast.error("You must be logged in to add items to the cart.");
    addToCart({ userId, productId, quantity: 1 });
  };

  const cartItems = (cart?.products || []).map((c) => ({
    id: c.productId._id,
    name: c.productId.name,
    imageUrl: c.productId.imageUrl,
    price: c.productId.price,
    quantity: c.quantity,
  }));

  const getTotalItems = () => cartItems.reduce((sum, p) => sum + p.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, p) => sum + p.quantity * p.price, 0);

  if (isLoading) {
    return (
      <DynamicBackgroundWrapper>
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm text-white/50 font-light">
                Our Menu
              </span>
            </div>
            <h1 className="text-6xl font-black text-white mb-8 tracking-tight">
              FUSION <br />
              <span className="text-white/30 font-extralight">FLAVORS</span>
            </h1>
            <p className="text-lg text-white/40 font-light max-w-2xl mx-auto">
              Discover our carefully crafted selection of Italian-Indian fusion pizzas and authentic beverages
            </p>
          </div>
        </section>

        <section className="pb-32 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[460px] bg-white/[0.01] border border-white/[0.06] rounded-2xl p-4 space-y-4">
                <Skeleton className="w-full h-48 rounded-xl bg-white/10" />
                <Skeleton className="w-3/4 h-6 bg-white/10" />
                <Skeleton className="w-1/3 h-5 bg-white/10" />
                <Skeleton className="w-full h-12 bg-white/10 mt-auto" />
              </div>
            ))}
          </div>
        </section>
      </DynamicBackgroundWrapper>
    );
  }


  return (
    <DynamicBackgroundWrapper>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-8">
              <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm text-white/50 font-light">
                Our Menu
              </span>
            </div>
            <h1 className="text-6xl font-black text-white mb-8 tracking-tight">
              FUSION <br />
              <span className="text-white/30 font-extralight">FLAVORS</span>
            </h1>
            <p className="text-lg text-white/40 font-light max-w-2xl mx-auto">
              Discover our carefully crafted selection of Italian-Indian fusion pizzas and authentic beverages
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-1">
                <TabsTrigger
                  value="food"
                  className="px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black text-white/60 hover:text-white"
                >
                  Pizzas
                </TabsTrigger>
                <TabsTrigger
                  value="drinks"
                  className="px-8 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black text-white/60 hover:text-white"
                >
                  Beverages
                </TabsTrigger>
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
              <Button isIconOnly variant="bordered" className="h-12 w-12 text-white border-white/[0.08]" radius="lg">
                <Filter className="h-4 w-4" />
              </Button>
              <Button isIconOnly variant="bordered" className="h-12 w-12 text-white border-white/[0.08]" radius="lg">
                <ShoppingCart className="h-4 w-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/[0.01] border border-white/[0.06] hover:border-white/[0.1] transition-all h-[460px] flex flex-col justify-between rounded-2xl">
                    <CardBody className="p-0 flex flex-col">
                      <div className="relative h-48 w-full rounded-t-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-6xl bg-white/5">
                            🍕
                          </div>
                        )}

                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="absolute top-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg text-white font-light">{item.name}</h3>
                          <div className="text-xl font-light text-green-400">₹{item.price}</div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="h-3 w-3 text-yellow-300 fill-current" />
                          <span className="text-yellow-300 text-sm font-light">{item?.rating ?? "4.2"}</span>
                          <span className="text-white/30 text-sm font-light">({item?.review ?? "124"} reviews)</span>
                        </div>
                        <div className="min-h-[48px] mb-6">
                          <p className="text-white/40 text-sm font-light line-clamp-2">{item.description}</p>
                        </div>

                        <Button
                          className="w-full h-12 bg-white text-black hover:bg-white/90 font-normal rounded-xl mt-auto cursor-pointer"
                          radius="lg"
                          startContent={<ShoppingCart className="h-4 w-4" />}
                          onPress={() => handleAddToCart(item._id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && !productLoading && (
            <div className="text-center text-white/60 py-16">No items found.</div>
          )}
        </div>
      </section>

      <div className="w-full">
        <AnimatePresence>
          <FloatingCartBar
            cartItems={cartItems}
            getTotalItems={getTotalItems}
            getTotalPrice={getTotalPrice}
          />
        </AnimatePresence>
      </div>
    </DynamicBackgroundWrapper>
  );
}