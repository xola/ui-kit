import React, { useState } from "react";
import { expect, fn, waitFor } from "storybook/test";
import { Button, Input, Modal } from "../..";
import { expectFocusInside, getPortalCanvas, selectArg, waitForClosed } from "../helpers";

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
        size: selectArg(["small", "medium", "large", "huge"], "medium"),
        position: selectArg(["topLeft", "topRight", "center", "bottomLeft", "bottomRight"], "center"),
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
    const body = getPortalCanvas(canvasElement);
    const launcher = canvas.getByRole("button", { name: "Click me to launch a modal" });
    await expect(body.queryByText("Apply Code")).not.toBeInTheDocument();

    await userEvent.click(launcher);
    const dialog = await body.findByRole("dialog");
    await expect(body.getByText("Apply Code")).toBeInTheDocument();
    await expect(body.getByPlaceholderText("Coupon of Affiliate")).toBeInTheDocument();

    // Opening focuses the first focusable element inside, not the dialog container itself
    await expectFocusInside(dialog, ownerDocument);

    // More presses than the dialog has tabbable elements, so focus has to wrap at least once
    for (let press = 0; press < 5; press++) {
        await userEvent.tab();
        await expectFocusInside(dialog, ownerDocument);
    }

    await userEvent.keyboard("{Escape}");
    await waitForClosed(body.queryByText("Apply Code"));
    await expect(args.onClose).toHaveBeenCalledExactlyOnceWith();
    await waitFor(() => expect(launcher).toHaveFocus());

    await userEvent.click(launcher);
    await body.findByText("Apply Code");
    await userEvent.click(ownerDocument.querySelector(".ui-modal-overlay"));
    await waitForClosed(body.queryByText("Apply Code"));
    await expect(args.onClose).toHaveBeenCalledTimes(2);
    await expect(args.onClose).toHaveBeenLastCalledWith();
    await waitFor(() => expect(launcher).toHaveFocus());

    await userEvent.click(launcher);
    await body.findByText("Apply Code");
    await userEvent.click(body.getByRole("button", { name: "Cancel" }));
    await waitForClosed(body.queryByText("Apply Code"));

    await userEvent.click(launcher);
    const reopened = await body.findByRole("dialog");
    await userEvent.click(reopened.querySelector("button"));
    await waitForClosed(body.queryByText("Apply Code"));
    await expect(args.onClose).toHaveBeenCalledTimes(3);
    await expect(args.onClose).toHaveBeenLastCalledWith();
    await waitFor(() => expect(launcher).toHaveFocus());
};

const handleOpenModalClose = () => {};

const OpenModal = ({ size = "medium", position = "center", children = "Open modal body" }) => {
    return (
        <Modal isOpen size={size} position={position} onClose={handleOpenModalClose}>
            <Modal.Header>Open modal</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

const expectOpenModal = async ({ canvasElement }) => {
    const body = getPortalCanvas(canvasElement);
    const dialog = await body.findByRole("dialog");
    const modal = dialog.closest(".ui-modal");

    await waitFor(() => {
        expect(dialog).toBeVisible();
        expect(modal.getAnimations({ subtree: true })).toHaveLength(0);
    });

    return modal;
};

export const OpenSmall = () => <OpenModal size="small" />;
OpenSmall.play = expectOpenModal;

export const OpenMedium = () => <OpenModal />;
OpenMedium.play = expectOpenModal;

export const OpenLarge = () => <OpenModal size="large" />;
OpenLarge.play = expectOpenModal;

export const OpenHuge = () => <OpenModal size="huge" />;
OpenHuge.play = expectOpenModal;

export const OpenTopLeft = () => <OpenModal position="topLeft" />;
OpenTopLeft.play = expectOpenModal;

export const OpenTopRight = () => <OpenModal position="topRight" />;
OpenTopRight.play = expectOpenModal;

export const OpenBottomLeft = () => <OpenModal position="bottomLeft" />;
OpenBottomLeft.play = expectOpenModal;

export const OpenBottomRight = () => <OpenModal position="bottomRight" />;
OpenBottomRight.play = expectOpenModal;

export const LongContent = () => {
    const paragraphs = Array.from({ length: 30 }, (_, index) => `Long modal content paragraph ${index + 1}`);

    return (
        <OpenModal>
            {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4">
                    {paragraph}
                </p>
            ))}
        </OpenModal>
    );
};

LongContent.play = async (context) => {
    const modal = await expectOpenModal(context);

    await waitFor(() => expect(modal.scrollHeight).toBeGreaterThan(modal.clientHeight));
    modal.scrollTop = modal.scrollHeight;
    await expect(modal.scrollTop).toBeGreaterThan(0);
    modal.scrollTop = 0;
    await expect(modal.scrollTop).toBe(0);
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
