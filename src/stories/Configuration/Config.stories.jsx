import React from "react";
// import JsonView from "react18-json-view";
// import "react18-json-view/src/style.css";
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
            <pre>{JSON.stringify(theme, null, 2)}</pre>
            {/*<JsonView*/}
            {/*    src={theme}*/}
            {/*    collapsed={2}*/}
            {/*    enableClipboard={false}*/}
            {/*    style={{ fontSize: "12px", fontFamily: theme.extend.fontFamily.mono }}*/}
            {/*/>*/}
        </div>
    );
};

export default ConfigStories;
