import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { theme } from "../../theme";

const ConfigStories = {
    title: "Configuration/UI Kit Raw Config",
};

export const UIKitRawConfig = () => {
    return (
        <div>
            <div className="mb-4">
                This is the prettified version of <span className="font-mono">tailwind.config.js</span> file
            </div>
            <JsonView src={theme} collapsed={2} />
        </div>
    );
};

export default ConfigStories;
