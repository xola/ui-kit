import { DatePicker } from "@xola/ui-kit";
import React from "react";

const NEXT_MONTH = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
const DISABLED = [{ dayOfWeek: [0] }, { before: new Date() }];

export const ArrivalPicker = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => (
    <DatePicker
        value={value}
        defaultMonth={NEXT_MONTH}
        startMonth={new Date()}
        endMonth={NEXT_MONTH}
        disabled={DISABLED}
        onChange={onChange}
    />
);
