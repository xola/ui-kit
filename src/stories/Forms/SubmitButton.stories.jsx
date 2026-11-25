import React, { useRef, useState } from "react";
import { expect, userEvent, waitFor } from "storybook/test";
import { Button, SubmitButton } from "../..";
import { hasFormStatus } from "../../helpers/reactFeatures";

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

/**
 * Leaves isLoading unset so the form status drives the loading state. Without form actions (React 18)
 * the form submits through onSubmit, since a function `action` is not valid there.
 */
export const WithFormAction = () => {
    const releaseRef = useRef();

    const handleAction = async () => {
        await new Promise((resolve) => {
            releaseRef.current = resolve;
        });
    };

    const handleSubmit = (event) => event.preventDefault();
    const handleRelease = () => releaseRef.current?.();
    const formProps = hasFormStatus ? { action: handleAction } : { onSubmit: handleSubmit };

    return (
        <div className="space-x-4">
            <form className="inline-block" {...formProps}>
                <SubmitButton>Submit</SubmitButton>
            </form>
            <Button type="button" onClick={handleRelease}>
                Release
            </Button>
        </div>
    );
};

WithFormAction.play = async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });
    await userEvent.click(button);

    if (!hasFormStatus) {
        await expect(button).not.toBeDisabled();
        await expect(button.querySelector(".ui-spinner")).not.toBeInTheDocument();
        return;
    }

    await waitFor(() => expect(button).toBeDisabled());
    await expect(button.querySelector(".ui-spinner")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Release" }));

    await waitFor(() => expect(button).not.toBeDisabled());
    await expect(button.querySelector(".ui-spinner")).not.toBeInTheDocument();
};

export default SubmitButtonStories;
