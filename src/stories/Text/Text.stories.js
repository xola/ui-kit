import React from "react";

export default {
    title: "Components/Text/Body Text",
};

export const Default = () => {
    return (
        <div className="flex flex-col space-y-4">
            <span class="text-xs">text-xs (10px)</span>
            <span class="text-sm">text-sm (12px)</span>
            <span class="text-base">text-base (14px)</span>
            <span class="text-md">text-md (16px)</span>
            <span class="text-lg">text-lg (18px)</span>
            <span class="text-xl">text-xl (21px)</span>
            <span class="text-2xl">text-2xl (24px)</span>
            <span class="text-3xl">text-3xl (38px)</span>
            <span class="text-4xl">text-4xl (42px)</span>
        </div>
    );
};
