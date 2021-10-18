import React from "react";
import { Button2, EllipsisIcon, KeyIcon, PlusIcon, UserIcon, WaitlistIcon, WarningIcon } from "../..";

const Button2Stories = {
    title: "Forms & Fields/Button2",
    component: Button2,
    args: {
        as: "button",
        size: "medium",
        color: "primary",
    },
    argTypes: {
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

export const Everything = (props) => {
    return (
        <div className="mt-3 max-w-3xl">
            <div className="space-x-2">
                <Button2 color="primary" size="small">
                    Primary
                </Button2>
                <Button2 color="secondary" size="medium">
                    Secondary
                </Button2>
                <Button2 color="success" size="large">
                    Success
                </Button2>
                <Button2 color="warning" size="large">
                    Warning
                </Button2>
                <Button2 color="caution" size="medium">
                    Caution
                </Button2>
                <Button2 color="danger" size="small">
                    Danger
                </Button2>
            </div>
            <div className="my-4 space-y-4">
                <h3>Variants</h3>
                <h4>Outline</h4>
                <Button2 color="default" variant="outline" size="small">
                    color="default"?
                </Button2>
                <div className="space-x-2">
                    <Button2 color="primary" variant="outline" size="small">
                        Primary
                    </Button2>
                    <Button2 color="secondary" variant="outline" size="medium">
                        Secondary
                    </Button2>
                    <Button2 color="success" variant="outline" size="large">
                        Success
                    </Button2>
                    <Button2 color="warning" variant="outline" size="large">
                        Warning
                    </Button2>
                    <Button2 color="caution" variant="outline" size="medium">
                        Caution
                    </Button2>
                    <Button2 color="danger" variant="outline" size="small">
                        Danger
                    </Button2>
                </div>
                <h4>Links</h4>
                <div className="space-x-2">
                    <Button2 color="primary" variant="link" size="small">
                        Primary
                    </Button2>
                    <Button2 color="secondary" variant="link" size="medium">
                        Secondary
                    </Button2>
                    <Button2 color="success" variant="link" size="large">
                        Success
                    </Button2>
                    <Button2 color="warning" variant="link" size="large">
                        Warning
                    </Button2>
                    <Button2 color="caution" variant="link" size="medium">
                        Caution
                    </Button2>
                    <Button2 color="danger" variant="link" size="small">
                        Danger
                    </Button2>
                </div>
            </div>
            <div className="my-4 space-y-6">
                <h3>Icons</h3>
                <div className="space-x-2">
                    <Button2 color="primary" size="tiny">
                        <EllipsisIcon />
                    </Button2>
                    <Button2 color="secondary" size="small">
                        <KeyIcon />
                    </Button2>
                    <Button2 color="success" size="medium">
                        <PlusIcon size="medium" />
                    </Button2>
                    <Button2 color="warning" size="large">
                        <UserIcon size="large" />
                    </Button2>
                    <Button2 color="caution" size="medium">
                        <WaitlistIcon />
                    </Button2>
                    <Button2 color="danger" size="small">
                        <WarningIcon />
                    </Button2>
                </div>
                <div className="space-x-2">
                    <Button2 color="primary" variant="outline" size="tiny">
                        <EllipsisIcon />
                    </Button2>
                    <Button2 color="secondary" variant="outline" size="small">
                        <KeyIcon />
                    </Button2>
                    <Button2 color="success" variant="outline" size="medium">
                        <PlusIcon size="medium" />
                    </Button2>
                    <Button2 color="warning" variant="outline" size="large">
                        <UserIcon size="large" />
                    </Button2>
                    <Button2 color="caution" variant="outline" size="medium">
                        <WaitlistIcon />
                    </Button2>
                    <Button2 color="danger" variant="outline" size="small">
                        <WarningIcon />
                    </Button2>
                </div>
            </div>
        </div>
    );
};

export default Button2Stories;
