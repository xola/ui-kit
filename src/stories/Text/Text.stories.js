import React from "react";

export default {
    title: "Components/Text/Body Text",
};

export const Default = () => {
    return (
        <div className="flex flex-col space-y-4">
            <span className="text-xs">text-xs (10px)</span>
            <span className="text-sm">text-sm (12px)</span>
            <span className="text-base">text-base (14px)</span>
            <span className="text-md">text-md (16px)</span>
            <span className="text-lg">text-lg (18px)</span>
            <span className="text-xl">text-xl (21px)</span>
            <span className="text-2xl">text-2xl (24px)</span>
            <span className="text-3xl">text-3xl (38px)</span>
            <span className="text-4xl">text-4xl (42px)</span>
        </div>
    );
};
