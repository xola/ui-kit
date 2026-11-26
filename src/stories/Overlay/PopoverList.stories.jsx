import React, { useState } from "react";
import { expect, within } from "storybook/test";
import { Button, PopoverList } from "../..";
import { CalendarDayIcon, CalendarMonthIcon, CalendarWeekIcon, MenuIcon } from "../../icons";

const PopoverStories = {
    id: "PopoverList",
    title: "Overlay/Popover List",
    component: PopoverList,
    args: {
        placement: "bottom",
        openOn: "hover",
    },
    argTypes: {
        placement: {
            type: { required: false },
            description: "The direction to show the popover",
            control: { type: "select" },
            options: ["top", "bottom", "left", "right", "auto"],
            table: {
                type: "string",
                defaultValue: { summary: "bottom" },
            },
        },
        openOn: {
            type: { required: false },
            description: "What opens the popover: hovering or focusing the target, or clicking it",
            control: { type: "inline-radio" },
            options: ["hover", "click"],
            table: {
                type: "string",
                defaultValue: { summary: "hover" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Render a list of items with icons in the Popover. All other arguments are not documented here because they are same as **Popover**",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=220%3A189753",
        },
    },
};

export const Default = () => {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const onClickItem = (event_, element) => {
        console.log("Clicked on", event_, element);
        setVisible(false);
    };

    return (
        <div className="h-64">
            <PopoverList distance={18} open={visible} onClickOutside={hide}>
                <Button onClick={visible ? hide : show}>Hover over me</Button>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    <MenuIcon />
                    <span>List</span>
                </PopoverList.Item>
                <PopoverList.Item isActive name="day" onClickItem={onClickItem}>
                    <CalendarDayIcon />
                    <span>Day</span>
                </PopoverList.Item>
                <PopoverList.Item name="week" onClickItem={onClickItem}>
                    <CalendarWeekIcon />
                    <span>Week</span>
                </PopoverList.Item>
                <PopoverList.Item name="month" onClickItem={onClickItem}>
                    <CalendarMonthIcon />
                    <span>Month</span>
                </PopoverList.Item>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    <MenuIcon />
                    <span>List</span>
                </PopoverList.Item>
                <PopoverList.Item isActive name="day" onClickItem={onClickItem}>
                    <CalendarDayIcon />
                    <span>Day</span>
                </PopoverList.Item>
                <PopoverList.Item name="week" onClickItem={onClickItem}>
                    <CalendarWeekIcon />
                    <span>Week</span>
                </PopoverList.Item>
                <PopoverList.Item name="month" onClickItem={onClickItem}>
                    <CalendarMonthIcon />
                    <span>Month</span>
                </PopoverList.Item>
            </PopoverList>
        </div>
    );
};

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Hover over me" }));
    const months = await body.findAllByText("Month");
    await expect(months.length).toBeGreaterThan(0);

    // Only the first item rounds its top corners and only the last its bottom ones
    const items = [...canvasElement.ownerDocument.querySelectorAll(".ui-popover-list-item")];
    await expect(items).toHaveLength(8);
    await expect(items[0]).toHaveClass("rounded-t-lg");
    await expect(items[0]).not.toHaveClass("rounded-b-lg");
    await expect(items[7]).toHaveClass("rounded-b-lg");
    await expect(items[7]).not.toHaveClass("rounded-t-lg");
    items.slice(1, 7).forEach((item) => {
        expect(item).not.toHaveClass("rounded-t-lg");
        expect(item).not.toHaveClass("rounded-b-lg");
    });
};

export const NoIcons = (props) => {
    const onClickItem = (event_, element) => console.log("Clicked on", event_, element);
    return (
        <div className="h-32">
            <PopoverList distance={18} {...props}>
                <Button>Hover over me</Button>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    Listing
                </PopoverList.Item>
                <PopoverList.Item name="guides" onClickItem={onClickItem}>
                    Guides
                </PopoverList.Item>
            </PopoverList>
        </div>
    );
};

NoIcons.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByRole("button", { name: "Hover over me" }));
    await expect(await body.findByText("Listing")).toBeInTheDocument();
    await expect(body.getByText("Guides")).toBeInTheDocument();
};

export const Scrollable = () => {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const onClickItem = (event_, element) => {
        console.log("Clicked on", event_, element);
        setVisible(false);
    };

    return (
        <div className="h-64">
            <PopoverList className="max-h-96 w-75 overflow-y-auto" distance={18} open={visible} onClickOutside={hide}>
                <Button onClick={visible ? hide : show}>Click here</Button>
                <PopoverList.Item name="item1" onClickItem={onClickItem}>
                    Item 1
                </PopoverList.Item>
                <PopoverList.Item name="item2" onClickItem={onClickItem}>
                    Item 2
                </PopoverList.Item>
                <PopoverList.Item name="item3" onClickItem={onClickItem}>
                    Item 3
                </PopoverList.Item>
                <PopoverList.Item name="item4" onClickItem={onClickItem}>
                    Item 4
                </PopoverList.Item>
                <PopoverList.Item name="item5" onClickItem={onClickItem}>
                    Item 5
                </PopoverList.Item>
                <PopoverList.Item name="item6" onClickItem={onClickItem}>
                    Item 6
                </PopoverList.Item>
                <PopoverList.Item name="item7" onClickItem={onClickItem}>
                    Item 7
                </PopoverList.Item>
                <PopoverList.Item name="item8" onClickItem={onClickItem}>
                    Item 8
                </PopoverList.Item>
                <PopoverList.Item name="item9" onClickItem={onClickItem}>
                    Item 9
                </PopoverList.Item>
                <PopoverList.Item name="item10" onClickItem={onClickItem}>
                    Item 10
                </PopoverList.Item>
            </PopoverList>
        </div>
    );
};

Scrollable.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Click here" }));
    await expect(await body.findByText("Item 1")).toBeInTheDocument();

    // className lands on the popover box and wins over the list's default width
    const box = body.getByText("Item 1").closest(".ui-popover-list");
    await expect(box).toHaveClass("ui-popover", "max-h-96", "w-75", "overflow-y-auto");
    await expect(box).not.toHaveClass("w-40");
};

export const PassThroughProps = () => {
    const onClickItem = (event_, element) => console.log("Clicked on", event_, element);

    return (
        <PopoverList open data-testid="popover-list-test-id">
            <Button>Pass-through target</Button>
            <PopoverList.Item name="only" onClickItem={onClickItem}>
                Only item
            </PopoverList.Item>
        </PopoverList>
    );
};

PassThroughProps.play = async ({ canvasElement }) => {
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const item = await body.findByText("Only item");

    await expect(item).toHaveClass("rounded-t-lg", "rounded-b-lg");
    await expect(ownerDocument.querySelector("[data-testid='popover-list-test-id']")).toBeNull();
};

export default PopoverStories;
