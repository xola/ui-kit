import React from "react";
import { Breakdown, Button, CardIcon } from "../..";

const BreakdownStories = {
    title: "Other/Breakdown",
    component: Breakdown,
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=236%3A144618&viewport=-3895%2C-275%2C0.33",
        },
    },
};

export const Default = () => {
    // Just for a basic showcase of when info is null
    const EmptyComponent = () => null;

    return (
        <div className="w-80 bg-gray-lighter p-4">
            <Breakdown currency="USD">
                <Breakdown.Item value={100}>Line item caption</Breakdown.Item>
                <Breakdown.Item value={29} secondary="($29.00 x 1)">
                    Very long really Children
                </Breakdown.Item>
                <Breakdown.Item value={29} secondary="($29.00 x 1)">
                    Adults
                </Breakdown.Item>
                <Breakdown.Item value={29} methodIcon={<EmptyComponent />} info={<EmptyComponent />}>
                    Null Info
                </Breakdown.Item>
                <Breakdown.Item value={4} secondary="($2.00 x 2)">
                    VAT
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Total" value={162}>
                    <Button color="secondary" variant="outline" size="small">
                        Modify
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.Item value={1230} secondary="12/18/2019" info="*0259" methodIcon={<CardIcon />}>
                    Payment
                </Breakdown.Item>

                <Breakdown.Item color="primary" info="*0259" secondary="07/23/2021" value={-62} methodIcon={<CardIcon />}>
                    Return Payment
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    This is a really long message that should wrap somehow more long
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    LongMessageThat ShouldOnlyBreakAt AWhitespaceLoremIpsum
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    SmallMessage LongMessageThatShouldOnlyBreakAtAWhitespaceLoremIpsum
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
