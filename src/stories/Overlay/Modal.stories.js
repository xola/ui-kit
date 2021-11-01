import React, { useState, useEffect } from "react";
import { Button, Modal, Input } from "../..";

const ModalStories = {
    title: "Overlay/Modal",
    component: Modal,
    args: {
        size: "medium",
        shouldCloseOnOutsideClick: true,
        isOpen: false,
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

export const Default = ({ size, shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal size={size} isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
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

export const WithSkeletonLoader = ({ size = "small" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsLoading(isOpen);
        if (isOpen) {
            setTimeout(() => setIsLoading(false), 2000);
        }
    }, [isOpen]);

    return (
        <div>
            <Button onClick={toggle}>Click Me</Button>

            <Modal size={size} isOpen={isOpen} onClose={toggle}>
                <Modal.Header description="Enter the code bellow to apply the code">Apply Code</Modal.Header>

                <Modal.Body isLoading={isLoading}>
                    <Input placeholder="Coupon of Affiliate" />
                </Modal.Body>

                <Modal.Footer isLoading={isLoading} className="space-x-4">
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button onClick={toggle}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const CustomWidth = ({ size, shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal
                className="!max-w-[800px]"
                size={size}
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
