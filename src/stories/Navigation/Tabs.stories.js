import React, { useState } from "react";
import { Tabs } from "../..";

const TabsStories = {
    title: "Navigation/Tabs",
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component: "Tabbed interface to show different sections on select of a tab",
            },
        },
    },
    args: {
        variant: "default",
    },
    argTypes: {
        className: {
            description: "Classnames that should be applied to the tab *container*",
            control: { type: "text" },
            table: {
                type: { summary: "e.g. bg-blue-light" },
            },
        },
        variant: {
            options: ["default", "simple"],
            control: { type: "select" },
        },
    },
};

export const Default = ({ className, variant }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs variant={variant} value={activeTab} className={className} onChange={(value) => setActiveTab(value)}>
            <Tabs.Tab>Seller Details</Tabs.Tab>
            <Tabs.Panel>Seller Details Content</Tabs.Panel>

            <Tabs.Tab>More Stats</Tabs.Tab>
            <Tabs.Panel>More Stats Content</Tabs.Panel>

            <Tabs.Tab>Invoices</Tabs.Tab>
            <Tabs.Panel>Invoices Content</Tabs.Panel>

            <Tabs.Tab>App Store</Tabs.Tab>
            <Tabs.Panel>App Store Content</Tabs.Panel>

            <Tabs.Tab isHidden>Admin Tools</Tabs.Tab>
            <Tabs.Panel>Admin Tools Content</Tabs.Panel>
        </Tabs>
    );
};

export default TabsStories;
