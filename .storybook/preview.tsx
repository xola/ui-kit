import type { Preview } from "@storybook/react";
import React from "react";

import "../index.css";
import xola from "./xola";

const preview: Preview = {
    argTypes: {
        // // 👇 All stories expect a className arg
        // className: {
        //     control: "text",
        //     description: "Tailwind class names to override styling",
        // },
    },
    parameters: {
        docs: {
            theme: xola,
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            expanded: true,
            matchers: {
                text: /className/i,
                boolean: /isLoading|disabled|^should|^is/i,
            },
        },
        options: {
            storySort: {
                method: "alphabetical",
                order: ["Introduction", "Components"],
                includeName: true,
            },
        },
    },
};

export default preview;

// https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
