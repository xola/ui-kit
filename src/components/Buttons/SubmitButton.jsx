import { Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "../Spinner";
import { Button } from "./Button";

const loadingColors = {
    primary: "!bg-primary-light",
    secondary: "!bg-secondary-light",
    success: "!bg-success-light",
    warning: "!bg-warning-light",
    caution: "!bg-caution-light",
    danger: "!bg-danger-light",
};

export const SubmitButton = ({ color = "primary", isLoading, className, children, ...rest }) => {
    return (
        <Button
            color={color}
            disabled={isLoading}
            className={clsx(className, "relative", isLoading && loadingColors[color])}
            {...rest}
        >
            <span
                className={clsx(
                    "absolute inset-0 flex items-center justify-center",
                    isLoading ? "opacity-100" : "opacity-0",
                )}
            >
                <Transition
                    appear
                    as="span"
                    show={isLoading}
                    enter="transition-all duration-700"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                >
                    <Spinner size="current" color="current" className="relative top-[-1px] text-white" />
                </Transition>
            </span>
            <span className={clsx(isLoading ? "flex-shrink flex-grow opacity-0" : "opacity-100")}>{children}</span>
        </Button>
    );
};

SubmitButton.propTypes = {
    ...Button.propTypes,
    isLoading: PropTypes.bool,
};
