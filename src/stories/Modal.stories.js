import React, { useState } from "react";
import { Modal, Button } from "..";

export default {
    title: "Modal",
};

export const Alert = () => {
    const [isOpen, toggle] = useState(false);
    return (
        <div>
            <Button onClick={() => toggle(true)}>Toggle Alert Modal</Button>
            <Modal
                title="Alert"
                message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua."
                isOpen={isOpen}
                keyboard={true}
                backdrop={true}
                toggle={() => toggle(false)}
                closeButtonText="OK"
                onClose={() => toggle(false)}
            />
        </div>
    );
};

export const ConfirmWithCustomStyles = () => {
    const [isOpen, toggle] = useState(false);
    return (
        <div>
            <Button onClick={() => toggle(true)}>Toggle Confirm Modal</Button>
            <Modal
                title="Confirm Delete ?"
                message="Are you sure you want to delete this Resource. This action cannot be undone"
                isOpen={isOpen}
                keyboard={true}
                backdrop={true}
                toggle={() => toggle(false)}
                closeButtonText="CANCEL"
                closeButtonColor="primary"
                closeButtonStyle={{ backgroundColor: "white", color: "grey" }}
                onClose={() => toggle(false)}
                confirmButtonText="CONFIRM"
                confirmButtonColor="danger"
                onConfirm={() => alert("confirmed")}
            />
        </div>
    );
};
