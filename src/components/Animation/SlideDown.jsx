import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";

export const SlideDown = ({ isOpen, children }) => {
    return (
        <div className="overflow-hidden">
            <Transition
                show={isOpen}
                appear={isOpen}
                as="div"
                enter="transition-all duration-500"
                enterFrom="transform -translate-y-full opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-500"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-full opacity-0"
            >
                {children}
            </Transition>
        </div>
    );
};

SlideDown.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
};
