import React, { useState, useRef } from "react";
import { Button, Modal } from "..";

export default {
    title: "Modal",
    component: Modal,
    decorators: [
        (Story) => (
            <div style={{ margin: "2em" }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = (config) => {
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>
            <Modal show={show} toggle={toggle} size="sm:max-w-xl">
                <Modal.Header>My Modal Header</Modal.Header>
                <Modal.Body>My Modal Body</Modal.Body>
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
