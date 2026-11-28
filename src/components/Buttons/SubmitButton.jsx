import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import cn from "../../helpers/classnames";
import { useFormStatusSafe } from "../../helpers/reactFeatures";
import { CheckIcon } from "../../icons";
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

const indicatorClassName = "relative -top-0.25 text-white";

const SubmitButtonIndicator = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => setIsVisible(true));
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <span className={cn("transition-all duration-700", isVisible ? "opacity-100" : "opacity-0")}>{children}</span>
    );
};

SubmitButtonIndicator.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SubmitButton = ({
    color = "primary",
    isLoading,
    isSuccess,
    disabled = false,
    variant = "standard",
    type = "submit",
    className,
    children,
    ...rest
}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const { pending } = useFormStatusSafe();
    const isBusy = isLoading ?? pending;

    useEffect(() => {
        if (isSuccess && !isBusy) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }

        if (isBusy) {
            setShowSuccess(false);
        }
    }, [isSuccess, isBusy]);

    const showTransition = isBusy || showSuccess;

    return (
        <Button
            type={type}
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
                    <SubmitButtonIndicator>
                        {showSuccess && (
                            <CheckIcon
                                size="medium"
                                color="current"
                                className={cn(indicatorClassName, { "text-black": variant === "outline" })}
                            />
                        )}
                        {isBusy && !showSuccess && (
                            <Spinner size="current" color="current" className={indicatorClassName} />
                        )}
                    </SubmitButtonIndicator>
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
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["submit", "button", "reset"]),
};
