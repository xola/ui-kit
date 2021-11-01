import { Transition } from "@headlessui/react";
import React from "react";

export const FadeIn = ({ show = true, appear = true, tag = "div", duration = "duration-700", className, children }) => {
    return (
        <Transition
            show={show}
            appear={appear}
            as={tag}
            className={className}
            enter={`transition-opacity ${duration}`}
            enterFrom="opacity-0"
            enterTo="opacity-100"
        >
            {children}
        </Transition>
    );
};
