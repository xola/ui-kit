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

/**
 * `parameters.hasProvider: false` renders a story without ui-kit's Provider, for components that must work outside it.
 */
const withProvider = (Story, { parameters }) => {
    const { hasProvider = true } = parameters;

    return hasProvider ? (
        <Provider>
            <Story />
        </Provider>
    ) : (
        <Story />
    );
};

export const decorators = [withProvider];
