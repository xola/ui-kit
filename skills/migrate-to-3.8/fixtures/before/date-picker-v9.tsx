import { DatePicker } from "@xola/ui-kit";
import React from "react";

const NEXT_MONTH = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
const DISABLED = [{ daysOfWeek: [0] }, { before: new Date() }];

export const ArrivalPicker = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => (
    <DatePicker
        value={value}
        month={NEXT_MONTH}
        fromMonth={new Date()}
        toMonth={NEXT_MONTH}
        disabledDays={DISABLED}
        onChange={onChange}
    />
);
