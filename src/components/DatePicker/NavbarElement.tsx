import React, { useCallback } from "react";
import { useDayPicker, type NavProps } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
import cn from "../../helpers/classnames";

export interface NavbarElementProps extends NavProps {
    onTodayClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Render the custom left & right arrows to change the current month.
 */
export const NavbarElement = ({ className, onTodayClick }: NavbarElementProps) => {
    const { nextMonth, previousMonth, goToMonth } = useDayPicker();
    const isNextDisabled = !nextMonth;
    const isPreviousDisabled = !previousMonth;

    const handlePreviousClick = useCallback(() => {
        if (!previousMonth) {
            return;
        }

        goToMonth(previousMonth);
    }, [previousMonth, goToMonth]);

    const handleNextClick = useCallback(() => {
        if (!nextMonth) {
            return;
        }

        goToMonth(nextMonth);
    }, [goToMonth, nextMonth]);

    return (
        <nav className={cn("h-8 right-0 absolute items-center flex space-x-4 z-10", className)}>
            {onTodayClick && (
                <button
                    type="button"
                    className="h-8 px-3 py-1.5 text-sm rounded border border-solid border-gray bg-white font-semibold tracking-tightest text-black hover:border-blue hover:bg-blue-lighter"
                    onClick={onTodayClick}
                >
                    Today
                </button>
            )}
            <span className="flex space-x-2">
                <ChevronButton isVisible={!isPreviousDisabled} onClick={handlePreviousClick}>
                    <ChevronLeftIcon />
                </ChevronButton>

                <ChevronButton isVisible={!isNextDisabled} onClick={handleNextClick}>
                    <ChevronRightIcon />
                </ChevronButton>
            </span>
        </nav>
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
            className={cn(
                isVisible ? "inline-block" : "invisible",
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent leading-none text-black hover:border-black",
            )}
            onClick={() => onClick?.()}
        >
            {children}
        </button>
    );
};
