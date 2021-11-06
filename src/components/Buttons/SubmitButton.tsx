import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { Spinner } from "../Spinner";
import { Button, ButtonProps } from "./Button";

const loadingColors: any = {
    primary: "!bg-primary-light",
    secondary: "!bg-secondary-light",
    success: "!bg-success-light",
    warning: "!bg-warning-light",
    caution: "!bg-caution-light",
    danger: "!bg-danger-light",
};

interface SubmitButtonProps extends ButtonProps {
    isLoading: boolean;
}

export const SubmitButton = ({ color = "primary", isLoading, className, children, ...rest }: SubmitButtonProps) => {
    return (
        <Button
            color={color}
            className={clsx(className, "relative", isLoading && loadingColors[color])}
            {...rest}
            disabled={isLoading}
        >
            <span
                className={clsx(
                    "absolute inset-0 flex justify-center items-center",
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
                    <Spinner size="current" color="current" className="text-white relative top-[-1px]" />
                </Transition>
            </span>
            <span className={clsx(isLoading ? "opacity-0 flex-grow flex-shrink" : "opacity-100")}>{children}</span>
        </Button>
    );
};
