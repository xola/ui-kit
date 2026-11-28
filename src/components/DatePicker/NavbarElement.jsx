import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

/**
 * Render the custom left & right arrows to change the current month.
 */
export const NavbarElement = ({ previousMonth, nextMonth, onPreviousClick, onNextClick, className }) => {
    return (
        <nav className={cn("absolute right-1 top-1.5 z-50", className)}>
            <ChevronButton
                label="Go to the previous month"
                isVisible={Boolean(previousMonth)}
                onClick={onPreviousClick}
            >
                <ChevronLeftIcon />
            </ChevronButton>

            <ChevronButton label="Go to the next month" isVisible={Boolean(nextMonth)} onClick={onNextClick}>
                <ChevronRightIcon />
            </ChevronButton>
        </nav>
    );
};

NavbarElement.propTypes = {
    previousMonth: PropTypes.instanceOf(Date),
    nextMonth: PropTypes.instanceOf(Date),
    onPreviousClick: PropTypes.func,
    onNextClick: PropTypes.func,
    className: PropTypes.string,
};

export const ChevronButton = ({ isVisible = true, label, onClick, children }) => {
    return (
        <button
            type="button"
            aria-label={label}
            className={cn(
                isVisible ? "inline-block" : "invisible",
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent leading-none text-black hover:border-black",
            )}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
};

ChevronButton.propTypes = {
    isVisible: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
