import { random } from "lodash";
import React, { useState } from "react";
import { Button, FormGroup, InlineValuePopover, Input, Select } from "../..";

const InlineValuePopoverStories = {
    title: "Forms & Fields/Inline Selector",
    component: InlineValuePopover,
};

export const Default = () => {
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
                text={text}
                isOpen={isOpen}
                classNames={{ text: "text-blue" }}
                onClick={() => setIsOpen(!isOpen)}
                onClickOutside={() => setIsOpen(!isOpen)}
            >
                <form onSubmit={handleSubmit}>
                    <FormGroup className="flex flex-row space-x-2 !m-0">
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
