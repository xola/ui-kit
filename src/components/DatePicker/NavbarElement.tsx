import clsx from "clsx";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

export interface NavbarElementProps {
    showPreviousButton?: boolean;
    showNextButton?: boolean;
    className?: string;
    onPreviousClick?: () => void;
    onNextClick?: () => void;
}

/**
 * Render the custom left & right arrows to change the current month.
 */
export const NavbarElement = ({
    showPreviousButton,
    showNextButton,
    className,
    onPreviousClick,
    onNextClick,
}: NavbarElementProps) => {
    return (
        <div className={clsx("absolute right-1 top-1.5 z-50", className)}>
            <ChevronButton isVisible={showPreviousButton} onClick={onPreviousClick}>
                <ChevronLeftIcon />
            </ChevronButton>

            <ChevronButton isVisible={showNextButton} onClick={onNextClick}>
                <ChevronRightIcon />
            </ChevronButton>
        </div>
    );
};

export interface ChevronButtonProps {
    isVisible?: boolean;
    children: React.ReactElement;
    onClick?: () => void;
}

export const ChevronButton = ({ isVisible = true, children, onClick }: ChevronButtonProps) => {
    return (
        <button
            type="button"
            className={clsx(
                isVisible ? "inline-block" : "invisible",
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent leading-none text-black hover:border-black",
            )}
            onClick={() => onClick?.()}
        >
            {children}
        </button>
    );
};
