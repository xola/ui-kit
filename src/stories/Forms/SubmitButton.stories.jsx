import React, { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { SubmitButton } from "../..";

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
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
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

Default.play = async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(6);
    await expect(canvas.getAllByText("Submit")).toHaveLength(3);
};

export const Loading = (props) => {
    return <SubmitButton {...props}>Submit</SubmitButton>;
};

Loading.args = {
    isLoading: true,
};

Loading.play = async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });
    await expect(button).toBeDisabled();
    await expect(button.querySelector(".ui-spinner")).toBeInTheDocument();
};

export const Success = (props) => {
    return <SubmitButton {...props}>Submit</SubmitButton>;
};

Success.args = {
    isSuccess: true,
};

Success.play = async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });
    await waitFor(() => expect(button.querySelector("svg:not(.ui-spinner)")).toBeInTheDocument());
    await expect(button.querySelector(".ui-spinner")).not.toBeInTheDocument();
    await expect(button).toBeDisabled();
};

export default SubmitButtonStories;
