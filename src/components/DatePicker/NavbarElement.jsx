import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronLeftIcon } from "../../icons/";
import { ChevronRightIcon } from "../../icons/";

/**
 * Render the custom left & right arrows to change the current month.
 */
export const NavbarElement = ({ onPreviousClick, onNextClick, className, showNextButton, showPreviousButton }) => {
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

NavbarElement.propTypes = {
    onPreviousClick: PropTypes.func,
    onNextClick: PropTypes.func,
    className: PropTypes.string,
    // eslint-disable-next-line react/boolean-prop-naming
    showNextButton: PropTypes.bool,
    // eslint-disable-next-line react/boolean-prop-naming
    showPreviousButton: PropTypes.bool,
};

const ChevronButton = ({ isVisible = true, onClick, children }) => {
    return (
        <button
            type="button"
            className={clsx(
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
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
