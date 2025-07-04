"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import apiService, { Order } from "@/helper/apiService";
import { toast } from "react-toastify";
import { useAuth } from "@/components/context/AuthContext";
import gsap from "gsap";
import { DynamicBackgroundWrapper } from "@/components/layout/DynamicBackgroundWrapper";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const UserOrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const cardsRef = useRef<HTMLDivElement | null>(null);

    const { currentUser } = useAuth();
    const userId = currentUser?.user?._id || currentUser?.user?.id;

    const fetchOrders = async () => {
        try {
            if (!userId) {
                toast.error("User not logged in");
                return;
            }

            const response = await apiService.getOrdersByUserId(userId);
            setOrders(response);
        } catch (error) {
            toast.error("Failed to fetch orders");
            console.error("Order Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (!loading && cardsRef.current) {
            gsap.fromTo(
                cardsRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, [loading, orders]);

    return (
        <DynamicBackgroundWrapper>
            <div className="w-full mx-auto p-6 min-h-screen bg-black text-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Your Orders</h1>
                    {!loading && orders.length > 0 && (
                        <p className="text-white/60 text-sm mt-1">
                            You have placed <span className="font-semibold text-white">{orders.length}</span> order{orders.length > 1 ? "s" : ""}.
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                            <Skeleton key={idx} className="w-full h-40 rounded-xl bg-muted/20" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-muted-foreground text-center text-lg">
                        You have no orders yet.
                    </p>
                ) : (
                    <div ref={cardsRef} className="space-y-6">
                        {orders.map((order) => (
                            <Card
                                key={order._id}
                                className="bg-zinc-900 border border-white/10 rounded-xl p-5 transition hover:border-white/20 overflow-visible shadow-md hover:shadow-xl"
                            >
                                <CardHeader className="flex flex-col gap-2 mb-2">
                                    <CardTitle className="text-base text-white">
                                        Order placed on{" "}
                                        <span className="text-white/60 font-normal">
                                            {new Date(order.createdAt).toLocaleString("en-IN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4 overflow-visible">
                                    <div className="flex items-center h-full relative z-0">
                                        <div className="flex -space-x-4">
                                            <AnimatedTooltip
                                                items={order.items?.slice(0, 5).map((item, idx) => ({
                                                    id: `${order._id}-${idx}`,
                                                    name: item?.name || item?.product?.name || "Unnamed",
                                                    designation: `Qty: ${item.quantity} × ₹${item.priceAtPurchase}`,
                                                    image: item?.image || item?.product?.imageUrl || "/placeholder.png",
                                                }))}
                                            />
                                        </div>
                                        {order.items?.length > 5 && (
                                            <span className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-sm font-semibold border-2 border-white z-10 ml-2">
                                                +{order.items.length - 5}
                                            </span>
                                        )}
                                    </div>

                                    <div className="pt-3 border-t border-white/10 mt-4 flex justify-between items-center">
                                        <span className="text-white/60 text-sm">
                                            {new Date(order.createdAt).toLocaleString("en-IN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                        <span className="text-green-400 font-semibold text-base tracking-wide">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DynamicBackgroundWrapper>
    );
};

export default UserOrdersPage;
