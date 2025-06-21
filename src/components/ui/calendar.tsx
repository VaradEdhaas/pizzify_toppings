"use client";

import { Calendar as HeroCalendar, type CalendarDate } from "@heroui/calendar";
import { useState } from "react";

interface CalendarProps {
  value?: CalendarDate;
  onChange?: (date: CalendarDate) => void;
}

export function Calendar({ value: valueProp, onChange }: CalendarProps) {
  const [value, setValue] = useState<CalendarDate | undefined>(valueProp);

  const handleChange = (newDate: CalendarDate) => {
    setValue(newDate);
    onChange?.(newDate);
  };

  return (
    <HeroCalendar
      value={value}
      onChange={handleChange}
      showMonthAndYearPickers
      isDisabled={false}
      isReadOnly={false}
      classNames={{
        base: "p-4 bg-black/10 rounded-lg",
        prevButton: "text-white hover:text-gray-200",
        nextButton: "text-white hover:text-gray-200",
      }}
    />
  );
}
