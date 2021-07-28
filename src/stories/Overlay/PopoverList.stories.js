import React from "react";
import {
    Button,
    PopoverList,
    CalendarDayIcon,
    CalendarWeekIcon,
    CalendarMonthIcon,
    ProductIcon,
    EquipmentIcon,
    MoveIcon,
} from "../..";

const PopoverStories = {
    title: "Overlay/Popover List",
    component: PopoverList,
    args: {
        placement: "bottom",
    },
    argTypes: {},
};

export const Default = () => {
    const innerContent = <Button>Hover over me</Button>;
    const onClickItem = (event_, element) => {
        console.log("Clicked on", event_, element);
    };

    return (
        <PopoverList innerContent={innerContent}>
            <PopoverList.Item name="list" onClickItem={onClickItem}>
                <MoveIcon /> <span>List</span>
            </PopoverList.Item>
            <PopoverList.Item name="day" onClickItem={onClickItem}>
                <CalendarDayIcon /> <span>Day</span>
            </PopoverList.Item>
            <PopoverList.Item name="week" onClickItem={onClickItem}>
                <CalendarWeekIcon /> <span>Week</span>
            </PopoverList.Item>
            <PopoverList.Item name="month" onClickItem={onClickItem}>
                <CalendarMonthIcon /> <span>Month</span>
            </PopoverList.Item>
            <PopoverList.Item name="product" onClickItem={onClickItem}>
                <ProductIcon /> <span>Product</span>
            </PopoverList.Item>
            <PopoverList.Item name="equipment" onClickItem={onClickItem}>
                <EquipmentIcon /> <span>Equipment</span>
            </PopoverList.Item>
        </PopoverList>
    );
};

export default PopoverStories;
