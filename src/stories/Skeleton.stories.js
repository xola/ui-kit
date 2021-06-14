import React from "react";
import { Skeleton } from "..";

const SkeletonStories = {
    title: "Components/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return <Skeleton>Loading...</Skeleton>;
};

export const WithoutAnimation = () => {
    return (
        <Skeleton className="w-1/2" shouldAnimate={false}>
            Not Available
        </Skeleton>
    );
};

export default SkeletonStories;
