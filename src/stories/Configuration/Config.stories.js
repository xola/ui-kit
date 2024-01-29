import React from "react";
import ReactJson from "react-json-view";
import twConfig from "../../../tailwind.config";

const ConfigStories = {
    title: "Configuration/UI Kit Raw Config",
};

export const UIKitRawConfig = () => {
    const { theme } = twConfig;
    return (
        <div>
            <div className="mb-4">
                This is the prettified version of <span className="font-mono">tailwind.config.js</span> file
            </div>
            <ReactJson
                src={theme}
                name={false}
                quotesOnKeys={false}
                collapsed={2}
                enableClipboard={false}
                displayDataTypes={false}
                style={{ fontSize: "12px", fontFamily: theme.extend.fontFamily.mono }}
            />
        </div>
    );
};

export default ConfigStories;
