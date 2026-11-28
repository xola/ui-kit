import React from "react";
import { Toaster } from "react-hot-toast";
import { expect, fn, waitFor } from "storybook/test";
import { Button, flash } from "../..";

const FlashStories = {
    title: "Data Display/Flash",
    parameters: {
        docs: {
            description: {
                component: "Show a notification",
            },
        },
    },
    args: {
        text: "Your booking was successfully created",
        size: "medium",
        color: "success",
        duration: 3000,
        canClose: true,
    },
    argTypes: {
        text: {
            type: { required: false },
            description: "The text in the component. For **demo** only",
            control: { type: "text" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "inline-radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "danger", "caution"],
            control: { type: "inline-radio" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
        duration: {
            type: { required: false },
            description: "Time in `ms`",
            control: { type: "number" },
        },
        canClose: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: true },
            },
        },
    },
};

const toastMe = (props) => {
    const handleClose = (event, toast) => {
        props.onClose?.(event, toast);
        flash.dismiss(toast.id);
    };

    flash.show({ ...props, onClose: handleClose });
};

export const Default = (props) => {
    return (
        <div className="space-y-6">
            <div>Click below to show a flash</div>
            <Button onClick={() => toastMe(props)}>{props.text}</Button>

            <pre>
                <code>{`flash.show({ text: "${props.text}", color: "${props.color ?? "primary"}", duration: ${
                    props.duration
                } })`}</code>
            </pre>

            <div>
                <Button size="small" color="warning" onClick={() => flash.dismiss()}>
                    Dismiss All
                </Button>
            </div>

            {/* Make sure Toaster is added to a root component */}
            <Toaster />
        </div>
    );
};

Default.args = {
    onClose: fn(),
};

Default.play = async ({ args, canvas, userEvent }) => {
    const { text, onClose } = args;
    const queryToast = () => canvas.queryByText(text, { ignore: "button, button *" });

    await userEvent.click(canvas.getByRole("button", { name: text }));
    await waitFor(() => expect(queryToast()).toBeVisible());

    const toast = queryToast().parentElement;
    const getOpacity = () => Number(getComputedStyle(toast).opacity);

    await waitFor(() => expect(getOpacity()).toBeLessThan(0.5), { timeout: 2000 });
    await expect(getComputedStyle(toast).transitionDuration).toBe("0.5s");
    await expect(getComputedStyle(toast).transitionTimingFunction).toBe("cubic-bezier(0, 0, 0.2, 1)");
    const enterFromOpacity = getOpacity();
    await waitFor(() => expect(getOpacity()).toBeGreaterThan(enterFromOpacity), { timeout: 2000 });
    await waitFor(() => expect(getComputedStyle(toast).opacity).toBe("1"), { timeout: 2000 });

    // The close control is a plain clickable div next to the text, with no role or label to query by
    const closeControl = queryToast().nextElementSibling;
    let closeEvent;
    const captureCloseEvent = (event) => {
        closeEvent = event;
    };
    closeControl.addEventListener("click", captureCloseEvent);
    await userEvent.click(closeControl);
    closeControl.removeEventListener("click", captureCloseEvent);

    await expect(onClose).toHaveBeenCalledTimes(1);
    const [callbackEvent, callbackToast] = onClose.mock.calls[0];
    await expect(callbackEvent.nativeEvent).toBe(closeEvent);
    await expect(callbackEvent.target).toBe(closeControl);
    await expect(typeof callbackToast.id).toBe("string");
    await expect(callbackToast.visible).toBe(true);
    await expect(callbackToast.duration).toBe(3000);
    await expect(callbackToast.position).toBe("top-center");
    await waitFor(() => expect(getComputedStyle(toast).transitionTimingFunction).toBe("cubic-bezier(0.4, 0, 1, 1)"), {
        timeout: 2000,
    });
    await expect(getComputedStyle(toast).transitionDuration).toBe("0.5s");
    await waitFor(() => expect(getOpacity()).toBeLessThanOrEqual(0.9), { timeout: 2000 });
    const leaveFromOpacity = getOpacity();
    await waitFor(() => expect(getOpacity()).toBeLessThan(leaveFromOpacity), { timeout: 2000 });
    await waitFor(() => expect(queryToast()).not.toBeInTheDocument(), { timeout: 2000 });
};

export const AllStyles = (props) => {
    const handleClose = () => {
        console.log("Closed");
    };

    return (
        <div className="w-96 space-y-8">
            {FlashStories.argTypes.color.options.map((color) => {
                const classes = flash.getStyles(color, props.size, "relative", true);
                return (
                    <React.Fragment key={color}>
                        {flash.container(`[${color}] ${props.text}`, classes, props.canClose ? handleClose : null, {
                            id: `flash-${color}`,
                            visible: true,
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export const Sizes = () => {
    return (
        <div className="space-y-8">
            {FlashStories.argTypes.size.options.map((size) => {
                const classes = flash.getStyles("primary", size, "relative", false);
                return (
                    <React.Fragment key={size}>
                        {flash.container(`[${size}] Flash message`, classes, null, {
                            id: `flash-${size}`,
                            visible: true,
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

Sizes.play = async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText("[small] Flash message")).toBeVisible());
    await expect(canvas.getByText("[medium] Flash message")).toBeVisible();
    await expect(canvas.getByText("[large] Flash message")).toBeVisible();
};

export const Persistent = () => {
    const text = "Persistent flash message";
    const handleShow = () => flash.show({ text, canClose: false });

    return (
        <div>
            <Button onClick={handleShow}>Show persistent flash</Button>
            <Toaster />
        </div>
    );
};

Persistent.play = async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show persistent flash" }));
    await waitFor(() => expect(canvas.getByText("Persistent flash message")).toBeVisible());
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await expect(canvas.getByText("Persistent flash message")).toBeVisible();
    await expect(canvas.getByText("Persistent flash message").nextElementSibling).not.toBeInTheDocument();
};

export default FlashStories;
