import React, { useState } from "react";
import { Button, Modal } from "..";

export default {
    title: "Modal",
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
        showClose: {
            type: { required: false },
            defaultValue: true,
            description: "If the 'x' button should be shown",
            control: { type: "boolean" },
        },
        closeOnClickOutside: {
            type: { required: false },
            defaultValue: true,
            description: "Close the modal if user clicks outside it",
            control: { type: "boolean" },
        },
    },
};

export const Default = (config) => {
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>
            <Modal {...config} show={show} toggle={toggle} onHide={toggle}>
                <Modal.Header>Apply Code</Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder="Coupon of Affiliate"
                        className="w-full placeholder-gray-dark border-gray-light rounded-md"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-full sm:w-auto sm:text-sm sm:ml-3" color="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button className="w-full sm:w-auto sm:text-sm sm:ml-3" color="danger" onClick={toggle}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
