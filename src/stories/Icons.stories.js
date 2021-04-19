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
                <div className="border border-gray-lighter p-2 rounded" key={index}>
                    <div className="inline-block mr-2">
                        <Icon />
                    </div>

                    <span className="text-gray">{Icon.displayName}</span>
                </div>
            ))}
        </div>
    );
};
