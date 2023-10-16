import React from "react";
import { Skeleton } from "../..";

const SkeletonStories = {
    title: "Data Display/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return <Skeleton>Loading...</Skeleton>;
};

export const WithoutAnimation = () => {
    return (
        <Skeleton classes={{ container: "w-1/2" }} shouldAnimate={false}>
            Not Available
        </Skeleton>
    );
};

export default SkeletonStories;
