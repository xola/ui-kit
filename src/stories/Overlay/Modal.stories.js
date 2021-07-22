import React, { useState } from "react";
import { Button, Modal, Input } from "../..";

const ModalStories = {
    title: "Overlay/Modal",
    component: Modal,
    argTypes: {
        size: {
            type: { required: false },
            defaultValue: "medium",
            options: ["small", "medium", "large", "xlarge"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        shouldShowClose: {
            type: { required: false },
            defaultValue: true,
            description: "If the 'x' button should be shown",
            control: { type: "boolean" },
        },
        shouldCloseOnOutsideClick: {
            type: { required: false },
            defaultValue: true,
            description: "Close the modal if user clicks outside it",
            control: { type: "boolean" },
        },
    },
};

export const Default = ({ size, shouldShowClose, shouldCloseOnOutsideClick }) => {
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal
                toggle={toggle}
                size={size}
                shouldShow={show}
                shouldShowClose={shouldShowClose}
                shouldCloseOnOutsideClick={shouldCloseOnOutsideClick}
                onHide={toggle}
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
