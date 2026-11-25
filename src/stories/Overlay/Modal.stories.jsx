import React, { useState } from "react";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button, Input, Modal } from "../..";

const ModalStories = {
    title: "Overlay/Modal",
    component: Modal,
    args: {
        size: "medium",
        position: "center",
        shouldCloseOnOutsideClick: true,
        isOpen: false,
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7751%3A525089&viewport=6332%2C-1512%2C0.29",
        },
    },
    argTypes: {
        size: {
            type: { required: false },
            options: ["small", "medium", "large", "huge"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        position: {
            type: { required: false },
            options: ["topLeft", "topRight", "center", "bottomLeft", "bottomRight"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "center" },
            },
        },
        shouldCloseOnOutsideClick: {
            type: { required: false },
            description: "Close the modal if user clicks outside it",
            control: { type: "boolean" },
        },
        isOpen: {
            type: { required: false },
            description: "Control the modal open state",
            control: { type: "boolean" },
        },
    },
};

export const Default = ({ size, position, shouldCloseOnOutsideClick, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        onClose();
        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal
                size={size}
                position={position}
                isOpen={isOpen}
                shouldCloseOnOutsideClick={shouldCloseOnOutsideClick}
                onClose={handleClose}
            >
                <Modal.Header description="Enter the code bellow to apply the code">Apply Code</Modal.Header>

                <Modal.Body>
                    <Input placeholder="Coupon of Affiliate" />
                </Modal.Body>

                <Modal.Footer className="space-x-4">
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="danger" onClick={toggle}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

Default.args = {
    onClose: fn(),
};

Default.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const launcher = canvas.getByRole("button", { name: "Click me to launch a modal" });
    await expect(body.queryByText("Apply Code")).not.toBeInTheDocument();

    await userEvent.click(launcher);
    const dialog = await body.findByRole("dialog");
    await expect(body.getByText("Apply Code")).toBeInTheDocument();
    await expect(body.getByPlaceholderText("Coupon of Affiliate")).toBeInTheDocument();

    // Opening focuses the first focusable element inside, not the dialog container itself
    await waitFor(() => {
        expect(dialog).toContainElement(ownerDocument.activeElement);
        expect(ownerDocument.activeElement).not.toBe(dialog);
    });

    // More presses than the dialog has tabbable elements, so focus has to wrap at least once
    for (let press = 0; press < 5; press++) {
        await userEvent.tab();
        await waitFor(() => expect(dialog).toContainElement(ownerDocument.activeElement));
    }

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByText("Apply Code")).not.toBeInTheDocument());
    await expect(args.onClose).toHaveBeenCalledOnce();

    await userEvent.click(launcher);
    await body.findByText("Apply Code");
    await userEvent.click(ownerDocument.querySelector(".ui-modal-overlay"));
    await waitFor(() => expect(body.queryByText("Apply Code")).not.toBeInTheDocument());
    await expect(args.onClose).toHaveBeenCalledTimes(2);

    await userEvent.click(launcher);
    await body.findByText("Apply Code");
    await userEvent.click(body.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(body.queryByText("Apply Code")).not.toBeInTheDocument());
};

export const CustomWidth = ({ size, position, shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal
                className="!max-w-200"
                size={size}
                position={position}
                isOpen={isOpen}
                shouldCloseOnOutsideClick={shouldCloseOnOutsideClick}
                onClose={toggle}
            >
                <Modal.Header>Apply Code</Modal.Header>

                <Modal.Body>
                    <Input placeholder="Coupon of Affiliate" />
                </Modal.Body>

                <Modal.Footer className="space-x-4">
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="danger" onClick={toggle}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalStories;
