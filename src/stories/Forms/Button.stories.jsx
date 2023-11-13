import React from "react";
import { Button, EllipsisIcon, KeyIcon, PlusIcon, UserIcon, WaitlistIcon, WarningIcon } from "../..";
import { buttonColors, buttonSizes } from "../../components/Buttons/Button";
import { disableFields, inlineRadio, tableDefault } from "../helpers";

const defaultArgTypes = {
    color: inlineRadio(Object.keys(buttonColors.standard).slice(1)),
    size: inlineRadio(Object.keys(buttonSizes)),
    variant: inlineRadio(Object.keys(buttonColors)),
    className: {
        control: "text",
        description: "Tailwind class names to override styling",
    },
    disabled: {
        control: "boolean",
    },
    iconPlacement: inlineRadio(["left", "right"], tableDefault("left")),
    ...disableFields(["as", "icon"]),
};

export default {
    title: "Forms & Fields/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: defaultArgTypes,
    args: {
        color: "primary",
        variant: "standard",
        size: "medium",
        disabled: false,
        children: "Primary Button",
    },
};

export const Primary = {
    args: {
        children: "Primary Button",
    },
};

export const Disabled = {
    args: {
        disabled: true,
        children: "Disabled Button",
    },
};

export const Secondary = {
    args: {
        ...Primary.args,
        color: "secondary",
        children: "Secondary Button",
    },
};

export const Colors = {
    render: (args) => {
        return (
            <div className="space-x-4">
                <Button {...args} color="primary">
                    Primary
                </Button>
                <Button {...args} color="secondary">
                    Secondary
                </Button>
                <Button {...args} color="success">
                    Success
                </Button>
                <Button {...args} color="warning">
                    Warning
                </Button>
                <Button {...args} color="caution">
                    Caution
                </Button>
                <Button {...args} color="danger">
                    Danger
                </Button>
            </div>
        );
    },
};

export const OutlineVariant = {
    argTypes: { ...disableFields(["color", "variant", "children"]) },
    render: (args) => {
        return (
            <div className="space-x-4">
                <Button {...args} variant="outline" color="primary">
                    Primary
                </Button>
                <Button {...args} variant="outline" color="secondary">
                    Secondary
                </Button>
                <Button {...args} variant="outline" color="success">
                    Success
                </Button>
                <Button {...args} variant="outline" color="warning">
                    Warning
                </Button>
                <Button {...args} variant="outline" color="caution">
                    Caution
                </Button>
                <Button {...args} variant="outline" color="danger">
                    Danger
                </Button>
            </div>
        );
    },
};

export const LinkVariant = {
    argTypes: { ...disableFields(["color", "variant", "children"]) },
    render: (args) => {
        return (
            <div className="space-x-4">
                <Button {...args} variant="link" color="primary">
                    Primary
                </Button>
                <Button {...args} variant="link" color="secondary">
                    Secondary
                </Button>
                <Button {...args} variant="link" color="success">
                    Success
                </Button>
                <Button {...args} variant="link" color="warning">
                    Warning
                </Button>
                <Button {...args} variant="link" color="caution">
                    Caution
                </Button>
                <Button {...args} variant="link" color="danger">
                    Danger
                </Button>
            </div>
        );
    },
};

export const AsLink = {
    render: (args) => {
        return (
            <Button {...args} as="a" href="https://xola.com" target="_blank" rel="noopener">
                Xola Website
            </Button>
        );
    },
};

export const FullWidth = () => {
    return (
        <div className="w-full space-y-4">
            <Button color="secondary" variant="outline" className="w-full">
                Default
            </Button>

            <Button color="secondary" variant="outline" icon={<UserIcon />} className="w-full">
                Icon
            </Button>
        </div>
    );
};

export const IconOnly = () => {
    return (
        <div className="space-x-6">
            <div className="py-3 font-mono">Most of our icon only buttons use the &quot;variant=outline&quot; prop</div>
            <Button variant="outline" color="secondary" size="tiny">
                <EllipsisIcon />
            </Button>

            <Button variant="outline" color="primary" size="small">
                <WaitlistIcon />
            </Button>

            <Button variant="outline" color="success" size="small">
                <PlusIcon />
            </Button>

            <Button variant="outline" color="warning" size="medium">
                <WarningIcon />
            </Button>

            <Button variant="outline" color="caution" size="medium">
                <KeyIcon />
            </Button>
        </div>
    );
};

export const Sizes = () => {
    return (
        <div className="space-x-4">
            <div className="py-3 font-mono">Tiny is only used with icons</div>
            <Button color="secondary" variant="outline" size="tiny">
                <EllipsisIcon />
            </Button>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    );
};
