import React, { useState } from "react";
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
    console.log('rendering, show is', show);
    const onHide = () => setShow(false);

    return (
        <div>
            <Button onClick={() => setShow(true)}>Click me to launch a modal</Button>
            {show && (
                <Modal onHide={onHide}>
                    <Modal.Header>
                        My Modal Header
                    </Modal.Header>
                    <Modal.Body>
                        My Modal Body
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};
