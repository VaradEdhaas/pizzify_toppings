"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";

interface CartItem {
    id: string;
    name: string;
    imageUrl?: string;
    quantity: number;
    price: number;
}

interface FloatingCartBarProps {
    cartItems: CartItem[];
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export function FloatingCartBar({ cartItems, getTotalItems, getTotalPrice }: FloatingCartBarProps) {
    if (cartItems.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="floating-cart-bar"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
            >
                <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-4 shadow-2xl w-full max-w-7xl mx-auto">
                    <div className="flex items-center justify-between w-full gap-6">
                        {/* Overlapping product thumbnails */}
                        <div className="flex justify-center align-middle gap-4">
                            <div className="flex items-center -space-x-3 flex-shrink-0">
                                {cartItems.slice(0, 3).map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ scale: 0, x: 20 }}
                                        animate={{ scale: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-12 h-12 bg-white/[0.1] border-2 border-white/[0.2] rounded-full flex items-center justify-center backdrop-blur-xl overflow-hidden"
                                        style={{ zIndex: 10 - index }}
                                    >
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <span className="text-xl">🍕</span>
                                        )}
                                    </motion.div>
                                ))}

                                {cartItems.length > 3 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-12 h-12 bg-white/[0.15] border-2 border-white/[0.3] rounded-full flex items-center justify-center text-sm font-light text-white backdrop-blur-xl"
                                    >
                                        +{cartItems.length - 3}
                                    </motion.div>
                                )}
                            </div>

                            {/* Total items & price */}
                            <div className="text-white flex flex-col">
                                <span className="text-sm font-light">
                                    {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                                </span>
                                <span className="text-lg font-normal text-green-400">₹{getTotalPrice()}</span>
                            </div>
                        </div>

                        {/* Go to Cart Button */}
                        <Button
                            className="h-12 px-6 bg-white text-black hover:bg-white/90 font-normal transition-all duration-300 rounded-lg cursor-pointer"
                            radius="lg"
                            endContent={<ShoppingCart className="h-4 w-4" />}
                            onPress={() => (window.location.href = "/cart")}
                        >
                            Go to Cart
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
