"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }: {
        card: any;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-2xl border border-white/10 p-6 backdrop-blur-lg bg-white/5 shadow-lg text-white transition-all duration-300 ease-out h-[340px] w-full flex flex-col justify-between",
                hovered !== null && hovered !== index && "blur-sm opacity-60"
            )}
        >
            {/* Image Box */}
            <div className="h-48 w-full flex items-center justify-center bg-white/5 rounded-xl overflow-hidden">
                {card.src ? (
                    <img
                        src={card.src}
                        alt={card.title}
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-6xl bg-white/10">
                        🍕
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-white/60 mt-1">Fusion pizza with toppings</p>
                <p className="text-lg font-bold text-emerald-400 mt-2">₹299</p>
            </div>
        </div>
    )
);

Card.displayName = "Card";

type Card = {
    title: string;
    src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}