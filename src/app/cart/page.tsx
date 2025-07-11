"use client";

import { useEffect, useState, useRef } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { useCart } from "@/components/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewritter-effect";
import { useRouter } from "next/navigation";
import apiService from "@/helper/apiService";
import { toast } from "react-toastify";
import Link from "next/link";
import { DynamicBackgroundWrapper } from "@/components/layout/DynamicBackgroundWrapper";
import { Skeleton } from "@/components/ui/skeleton";
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CartPage() {
    const { currentUser } = useAuth();
    const userId = typeof window !== "undefined" ? currentUser?.user?._id : null;

    const { cart, isLoading, incrementQuantity, decrementQuantity, removeFromCart, clearCartMutation } = useCart(userId || "");
    const [hydrated, setHydrated] = useState(false);
    const cartRef = useRef(null);
    const router = useRouter();

    useEffect(() => setHydrated(true), []);

    useEffect(() => {
        if (hydrated && cartRef.current) {
            gsap.fromTo(
                cartRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, [hydrated, cart]);

    const incrementQty = (item: any) => {
        if (!userId) return;
        incrementQuantity(item.productId._id);
    };

    const decrementQty = (item: any) => {
        if (!userId) return;
        decrementQuantity(item.productId._id);
    };

    const getTotalPrice = () =>
        (cart?.products || []).reduce(
            (acc, item) => acc + item.quantity * (item?.productId?.price || 0),
            0
        );

    const handleCheckout = async () => {
        try {
            if (!userId) {
                router.push("/login");
                return;
            }

            const totalAmount = getTotalPrice();
            const orderResponse = await apiService.createRazorpayOrder(totalAmount);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderResponse.order.amount.toString(),
                currency: "INR",
                name: "Pizzify",
                description: "Premium Pizza Experience",
                image: "/logo.png",
                order_id: orderResponse.order.id,
                handler: async function (response: any) {
                    try {
                        const verification = await apiService.verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verification.success) {
                            const formattedProducts = (cart?.products || []).map((item: any) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            }));

                            await apiService.createOrder({
                                amount: totalAmount,
                                paymentId: response.razorpay_payment_id,
                                userId: userId,
                                products: formattedProducts,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                                deliveryAddress: {
                                    street: "123 Pizzify Lane",
                                    city: "Mumbai",
                                    state: "Maharashtra",
                                    zipCode: "400001",
                                    country: "India"
                                }
                            });
                            clearCartMutation();
                            router.push("/orders");
                        } else {
                            toast.error("Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Order creation error:", error);
                        toast.error("Payment successful but order creation failed");
                    }
                },
                prefill: {
                    name: currentUser?.fullname || "",
                    email: currentUser?.email || "",
                    contact: currentUser?.phone || "",
                },
                notes: {
                    address: "Pizzify HQ",
                },
                theme: {
                    color: "#F37254",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                toast.error(`Payment failed: ${response.error.description}`);
            });
            rzp.open();
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed. Please try again.");
        }
    };

    if (!hydrated) return null;
    if (!userId) return <EmptyState message="Please log in to view your cart." />;

    const words = [
        {
            text: "Customize",
        },
        {
            text: "your",
        },
        {
            text: "Picks",
        },
        {
            text: "and",
        },
        {
            text: "prepare",
        },
        {
            text: "to",
        },
        {
            text: "Pizzify!.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];

    const isCartEmpty = (cart?.products?.length || 0) === 0;

    if (isLoading) {
        return (
            <DynamicBackgroundWrapper>
                <section className="pt-20 pb-16 px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <Skeleton className="h-8 w-60 mx-auto mb-4 bg-white/20" />
                        <Skeleton className="h-5 w-80 mx-auto mb-2 bg-white/20" />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-15">
                    <div className="md:col-span-2 space-y-5">
                        {[...Array(3)].map((_, idx) => (
                            <Card key={idx} className="rounded-xl border-white/10 bg-white/5 backdrop-blur-md p-4">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                                    <Skeleton className="w-full sm:w-28 h-28 rounded-xl bg-white/20" />

                                    <div className="flex-1 w-full flex flex-col justify-center gap-3">
                                        <Skeleton className="w-3/4 h-5 bg-white/60" />
                                        <Skeleton className="w-1/4 h-4 bg-white/60" />

                                        <div className="flex items-center gap-2 mt-2">
                                            <Skeleton className="h-7 w-7 rounded bg-white/60" />
                                            <Skeleton className="h-5 w-6 rounded bg-white/60" />
                                            <Skeleton className="h-7 w-7 rounded bg-white/60" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end gap-3 min-w-[80px]">
                                        <Skeleton className="h-6 w-6 rounded bg-white/60" />
                                        <Skeleton className="h-6 w-14 rounded bg-white/60" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-fit shadow-lg">
                        <Skeleton className="h-6 w-40 mb-4 bg-white/20" />
                        <Separator className="bg-white/10 mb-4" />
                        <Skeleton className="h-4 w-24 mb-2 bg-white/20" />
                        <Skeleton className="h-4 w-32 mb-6 bg-white/20" />
                        <Skeleton className="h-10 w-full bg-white/20" />
                    </div>
                </div>
            </DynamicBackgroundWrapper>
        );
    }

    if (isCartEmpty) {
        return <EmptyState message="Your cart is empty. Start adding some delicious pizzas!" />;
    }

    return (
        <DynamicBackgroundWrapper>
            <section className="pt-20 pb-16 px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="mb-6">
                            <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm text-white/50 font-light">
                                Your Shopping Cart
                            </span>
                        </div>
                        <TypewriterEffectSmooth words={words} />
                        <p className="text-lg text-white/40 font-light max-w-2xl mx-auto">
                            Review your selected items below and proceed when you&apos;re ready. Add, remove, or adjust quantities as needed.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-15">
                <div className="md:col-span-2 space-y-5" ref={cartRef}>
                    {(cart?.products || []).map((item) =>
                        item.productId ? (
                            <Card
                                key={item.productId._id}
                                className="rounded-xl border-white/10 bg-white/5 backdrop-blur-md transition hover:scale-[1.01]"
                            >
                                <CardContent className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 p-2 sm:p-5">
                                    <img
                                        src={item.productId.imageUrl || "/placeholder.png"}
                                        alt={item.productId.name}
                                        className="w-full sm:w-28 h-28 object-contain rounded-xl border shadow-sm"
                                    />

                                    <div className="flex-1 w-full flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
                                        <div>
                                            <CardTitle className="text-base sm:text-lg font-medium text-white">
                                                {item.productId.name}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-white/60 mt-1">
                                                ₹{item.productId.price}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <Button
                                                variant="ghost"
                                                size="2"
                                                onClick={() => decrementQty(item)}
                                                className="h-7 w-7 p-0 text-white border border-white/10 bg-white/5 hover:bg-white/10"
                                            >
                                                <Minus size={14} />
                                            </Button>
                                            <span className="text-sm text-white">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="2"
                                                onClick={() => incrementQty(item)}
                                                className="h-7 w-7 p-0 text-white border border-white/10 bg-white/5 hover:bg-white/10"
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end sm:items-center gap-3 min-w-[80px]">
                                        <Button
                                            variant="ghost"
                                            size="2"
                                            colorVariant="gray"
                                            onClick={() => removeFromCart(item.productId._id)}
                                            className="h-9 w-6 p-0 self-end sm:self-center cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                        <span className="text-green-400 font-semibold text-lg sm:self-center">
                                            ₹{item.quantity * item.productId.price}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null
                    )}
                </div>

                {!isCartEmpty && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-fit shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
                        <Separator className="bg-white/10 mb-4" />
                        <div className="flex justify-between text-sm text-white/70 mb-2">
                            <span>Total Items</span>
                            <span>{(cart?.products || []).length}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold text-green-400 mb-6">
                            <span>Total Price</span>
                            <span>₹{getTotalPrice()}</span>
                        </div>
                        <Button onClick={handleCheckout} variant="classic" colorVariant="gray" className="w-full cursor-pointer">
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
        </DynamicBackgroundWrapper>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-muted-foreground text-center px-6 space-y-4">
            <p className="text-lg">{message}</p>
            <Link href="/menu" className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition">
                Go to Menu 🍕
            </Link>
        </div>
    );
}
