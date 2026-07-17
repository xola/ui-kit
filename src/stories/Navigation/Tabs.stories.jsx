import React, { useState } from "react";
import { expect } from "storybook/test";
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
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=3355%3A127055",
        },
    },
    args: {
        variant: "default",
        isHidden: false,
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
        isHidden: {
            description: "Show or hide a tab. This is specific to Tabs.Tab only",
            control: { type: "boolean" },
        },
    },
};

export const Default = ({ className, variant, isHidden }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs variant={variant} value={activeTab} className={className} onChange={(value) => setActiveTab(value)}>
            <Tabs.Tab>Seller Details</Tabs.Tab>
            <Tabs.Panel>Seller Details Content</Tabs.Panel>

            <Tabs.Tab isHidden={isHidden}>More Stats</Tabs.Tab>
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

Default.play = async ({ canvas, userEvent }) => {
    // Only the active panel is rendered
    await expect(canvas.getByText("Seller Details Content")).toBeInTheDocument();
    // isHidden tab is not rendered
    await expect(canvas.queryByText("Admin Tools")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByText("Invoices"));
    await expect(canvas.getByText("Invoices Content")).toBeInTheDocument();
    await expect(canvas.queryByText("Seller Details Content")).not.toBeInTheDocument();
};

export const Simple = ({ className }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="my-6">This is used in the Admin app</div>
            <Tabs variant="simple" value={activeTab} className={className} onChange={(value) => setActiveTab(value)}>
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
        </div>
    );
};

Simple.play = async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Seller Details Content")).toBeInTheDocument();
    await userEvent.click(canvas.getByText("App Store"));
    await expect(canvas.getByText("App Store Content")).toBeInTheDocument();
};

export default TabsStories;
