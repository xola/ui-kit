import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import React, { Children } from "react";
import PropTypes from "prop-types";
import { SlideDown } from "../Animation/SlideDown";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";

export const Accordion = ({ children }) => {
    const childrenArray = Children.toArray(children);
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex items-center">
                        <div className="mr-2" data-testid="accordion-dropdown-icon">
                            <ChevronRightIcon className={clsx(open && "rotate-90")} />
                        </div>

                        {childrenArray.filter((child) => child?.type === Header)}
                    </Disclosure.Button>

                    <SlideDown isOpen={open}>{childrenArray.filter((child) => child?.type === Body)}</SlideDown>
                </>
            )}
        </Disclosure>
    );
};

const Header = ({ className, children, ...rest }) => {
    return (
        <div className={clsx("flex items-center space-x-3", className)} {...rest}>
            {children}
        </div>
    );
};

Accordion.Header = Header;

const Body = ({ className, children, ...rest }) => {
    return (
        <Disclosure.Panel as="div" className={clsx("p-2 pb-10", className)} {...rest}>
            {children}
        </Disclosure.Panel>
    );
};

Accordion.Body = Body;

Accordion.prototype = {
    children: PropTypes.node,
};

Header.prototype = {
    className: PropTypes.string,
    children: PropTypes.node,
};

Body.prototype = {
    className: PropTypes.string,
    children: PropTypes.node,
};
