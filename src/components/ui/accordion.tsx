"use client";

import * as React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

export interface HeroAccordionProps {
  items: Array<{
    key: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    content: React.ReactNode;
  }>;
  variant?: "light" | "shadow" | "bordered" | "splitted";
  compact?: boolean;
  multiple?: boolean;
}

export function HeroAccordion({
  items,
  variant = "light",
  compact = false,
  multiple = false,
}: HeroAccordionProps) {
  return (
    <Accordion
      variant={variant}
      isCompact={compact}
      selectionMode={multiple ? "multiple" : "single"}
      defaultSelectedKeys={items.length > 0 ? [items[0].key] : []}
      className="w-full"
    >
      {items.map((item) => (
        <AccordionItem key={item.key} title={item.title} subtitle={item.subtitle}>
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
