import { random } from "lodash";
import React, { useState } from "react";
import { Button, FormGroup, InlineSelector, Input, Select } from "../..";

const InlineSelectorStories = {
    title: "Forms & Fields/Inline Selector",
    component: InlineSelector,
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
            <InlineSelector text={text} isOpen={isOpen} className="text-blue" onClick={() => setIsOpen(!isOpen)}>
                <form onSubmit={handleSubmit}>
                    <FormGroup className="flex flex-row space-x-2">
                        <Input />
                        <Select>
                            <option value="hours">hours</option>
                            <option value="minutes">minutes</option>
                        </Select>
                        <Button>Apply</Button>
                    </FormGroup>
                </form>
            </InlineSelector>
        </div>
    );
};

export default InlineSelectorStories;
