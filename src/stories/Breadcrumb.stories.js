import React from "react";
import { Breadcrumb } from "..";

const BreadcrumbStories = {
    title: "Basic/Breadcrumb",
    component: Breadcrumb,
    parameters: {
        docs: {
            description: {
                component: "Breadcrumbs are generally used by Xola in the header",
            },
        },
    },
    args: {
        spacing: 2,
        separator: "/",
    },
    argTypes: {
        spacing: {
            description: "Spacing between elements",
            control: { type: "number" },
            table: {
                defaultValue: { summary: 2 },
                type: { summary: null },
            },
        },
        separator: {
            description: "The string that separates the items",
            control: { type: "text" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "/" },
            },
        },
    },
};

export const Default = ({ spacing, separator }) => {
    return (
        <div className="space-x-6">
            <Breadcrumb spacing={spacing} separator={separator}>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>Preferences</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export const MultipleLevels = () => {
    return (
        <div className="space-x-6">
            <Breadcrumb spacing={3} separator="/">
                <Breadcrumb.Item className="text-2xl">Settings</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Preferences</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Gifts</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbStories;
