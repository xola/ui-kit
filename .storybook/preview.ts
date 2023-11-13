import type { Preview } from "@storybook/react";

import "../index.css";
import xola from "./xola";

const preview: Preview = {
    // argTypes: {
    // // 👇 All stories expect a className arg
    // className: {
    //     control: "text",
    //     description: "Tailwind class names to override styling",
    // },
    // },
    parameters: {
        docs: {
            toc: true,
            theme: xola,
        },
        actions: { argTypesRegex: "^on.*" },
        controls: {
            matchers: {
                text: /^className$/i,
                bool: /isLoading|disabled|^should|^is/i,
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
