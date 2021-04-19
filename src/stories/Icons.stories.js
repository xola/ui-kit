import React from "react";
import * as all from "..";
import _ from "lodash";

const icons = _.filter(all, (component, name) => name.endsWith("Icon"));

export default {
    title: "Icons",
};

export const Default = () => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {icons.map((Icon, index) => (
                <div className="border border-gray-lighter p-2 rounded text-center" key={index}>
                    <Icon className="inline-block w-10 h-10 mb-2" />
                    <div className="text-gray-dark">{Icon.displayName}</div>
                </div>
            ))}
        </div>
    );
};
