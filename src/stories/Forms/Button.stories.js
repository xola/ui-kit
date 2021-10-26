import React from "react";
import { Button, EllipsisIcon, KeyIcon, PlusIcon, UserIcon, WaitlistIcon, WarningIcon } from "../..";

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
        <div className="flex flex-col w-20 space-y-4">
            <Button {...props}>Default</Button>
            <Button color="primary" disabled {...props}>
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
            <code className="block mb-5 font-mono">Use variant=&quot;outline&quot;</code>
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
            <code className="block mb-5 font-mono">Use variant=&quot;link&quot;</code>
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
        <div className="space-y-4 w-full">
            <Button className="w-full">Default</Button>

            <Button icon={<UserIcon />} className="w-full">
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
