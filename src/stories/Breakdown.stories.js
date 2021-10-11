import React from "react";
import { Breakdown, CardIcon, Button } from "..";

const BreakdownStories = {
    title: "Other/Breakdown",
    component: Breakdown,
};

export const Default = () => {
    return (
        <div className="w-80">
            <Breakdown currency="USD">
                <Breakdown.Item value={29.0}>Children ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value={29.0}>Adults ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value={100.0}>Charge</Breakdown.Item>
                <Breakdown.Item value={4.0}>VAT ($2.00 x 2)</Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Total" value={162.0}>
                    <Button color="outline" size="small">
                        Modify Taxes &amp; Fees
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.Item value={62.0} info={<CardIcon />}>
                    Payment (12/18/2019)
                </Breakdown.Item>

                <Breakdown.Item color="primary" value={-62.0} info={<CardIcon />}>
                    Refund (07/23/2021)
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Paid" value={62.0}>
                    <Button color="outline" size="small">
                        Apply Code
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.SubtotalItem info="Balance" color="danger" value={62.0} />
            </Breakdown>
        </div>
    );
};

export default BreakdownStories;
