import React from "react";
import { Tabs } from "..";

const onClick = (e) => {
    e.preventDefault(); // So that the href is not invoked
    console.log("Clicked", e.target);
};

const defaultOptions = [
    { name: "Seller Details", href: "#", current: true, onClick },
    { name: "More Stats", href: "#", current: false, onClick },
    { name: "Invoices", href: "#", current: false, onClick },
    { name: "App Store", href: "#", current: false, onClick },
    { name: "Admin Tools", href: "#", current: false, onClick },
];

export default {
    title: "Components/Tabs",
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component: "Tabbed interface to show different sections on select of a tab",
            },
        },
    },
    argTypes: {
        tabs: {
            description: "An array of objects where each object is one tab",
            control: { type: "object" },
            type: { required: true },
            defaultValue: defaultOptions,
        },
        className: {
            description: "Classnames that should be applied to the tab *container*",
            control: { type: "text" },
            table: {
                type: { summary: "e.g. bg-blue-light" },
            },
        },
        tabClassName: {
            description: "Classnames that should be applied to each *tab title*",
            control: { type: "text" },
            table: {
                type: { summary: "e.g. hover:text-primary" },
            },
        },
    },
};

export const Default = ({ tabs, className, tabClassName }) => {
    return <Tabs tabs={tabs} tabClassName={tabClassName} className={className} />;
};
