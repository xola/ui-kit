import React from "react";
import { Skeleton, SkeletonGrid, SkeletonIcon, ImageIcon, BarGraphIcon, MountainIcon } from "../..";

const SkeletonStories = {
    title: "Data Display/Skeleton",
    component: Skeleton,
};

export const Default = () => {
    return (
        <div className="h-75 w-full space-y-4">
            <p>
                Parent div set with <code>w-full</code> and <code>h-75</code> (300px). No children specified so text
                defaults to "Loading..."
            </p>
            <Skeleton />
        </div>
    );
};
export const CustomHeight = () => {
    return (
        <Skeleton height="h-40">
            Height given directly to Skeleton using <code className="mx-1">height</code> attribute
        </Skeleton>
    );
};

export const MultipleSkeletons = () => {
    return (
        <div className="space-y-5">
            <p>Quickly create multiple Skeleton children</p>
            <div className="space-y-2">
                <p>
                    A grid of <code>3x2</code> by passing in <code>grid=&#123;[3x2]&#125;</code>
                </p>
                <SkeletonGrid grid={[3, 2]} />
            </div>
            <div className="space-y-2">
                <p>
                    A grid of <code>2x4</code> by passing in <code>grid=&#123;[2x4]&#125;</code>
                </p>
                <SkeletonGrid grid={[2, 4]} />
            </div>
        </div>
    );
};

export const WithIcons = () => {
    return (
        <div className="flex flex-row space-x-10 text-gray-dark ">
            <div>
                Generic Image
                <SkeletonIcon icon={<ImageIcon />} />
            </div>
            <div>
                Experience Image
                <SkeletonIcon icon={<MountainIcon />} />
            </div>
            <div>
                Bar Graph
                <SkeletonIcon icon={<BarGraphIcon />} />
            </div>
        </div>
    );
};

export default SkeletonStories;
