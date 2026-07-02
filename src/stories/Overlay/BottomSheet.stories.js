import React, { useState } from "react";
import { BottomSheet, Button, Input } from "../..";

const BottomSheetStories = {
    title: "Overlay/BottomSheet",
    component: BottomSheet,
    args: {
        shouldCloseOnOutsideClick: true,
        isOpen: false,
    },
    argTypes: {
        shouldCloseOnOutsideClick: {
            type: { required: false },
            description: "Close the sheet if user clicks the overlay",
            control: { type: "boolean" },
        },
        isOpen: {
            type: { required: false },
            description: "Control the sheet open state",
            control: { type: "boolean" },
        },
    },
};

export const Default = ({ shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a bottom sheet</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <BottomSheet.Header description="Enter the code below to apply the code">Apply Code</BottomSheet.Header>

                <BottomSheet.Body>
                    <Input placeholder="Coupon or Affiliate" />
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="primary" onClick={toggle}>
                        Confirm
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>
    );
};

export default BottomSheetStories;
