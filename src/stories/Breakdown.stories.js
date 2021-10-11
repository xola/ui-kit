import React from "react";
import { Breakdown, CardIcon, Button } from "..";

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

                <Breakdown.SubtotalItem info="Total" value="$162.00">
                    <Button color="outline" size="small">
                        Modify Taxes &amp; Fees
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.Item value="$62.00" info={<CardIcon />}>
                    Payment (12/18/2019)
                </Breakdown.Item>

                <Breakdown.Item color="primary" value="-$62.00" info={<CardIcon />}>
                    Refund (07/23/2021)
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Paid" value="$62.00">
                    <Button color="outline" size="small">
                        Apply Code
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.SubtotalItem info="Balance" color="danger" value="$62.00" />
            </Breakdown>
        </div>
    );
};

export default HeaderToolbarStories;
