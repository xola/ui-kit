import React, { useEffect, useState } from "react";
import { SubmitButton } from "../..";
import ButtonStories from "./Button.stories";

const SubmitButtonStories = {
    title: "Forms & Fields/Submit Button",
    component: SubmitButton,
    tags: ["autodocs"],
    args: {
        isLoading: false,
        isSuccess: false,
        size: "medium",
        color: "primary",
        variant: "standard",
    },
    argTypes: {
        ...ButtonStories.argTypes,
        isLoading: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
    },
};

export const Default = ({ isLoading, ...rest }) => {
    const [showLoading, setShowLoading] = useState(isLoading);
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => setShowLoading(isLoading), [isLoading]);

    const handleClick = () => {
        setShowLoading(!showLoading);
        setTimeout(() => {
            setShowSuccess(true);
            setShowLoading(false);
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <div className="space-x-4">
                <SubmitButton isLoading={showLoading} isSuccess={showSuccess} {...rest} onClick={handleClick}>
                    Submit
                </SubmitButton>

                <SubmitButton isLoading={showLoading} isSuccess={showSuccess} {...rest} onClick={handleClick}>
                    Button with really long text
                </SubmitButton>
            </div>
            <div className="space-x-4">
                <SubmitButton
                    {...rest}
                    color="success"
                    isLoading={showLoading}
                    isSuccess={showSuccess}
                    onClick={handleClick}
                >
                    Submit
                </SubmitButton>

                <SubmitButton
                    {...rest}
                    color="success"
                    isSuccess={showSuccess}
                    isLoading={showLoading}
                    onClick={handleClick}
                >
                    Button with really long text
                </SubmitButton>
            </div>
            <div className="space-x-4">
                <SubmitButton
                    {...rest}
                    isSuccess={showSuccess}
                    color="danger"
                    isLoading={showLoading}
                    onClick={handleClick}
                >
                    Submit
                </SubmitButton>

                <SubmitButton
                    {...rest}
                    isSuccess={showSuccess}
                    color="danger"
                    isLoading={showLoading}
                    onClick={handleClick}
                >
                    Button with really long text
                </SubmitButton>
            </div>
        </div>
    );
};

export default SubmitButtonStories;
