import React from "react";
import { Skeleton } from "..";

export default {
    title: "Components/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return <Skeleton>Loading...</Skeleton>;
};

export const WithoutAnimation = () => {
    return (
        <Skeleton className="w-1/2" animate={false}>
            Not Available
        </Skeleton>
    );
};
