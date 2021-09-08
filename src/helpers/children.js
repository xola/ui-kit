import { Children } from "react";

export const getChildrenByType = (children, type) => {
    return Children.toArray(children).filter((child) => child.type === type);
};

export const getChildByType = (children, type) => {
    return Children.toArray(children).find((child) => child.type === type) ?? null;
};
