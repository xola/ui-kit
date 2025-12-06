import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "../../icons";
import { Spinner } from "../Spinner";
import { Button, type colors, type ButtonProps } from "./Button";

const loadingColors = {
    primary: "!bg-primary-light",
    secondary: "!bg-secondary-light",
    success: "!bg-success-light",
    warning: "!bg-warning-light",
    caution: "!bg-caution-light",
    danger: "!bg-danger-light",
} as const;

type LoadingColor = keyof typeof loadingColors;
type ButtonVariant = keyof typeof colors;

export interface SubmitButtonProps
    extends Omit<ButtonProps, "icon" | "iconPlacement">,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> {
    readonly isLoading?: boolean;
    readonly isSuccess?: boolean;
    readonly disabled?: boolean;
    readonly variant?: ButtonVariant;
}

export const SubmitButton = ({
    color = "primary",
    variant = "standard",
    isLoading,
    isSuccess,
    disabled = false,
    children,
    className,
    ...rest
}: SubmitButtonProps) => {
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

    const showTransition = Boolean(isLoading) || showSuccess;

    return (
        <Button
            color={color}
            variant={variant}
            disabled={showTransition || disabled}
            className={clsx(className, "relative", showTransition && loadingColors[color as LoadingColor])}
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
                            <CheckIcon
                                size="medium"
                                className={clsx("relative -top-0.25 text-white", {
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
            <span className={clsx(showTransition ? "flex-shrink flex-grow opacity-0" : "opacity-100")}>{children}</span>
        </Button>
    );
};
