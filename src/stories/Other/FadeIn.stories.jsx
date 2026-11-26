import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Button, FadeIn } from "../..";

const FadeInStories = {
    title: "Other/Animation/Fade In",
    component: FadeIn,
    parameters: {
        docs: {
            description: {
                component: "Fades its content in while `shouldShow` is true and removes it when it turns false",
            },
        },
    },
};

export const Default = () => {
    const [shouldShow, setShouldShow] = useState(false);

    const toggle = () => {
        setShouldShow(!shouldShow);
    };

    return (
        <div className="space-y-4">
            <Button onClick={toggle}>Toggle content</Button>

            <FadeIn shouldShow={shouldShow} className="rounded bg-gray-lighter p-4">
                Faded into view
            </FadeIn>
        </div>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle content" });
    await expect(canvas.queryByText("Faded into view")).not.toBeInTheDocument();

    await userEvent.click(toggle);
    await waitFor(() => expect(canvas.getByText("Faded into view")).toBeVisible(), { timeout: 2000 });

    await userEvent.click(toggle);
    await waitFor(() => expect(canvas.queryByText("Faded into view")).not.toBeInTheDocument(), { timeout: 2000 });
};

export default FadeInStories;
