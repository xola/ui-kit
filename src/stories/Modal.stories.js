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
    const onHide = () => setShow(false);
    const cancelButtonRef = useRef();

    return (
        <div>
            <Button onClick={() => setShow(true)}>Click me to launch a modal</Button>
            {show && (
                <Modal size="sm:max-w-xl" onHide={onHide}>
                    <Modal.Header>My Modal Header</Modal.Header>
                    <Modal.Body>My Modal Body</Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="w-full sm:w-auto sm:text-sm sm:ml-3"
                            color="outline"
                            // onClick={props.onClick}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="w-full sm:w-auto sm:text-sm sm:ml-3"
                            color="danger"
                            // onClick={props.onClick}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
