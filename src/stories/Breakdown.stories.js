import React from "react";
import { Breakdown, CardIcon } from "..";

const HeaderToolbarStories = {
    title: "Other/Breakdown",
    component: Breakdown,
};

export const Default = () => {
    return (
        <div className="w-80">
            <Breakdown>
                <Breakdown.Item value="$29.00">Children ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value="$29.00">Adults ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value="$100.00">Charge</Breakdown.Item>
                <Breakdown.Item value="$4.00">VAT ($2.00 x 2)</Breakdown.Item>
                <Breakdown.Separator />
                <Breakdown.SubtotalItem value="$162.00">Total</Breakdown.SubtotalItem>
                <Breakdown.Item value="$62.00" icon={<CardIcon />}>
                    Payment (12/18/2019)
                </Breakdown.Item>
                <Breakdown.Item className="text-primary" value="-$62.00" icon={<CardIcon />}>
                    Refund (07/23/2021)
                </Breakdown.Item>
                <Breakdown.Separator />
                <Breakdown.SubtotalItem value="$62.00">Paid</Breakdown.SubtotalItem>
                <Breakdown.SubtotalItem className="text-danger" value="$62.00">
                    Balance
                </Breakdown.SubtotalItem>
            </Breakdown>
        </div>
    );
};

export default HeaderToolbarStories;
