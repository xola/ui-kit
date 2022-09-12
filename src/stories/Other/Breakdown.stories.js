import React from "react";
import { Breakdown, Button, CardIcon } from "../..";

const BreakdownStories = {
    title: "Other/Breakdown",
    component: Breakdown,
};

export const Default = () => {
    return (
        <div className="w-80">
            <Breakdown currency="USD">
                <Breakdown.Item value={100}>Line item caption</Breakdown.Item>
                <Breakdown.Item value={29}>Children ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value={29}>Adults ($29.00 x 1)</Breakdown.Item>
                <Breakdown.Item value={4}>VAT ($2.00 x 2)</Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Total" value={162}>
                    <Button color="secondary" variant="outline" size="small">
                        Modify Taxes &amp; Fees
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.Item value={62} info={<CardIcon />}>
                    Payment (12/18/2019)
                </Breakdown.Item>

                <Breakdown.Item color="primary" value={-62} info={<CardIcon />}>
                    Refund (07/23/2021)
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Paid" value={62}>
                    <Button color="secondary" variant="outline" size="small">
                        Apply Code
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.SubtotalItem info="Balance" color="danger" value={62} />
            </Breakdown>
        </div>
    );
};

export default BreakdownStories;
