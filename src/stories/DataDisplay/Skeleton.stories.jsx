import React from "react";
import { expect } from "storybook/test";
import { Skeleton } from "../..";

const SkeletonStories = {
    title: "Data Display/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return <Skeleton>Loading...</Skeleton>;
};

Default.play = async ({ canvas }) => {
    await expect(canvas.getByText("Loading...")).toBeInTheDocument();
};

export const WithoutAnimation = () => {
    return (
        <Skeleton classes={{ container: "w-1/2" }} shouldAnimate={false}>
            Not Available
        </Skeleton>
    );
};

WithoutAnimation.play = async ({ canvas }) => {
    await expect(canvas.getByText("Not Available")).toBeInTheDocument();
};

export default SkeletonStories;
