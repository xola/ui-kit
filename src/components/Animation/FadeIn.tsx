import { Transition } from "@headlessui/react";
import React from "react";

export interface FadeInProps {
    shouldShow?: boolean;
    shouldAppear?: boolean;
    tag?: React.ElementType;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
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
