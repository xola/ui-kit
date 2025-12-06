import { Transition } from "@headlessui/react";
import React from "react";

export interface FadeInProps {
    [key: string]: any;
    readonly shouldShow?: boolean;
    readonly shouldAppear?: boolean;
    readonly tag?: React.ElementType;
    readonly enter?: string;
    readonly enterFrom?: string;
    readonly enterTo?: string;
    readonly children?: React.ReactNode;
    readonly className?: string;
}

export const FadeIn = ({
    shouldShow = true,
    shouldAppear = true,
    tag = "div",
    enter = "transition-opacity duration-700",
    enterFrom = "opacity-0",
    enterTo = "opacity-100",
    children,
    className,
    ...rest
}: FadeInProps) => {
    return (
        <Transition
            show={shouldShow}
            appear={shouldAppear}
            as={tag}
            className={className}
            enter={enter}
            enterFrom={enterFrom}
            enterTo={enterTo}
            {...rest}
        >
            {children}
        </Transition>
    );
};
