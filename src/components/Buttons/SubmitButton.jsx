import { Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Spinner } from "../Spinner";
import { CheckIcon } from "../../icons/CheckIcon";
import { Button } from "./Button";

const loadingColors = {
    primary: "!bg-primary-light",
    secondary: "!bg-secondary-light",
    success: "!bg-success-light",
    warning: "!bg-warning-light",
    caution: "!bg-caution-light",
    danger: "!bg-danger-light",
};

export const SubmitButton = ({ color = "primary", isLoading, isSuccess, className, children, ...rest }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let timer = null;
        if (isSuccess && !isLoading) {
            setShowSuccess(true);
            timer = setTimeout(() => setShowSuccess(false), 3000);
        }

        if (isLoading) {
            setShowSuccess(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isSuccess, isLoading]);

    const showTransition = isLoading || showSuccess;

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
                    showTransition ? "opacity-100" : "opacity-0",
                )}
            >
                {showTransition && (
                    <Transition
                        appear
                        as="span"
                        show={showTransition}
                        enter="transition-all duration-700"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        {showSuccess && (
                            <CheckIcon size="medium" color="current" className="relative -top-0.25 text-white" />
                        )}
                        {isLoading && !showSuccess && (
                            <Spinner size="current" color="current" className="relative -top-0.25 text-white" />
                        )}
                    </Transition>
                )}
            </span>
            <span className={clsx(showTransition ? "flex-shrink flex-grow opacity-0" : "opacity-100")}>{children}</span>
        </Button>
    );
};

SubmitButton.propTypes = {
    ...Button.propTypes,
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
};
