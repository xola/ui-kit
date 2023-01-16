import React from "react";
import { Provider } from "../src";
import xola from "./xola";
import "../index.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    docs: {
        theme: xola,
    },
    options: {
        storySort: {
            method: "alphabetical",
            order: ["Introduction", "Components"],
            includeName: true,
        },
    },
};

export const decorators = [
    (Story) => (
        <Provider>
            <Story />
        </Provider>
    ),
];
