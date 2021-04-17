import React from "react";
import { Search } from "..";

export default {
    title: "Search",
    component: Search,
    parameters: {
        docs: {
            description: {
                component: "The ultimate search box",
            },
        },
    },
};

export const Default = () => {
    return <Search />;
};
