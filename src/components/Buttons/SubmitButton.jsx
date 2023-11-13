import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { CheckIcon } from "../../icons/CheckIcon";
import { cn } from "../../helpers/classnames";
import { Button, buttonColors } from "./Button";

const loadingColors = {
    primary: "!bg-primary-light",
    secondary: "!bg-secondary-light",
    success: "!bg-success-light",
    warning: "!bg-warning-light",
    caution: "!bg-caution-light",
    danger: "!bg-danger-light",
};

export const SubmitButton = ({
    color = "primary",
    isLoading,
    isSuccess,
    disabled = false,
    className,
    variant = "standard",
    children,
    ...rest
}) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess && !isLoading) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }

        if (isLoading && showSuccess) {
            setShowSuccess(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isLoading]);

    const showTransition = isLoading || showSuccess;

    return (
        <Button
            color={color}
            disabled={showTransition || disabled}
            variant={variant}
            className={cn(className, "relative", showTransition && loadingColors[color])}
            {...rest}
        >
            <span
                className={cn(
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
                            <CheckIcon
                                size="medium"
                                color="current"
                                className={cn("relative -top-0.25 text-white", {
                                    "text-black": variant === "outline",
                                })}
                            />
                        )}
                        {isLoading && !showSuccess && (
                            <Spinner size="current" color="current" className="relative -top-0.25 text-white" />
                        )}
                    </Transition>
                )}
            </span>
            <span className={cn(showTransition ? "flex-shrink flex-grow opacity-0" : "opacity-100")}>{children}</span>
        </Button>
    );
};

SubmitButton.propTypes = {
    ...Button.propTypes,
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    variant: PropTypes.oneOf(Object.keys(buttonColors)),
    // eslint-disable-next-line react/boolean-prop-naming
    disabled: PropTypes.bool,
};
