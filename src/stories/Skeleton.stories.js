import React from "react";
import { Skeleton } from "..";

export default {
    title: "Components/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return (
        <div className="space-x-4">
            <Skeleton width="w-1/2">Loading...</Skeleton>
        </div>
    );
};
