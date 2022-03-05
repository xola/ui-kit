import React from "react";
import twConfig from "../../../tailwind.config";
import ReactJson from "react-json-view";

const ConfigStories = {
    title: "Configuration/UI Kit Raw Config",
};

export const UIKitRawConfig = () => {
    // return <pre className="text-sm">{JSON.stringify(twConfig.theme, null, 4)}</pre>;
    return (
        <div>
            <div className="mb-4">
                This is the prettified version of <span className="font-mono">tailwind.config.js</span> file
            </div>
            <ReactJson
                src={twConfig.theme}
                name="./tailwind.config.js"
                quotesOnKeys={false}
                enableClipboard={false}
                displayDataTypes={false}
                style={{ fontSize: "10px", fontFamily: twConfig.theme.extend.fontFamily.mono }}
            />
        </div>
    );
};

export default ConfigStories;
