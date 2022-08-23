import { capitalize } from "lodash";
import React from "react";
import { Button, CheckIcon, EllipsisIcon, PlusIcon, UserIcon } from "../..";

const ButtonStories = {
    title: "Forms & Fields/Buttons/Button",
    component: Button,
    args: {
        as: "button",
        size: "medium",
        color: "primary",
        variant: "standard",
    },
    argTypes: {
        size: {
            options: ["tiny", "small", "medium", "large"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "medium" },
            },
        },
        color: {
            options: ["primary", "secondary", "success", "warning", "caution", "danger"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "primary" },
            },
        },
        variant: {
            options: ["standard", "outline", "link"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "standard" },
            },
        },
    },
};

export const Default = (props) => {
    return (
        <div className="flex w-20 flex-col space-y-4">
            <Button {...props}>Default</Button>
            <Button disabled color="primary" {...props}>
                Default
            </Button>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-x-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="caution">Caution</Button>
            <Button color="danger">Danger</Button>
        </div>
    );
};

export const OutlineVariant = () => {
    return (
        <div className="space-x-4">
            <code className="mb-5 block font-mono">Use variant=&quot;outline&quot;</code>
            <Button variant="outline" color="primary">
                Primary
            </Button>
            <Button variant="outline" color="secondary">
                Secondary
            </Button>
            <Button variant="outline" color="success">
                Success
            </Button>
            <Button variant="outline" color="warning">
                Warning
            </Button>
            <Button variant="outline" color="caution">
                Caution
            </Button>
            <Button variant="outline" color="danger">
                Danger
            </Button>
        </div>
    );
};

export const LinkVariant = () => {
    return (
        <div className="space-x-4">
            <code className="mb-5 block font-mono">Use variant=&quot;link&quot;</code>
            <Button variant="link" color="primary">
                Primary
            </Button>
            <Button variant="link" color="secondary">
                Secondary
            </Button>
            <Button variant="link" color="success">
                Success
            </Button>
            <Button variant="link" color="warning">
                Warning
            </Button>
            <Button variant="link" color="caution">
                Caution
            </Button>
            <Button variant="link" color="danger">
                Danger
            </Button>
        </div>
    );
};

export const States = () => {
    return <div className="space-x-4">TODO: Disabled &amp; Selected state</div>;
};

export const TextWithIcons = () => {
    return (
        <div className="space-x-4">
            <Button icon={<UserIcon />} size="medium">
                Medium
            </Button>

            <Button icon={<UserIcon />} iconPlacement="right" color="success" size="large">
                Large
            </Button>
        </div>
    );
};

export const AsLink = () => {
    return (
        <Button as="a" href="https://xola.com" target="_blank" rel="noopener" size="small">
            Xola Website
        </Button>
    );
};

export const FullWidth = () => {
    return (
        <div className="w-full space-y-4">
            <Button className="w-full">Default</Button>

            <Button icon={<UserIcon />} className="w-full">
                Icon
            </Button>
        </div>
    );
};

export const IconOnly = () => {
    const sizes = ["tiny", "small", "medium", "large"];
    return (
        <div className="space-y-6">
            <div className="py-3 font-mono">
                Most of our icon only buttons use the &quot;variant=outline&quot; prop.
            </div>
            {sizes.map((size) => {
                return (
                    <div className="space-y-2">
                        <div>{capitalize(size)}</div>
                        <div className="grid w-50 grid-flow-col">
                            <Button variant="outline" color="secondary" size={size}>
                                <EllipsisIcon />
                            </Button>
                            <Button variant="outline" color="primary" size={size}>
                                <CheckIcon />
                            </Button>
                            <Button variant="outline" color="success" size={size}>
                                <PlusIcon />
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const Sizes = () => {
    return (
        <div className="space-x-4">
            <div className="py-3 font-mono">Tiny is only used with icons</div>
            <Button size="tiny">
                <EllipsisIcon />
            </Button>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>
    );
};

export default ButtonStories;
