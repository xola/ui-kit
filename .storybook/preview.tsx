import React from "react";
import type { Preview } from "@storybook/react-vite";
import { Provider } from "../src";
import xola from "./xola";
import "../index.css";

const preview: Preview = {
    parameters: {
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
    },
    decorators: [
        (Story) => (
            <Provider>
                <Story />
            </Provider>
        ),
    ],
};

export default preview;
