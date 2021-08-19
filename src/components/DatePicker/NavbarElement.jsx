import clsx from "clsx";
import React from "react";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import PropTypes from "prop-types";

/**
 * Render the custom left & right arrows to change the current month
 */
export const NavbarElement = ({ onPreviousClick, onNextClick, className, showNextButton, showPreviousButton }) => {
    return (
        <div className={clsx("absolute z-50 top-1.5 right-1", className)}>
            <ChevronButton
                chevron={<ChevronLeftIcon />}
                shouldShowIcon={showPreviousButton}
                onClick={onPreviousClick}
            />

            <ChevronButton chevron={<ChevronRightIcon />} shouldShowIcon={showNextButton} onClick={onNextClick} />
        </div>
    );
};

const ChevronButton = ({ chevron, shouldShowIcon = true, onClick }) => {
    return (
        <button
            type="button"
            className={clsx(
                shouldShowIcon ? "inline-block" : "invisible",
                "rounded-full border border-transparent text-black hover:border-black p-1.5",
            )}
            onClick={() => onClick()}
        >
            {chevron}
        </button>
    );
};

ChevronButton.propTypes = {
    chevron: PropTypes.element.isRequired,
    shouldShowIcon: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};
