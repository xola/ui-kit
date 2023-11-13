import React from "react";
import { Counter } from "../..";

const CounterStories = {
    id: "Counter",
    title: "Data Display/Counters",
    component: Counter,
    parameters: {
        docs: {
            description: {
                component: "Component to show a simple count. In one color only for now",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=1962%3A67978",
        },
    },
};

export const Counters = {
    render: () => {
        return (
            <div className="space-x-4">
                <Counter>0</Counter>
                <Counter>10</Counter>
                <Counter>999</Counter>
            </div>
        );
    },
};

export default CounterStories;
