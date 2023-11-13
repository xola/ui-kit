import { Skeleton } from "../..";

const SkeletonStories = {
    title: "Data Display/Skeleton",
    component: Skeleton,
};

export const Default = {
    args: { children: "Loading..." },
};

export const WithoutAnimation = {
    args: {
        classes: { container: "w-1/2" },
        children: "Not Available",
        shouldAnimate: true,
    },
};

export default SkeletonStories;
