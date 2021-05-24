import React, { useState } from "react";
import { Tabs } from "..";

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
        className: {
            description: "Classnames that should be applied to the tab *container*",
            control: { type: "text" },
            table: {
                type: { summary: "e.g. bg-blue-light" },
            },
        },
    },
};

export const Default = ({ className }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} className={className}>
            <Tabs.Tab>Seller Details</Tabs.Tab>
            <Tabs.Panel>Seller Details Content</Tabs.Panel>
            <Tabs.Tab>More Stats</Tabs.Tab>
            <Tabs.Panel>More Stats Content</Tabs.Panel>
            <Tabs.Tab>Invoices</Tabs.Tab>
            <Tabs.Panel>Invoices Content</Tabs.Panel>
            <Tabs.Tab>App Store</Tabs.Tab>
            <Tabs.Tab>Admin Tools</Tabs.Tab>
        </Tabs>
    );
};
