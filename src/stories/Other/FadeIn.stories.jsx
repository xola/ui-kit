import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Button, FadeIn } from "../..";

const lifecycleEvents = [];

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

            <FadeIn
                shouldShow={shouldShow}
                className="rounded bg-gray-lighter p-4"
                leave="transition-opacity duration-700"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                beforeEnter={() => lifecycleEvents.push("beforeEnter")}
                afterEnter={() => lifecycleEvents.push("afterEnter")}
                beforeLeave={() => lifecycleEvents.push("beforeLeave")}
                afterLeave={() => lifecycleEvents.push("afterLeave")}
            >
                Faded into view
            </FadeIn>
        </div>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle content" });
    lifecycleEvents.length = 0;
    await expect(canvas.queryByText("Faded into view")).not.toBeInTheDocument();

    // The enterFrom stage paints the content at opacity 0 before the enterTo transition starts
    await userEvent.click(toggle);
    const content = await canvas.findByText("Faded into view");
    const getOpacity = () => Number(getComputedStyle(content).opacity);
    await waitFor(() => expect(getOpacity()).toBeLessThan(0.5), { timeout: 2000 });
    await expect(getComputedStyle(content).transitionDuration).toBe("0.7s");

    // The enterTo stage transitions from that paint up to the entered state
    const enterFromOpacity = getOpacity();
    await waitFor(() => expect(getOpacity()).toBeGreaterThan(enterFromOpacity), { timeout: 2000 });
    await waitFor(() => expect(getComputedStyle(content).opacity).toBe("1"), { timeout: 2000 });
    await waitFor(() => expect(lifecycleEvents).toEqual(["beforeEnter", "afterEnter"]), { timeout: 2000 });

    // The leave stages keep the content mounted while it fades back out, then unmount it
    await userEvent.click(toggle);
    await expect(content).toBeInTheDocument();
    await waitFor(() => expect(getOpacity()).toBeLessThan(0.5), { timeout: 2000 });
    await waitFor(() => expect(canvas.queryByText("Faded into view")).not.toBeInTheDocument(), { timeout: 2000 });
    await expect(lifecycleEvents).toEqual(["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"]);
};

export const Visible = () => {
    return (
        <FadeIn shouldShow enterTo="opacity-100 scale-100" entered="rested" className="rounded bg-gray-lighter p-4">
            Faded into view
        </FadeIn>
    );
};

Visible.play = async ({ canvas }) => {
    const content = canvas.getByText("Faded into view");
    await waitFor(() => expect(content).toBeVisible(), { timeout: 2000 });
    await waitFor(() => expect(content).toHaveClass("rested"), { timeout: 2000 });
    await expect(content).toHaveClass("transition-opacity", "duration-700", "opacity-100", "scale-100", "rested");
    await expect(getComputedStyle(content).transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
};

export default FadeInStories;
