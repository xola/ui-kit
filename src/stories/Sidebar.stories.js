import React from "react";
import { Sidebar } from "..";

export default {
    title: "Sidebar",
};

export const Default = () => {
    const items = [
        {
            label: "Home",
            name: "home",
            linkTo: "/home",
        },
        {
            label: "Schedules",
            name: "schedules",
            linkTo: "/schedules",
        },
        {
            label: "Collections",
            name: "collections",
            linkTo: "/schedules",
        },
        {
            label: "Groups",
            name: "groups",
            linkTo: "/schedules",
        },
        {
            label: "Equipment Management",
            name: "/equipment",
            linkTo: "/schedules",
        },
    ];
    let currentRoute = "groups";
    return <Sidebar items={items} width={230} currentRoute={currentRoute} onClick={(item) => alert(item.linkTo)} />;
};

export const WithPage = () => {
    const items = [
        {
            label: "Home",
        },
        {
            label: "Schedules",
        },
        {
            label: "Collections",
        },
        {
            label: "Groups",
        },
        {
            label: "Equipment & Inventory Management",
        },
    ];
    return (
        <div style={{ width: "100%", height: "4000px" }}>
            <Sidebar items={items}></Sidebar>
            <div style={{ paddingLeft: "200px" }}>
                <h3>Welcome to react</h3>
                <p>This is a really long page</p>
            </div>
        </div>
    );
};
