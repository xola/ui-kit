import { Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "../Spinner";
import { Button } from "./Button";

export const SubmitButton = ({ isLoading, children, ...rest }) => {
    const { className, ...newRest } = rest;
    return (
        <Button disabled={isLoading} className={clsx(className, "relative")} {...newRest}>
            <span
                className={clsx(
                    "absolute inset-0 flex justify-center items-center",
                    isLoading ? "opacity-100" : "opacity-0",
                )}
            >
                <Transition
                    as="span"
                    className=""
                    appear
                    show={isLoading}
                    enter="transition-all duration-700"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                >
                    <Spinner size="current" color="current" className="relative top-[-1px]" />
                </Transition>
            </span>
            <span className={clsx(isLoading ? "opacity-0 flex-grow flex-shrink" : "opacity-100")}>{children}</span>
        </Button>
    );
};

SubmitButton.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
};
