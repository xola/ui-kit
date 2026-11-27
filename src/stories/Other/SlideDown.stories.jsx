import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Button, SlideDown } from "../..";

const SlideDownStories = {
    title: "Other/Animation/Slide Down",
    component: SlideDown,
    parameters: {
        docs: {
            description: {
                component: "Slides its content down into view while `isOpen` is true, and back up when it turns false",
            },
        },
    },
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="space-y-4">
            <Button onClick={toggle}>Toggle content</Button>

            <SlideDown isOpen={isOpen}>
                <div className="rounded bg-gray-lighter p-4">Slid down into view</div>
            </SlideDown>
        </div>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle content" });
    await expect(canvas.queryByText("Slid down into view")).not.toBeInTheDocument();

    // The enter start paints the panel transparent before it slides into place
    await userEvent.click(toggle);
    const content = await canvas.findByText("Slid down into view");
    const panel = content.parentElement;
    const getOpacity = () => Number(getComputedStyle(panel).opacity);
    await waitFor(() => expect(getOpacity()).toBeLessThan(0.5), { timeout: 2000 });

    // The slide brings the panel up to full opacity
    const enterStartOpacity = getOpacity();
    await waitFor(() => expect(getOpacity()).toBeGreaterThan(enterStartOpacity), { timeout: 2000 });
    await waitFor(() => expect(getComputedStyle(panel).opacity).toBe("1"), { timeout: 2000 });

    // The leave animation keeps the panel mounted while it slides back up, then unmounts it
    await userEvent.click(toggle);
    await expect(panel).toBeInTheDocument();
    await waitFor(() => expect(getOpacity()).toBeLessThan(0.5), { timeout: 2000 });
    await waitFor(() => expect(canvas.queryByText("Slid down into view")).not.toBeInTheDocument(), {
        timeout: 2000,
    });
};

export const Visible = () => {
    return (
        <SlideDown isOpen>
            <div className="rounded bg-gray-lighter p-4">Slid down into view</div>
        </SlideDown>
    );
};

let initialSlideDownFrame;

Visible.beforeEach = () => {
    let recordFrame;
    initialSlideDownFrame = new Promise((resolve) => {
        recordFrame = resolve;
    });

    const observer = new MutationObserver(() => {
        const panel = document.querySelector(".overflow-hidden > [data-state='open']");
        if (!panel?.textContent.includes("Slid down into view")) return;

        observer.disconnect();
        const panelRect = panel.getBoundingClientRect();
        const rootRect = panel.parentElement.getBoundingClientRect();
        recordFrame({
            animationNames: panel.getAnimations().map((animation) => animation.animationName),
            opacity: Number(getComputedStyle(panel).opacity),
            topOffset: panelRect.top - rootRect.top,
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
};

Visible.play = async ({ canvas }) => {
    const initialFrame = await initialSlideDownFrame;
    await expect(initialFrame.animationNames).toEqual(["slide-down-in"]);
    await expect(initialFrame.opacity).toBe(0);
    await expect(initialFrame.topOffset).toBeLessThan(0);

    const panel = canvas.getByText("Slid down into view").parentElement;
    await waitFor(() => expect(panel).toBeVisible(), { timeout: 2000 });
    await waitFor(() => expect(getComputedStyle(panel).opacity).toBe("1"), { timeout: 2000 });
};

export default SlideDownStories;
