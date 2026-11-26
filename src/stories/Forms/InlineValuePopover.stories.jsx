import { random } from "lodash-es";
import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Button, FormGroup, InlineValuePopover, Input, Modal, Select } from "../..";
import { getPortalCanvas } from "../helpers";

const InlineValuePopoverStories = {
    title: "Forms & Fields/Inline Value Popover",
    component: InlineValuePopover,
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=1481%3A53710",
        },
    },
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("8 hours");
    const [value, setValue] = useState(8);

    const handleSubmit = (e) => {
        e.preventDefault();
        setText(`${value} hours with a very large string in here`);
        setIsOpen(false);
    };

    const updateValue = (e) => setValue(e.target.value);

    const handleClickOutside = () => {
        console.log("Setting", value);
        setIsOpen(!isOpen);
        setValue(value);
    };

    return (
        <div className="h-20">
            <p className="mb-5">Outside</p>
            <InlineValuePopover
                text={text}
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                onClickOutside={handleClickOutside}
            >
                <form onSubmit={handleSubmit}>
                    <FormGroup className="!m-0 flex flex-row space-x-2">
                        <Input value={value} onChange={updateValue} />
                        <Select>
                            <option value="hours">hours</option>
                            <option value="minutes">minutes</option>
                        </Select>
                        <Button>Apply</Button>
                    </FormGroup>
                </form>
            </InlineValuePopover>
        </div>
    );
};

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByText("8 hours")).toBeInTheDocument();
    // Clicking the value opens a popover holding the edit form
    await userEvent.click(canvas.getByText("8 hours"));
    const body = getPortalCanvas(canvasElement);
    await expect(await body.findByRole("button", { name: "Apply" })).toBeInTheDocument();
    await waitFor(() => expect(body.getByRole("textbox")).toHaveFocus());

    await userEvent.click(canvas.getByText("Outside"));
    await waitFor(() => expect(body.queryByRole("button", { name: "Apply" })).toBeNull());
};

export const WithoutArrow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("8 hours");

    const handleSubmit = (e) => {
        e.preventDefault();
        setText(`${random(1, 10)} hours`);
        setIsOpen(false);
    };

    return (
        <div>
            <div className="mb-5">
                Values are randomly set just for story purposes. Use your form library to fetch form values and set them
                properly
            </div>
            <InlineValuePopover
                showArrow={false}
                text={text}
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                onClickOutside={() => setIsOpen(!isOpen)}
            >
                <form onSubmit={handleSubmit}>
                    <FormGroup className="!m-0 flex flex-row space-x-2">
                        <Input />
                        <Select>
                            <option value="hours">hours</option>
                            <option value="minutes">minutes</option>
                        </Select>
                        <Button>Apply</Button>
                    </FormGroup>
                </form>
            </InlineValuePopover>
        </div>
    );
};

WithoutArrow.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByText("8 hours"));
    const body = getPortalCanvas(canvasElement);
    await expect(await body.findByRole("button", { name: "Apply" })).toBeInTheDocument();
};

export const PassThroughProps = () => {
    return (
        <InlineValuePopover isOpen text="Pass-through value" data-testid="inline-value-popover-test-id">
            <Input />
        </InlineValuePopover>
    );
};

PassThroughProps.play = async ({ canvasElement }) => {
    const { ownerDocument } = canvasElement;
    await expect(await getPortalCanvas(canvasElement).findByRole("textbox")).toBeInTheDocument();
    await expect(ownerDocument.querySelector("[data-testid='inline-value-popover-test-id']")).toBeNull();
};

export const WithError = () => {
    return (
        <InlineValuePopover text="8 hours" error="Value is required">
            <Input />
        </InlineValuePopover>
    );
};

WithError.play = async ({ canvasElement, userEvent }) => {
    const icon = canvasElement.querySelector(".text-danger");
    await userEvent.hover(icon);
    await expect(await getPortalCanvas(canvasElement).findByRole("tooltip")).toHaveTextContent("Value is required");
};

export const InsideModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleClickOutside = () => setIsOpen(false);

    return (
        <Modal shouldCloseOnOutsideClick isOpen={isModalOpen} onClose={handleCloseModal}>
            <Modal.Header>Modal with an inline value</Modal.Header>
            <Modal.Body>
                <InlineValuePopover
                    text="8 hours"
                    isOpen={isOpen}
                    onClick={handleToggle}
                    onClickOutside={handleClickOutside}
                >
                    <Input placeholder="Hours" />
                </InlineValuePopover>
            </Modal.Body>
        </Modal>
    );
};

InsideModal.play = async ({ canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    const queryModal = () => body.queryByText("Modal with an inline value");

    await userEvent.click(await body.findByText("8 hours"));
    const input = await body.findByPlaceholderText("Hours");
    await waitFor(() => expect(input).toHaveFocus());

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByPlaceholderText("Hours")).toBeNull());
    await expect(queryModal()).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(queryModal()).toBeNull());
};

export default InlineValuePopoverStories;
