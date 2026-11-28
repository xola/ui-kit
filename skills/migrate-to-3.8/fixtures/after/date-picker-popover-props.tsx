import { DatePickerPopover } from "@xola/ui-kit";
import React from "react";

const POPOVER_PROPS = { distance: 8 };

export const ArrivalField = ({ value }: { value: string }) => (
    <DatePickerPopover value={value} popoverProps={POPOVER_PROPS} />
);

export const ReportField = ({ value }: { value: string }) => <DatePickerPopover value={value} />;
