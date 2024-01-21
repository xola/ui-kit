import React from "react";
import { Breadcrumb } from "../..";

const BreadcrumbStories = {
    title: "Navigation/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    args: {
        separator: "/",
    },
};

export const Default = ({ separator }) => {
    return (
        <div className="space-x-6">
            <Breadcrumb separator={separator}>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>Preferences</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export const MultipleLevels = () => {
    return (
        <div className="space-x-6">
            <Breadcrumb separator="/">
                <Breadcrumb.Item className="text-2xl">Settings</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Preferences</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Gifts</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbStories;
