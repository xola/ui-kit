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
    },
};

export const Counters = () => {
    return (
        <div className="space-x-4">
            <Counter>0</Counter>
            <Counter>10</Counter>
            <Counter>999</Counter>
        </div>
    );
};

export default CounterStories;
