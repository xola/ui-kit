import React, { useState } from "react";
import { SubmitButton } from "../..";
import { sizeParams } from "../helpers";

const SubmitButtonStories = {
    title: "Forms & Fields/Buttons/Submit Button",
    component: SubmitButton,
    args: {
        isLoading: false,
        size: "medium",
        color: "primary",
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            table: {
                defaultValue: { summary: false },
            },
        },
        size: sizeParams,
        color: {
            options: ["primary", "secondary", "success", "warning", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
    },
};

export const Default = ({ isLoading, ...rest }) => {
    const [showLoading, setShowLoading] = useState(isLoading);
    const [showSuccess, setShowSuccess] = useState(false);

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
