// @ts-nocheck
import { random } from "lodash-es";
import React, { useState } from "react";
import { Button, FormGroup, InlineValuePopover, Input, Select } from "../..";

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

export default InlineValuePopoverStories;
