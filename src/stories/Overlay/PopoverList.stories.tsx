// @ts-nocheck
import React, { useState } from "react";
import { Button, CalendarDayIcon, CalendarMonthIcon, CalendarWeekIcon, MenuIcon, PopoverList } from "../..";

const PopoverStories = {
    id: "PopoverList",
    title: "Overlay/Popover List",
    component: PopoverList,
    args: {
        placement: "bottom",
        trigger: "mouseenter",
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
        trigger: {
            type: { required: false },
            description: "One or multiple values to indicate what causes the tooltip to show up",
            control: { type: "select" },
            options: ["mouseenter", "click", "focus", "focusin", "manual"],
            table: {
                type: "select",
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
            <PopoverList offset={[0, 18]} visible={visible} onClickOutside={hide}>
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

export const NoIcons = (props) => {
    const onClickItem = (event_, element) => console.log("Clicked on", event_, element);
    return (
        <div className="h-32">
            <PopoverList offset={[0, 18]} {...props}>
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
            <PopoverList
                className="max-h-96 w-75 overflow-y-auto"
                offset={[0, 18]}
                visible={visible}
                onClickOutside={hide}
            >
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

export default PopoverStories;
