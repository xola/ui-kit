import { Children, ReactNode, ReactElement, JSXElementConstructor } from "react";

export const getChildrenByType = (
    children: ReactNode,
    type: JSXElementConstructor<any> | string,
): ReactElement[] => {
    return Children.toArray(children).filter(
        (child): child is ReactElement => (child as ReactElement).type === type,
    );
};

export const getChildByType = (
    children: ReactNode,
    type: JSXElementConstructor<any> | string,
): ReactElement | null => {
    return (
        (Children.toArray(children).find((child) => (child as ReactElement).type === type) as ReactElement) ?? null
    );
};
