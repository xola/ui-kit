import React from "react";
import { Button, CalendarDayIcon, CalendarMonthIcon, CalendarWeekIcon, MoveIcon, PopoverList } from "../..";

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
            control: { type: "text" },
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
    },
};

export const Default = (props) => {
    const onClickItem = (event_, element) => console.log("Clicked on", event_, element);
    return (
        <div className="h-64">
            <PopoverList offset={[0, 18]} {...props}>
                <Button>Hover over me</Button>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    <MoveIcon />
                    <span>List</span>
                </PopoverList.Item>
                <PopoverList.Item name="day" onClickItem={onClickItem}>
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

export default PopoverStories;
