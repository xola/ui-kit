import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@xola/ui-kit";
import PropTypes from "prop-types";
import React from "react";
import { NotesBadge } from "../Dashboard/Common/NotesBadge";
import { SlideDown } from "./Animation/SlideDown";

export const Accordion = ({ heading, shouldShowCount, count = 0, children }) => {
    return (
        <div>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex items-center pb-2">
                            <span className="relative top-[-1px]" data-testid="accordion-dropdown-icon">
                                {open ? (
                                    <ChevronDownIcon color="text-black" />
                                ) : (
                                    <ChevronRightIcon color="text-black" />
                                )}
                            </span>
                            <p className="mr-1 ml-2 font-bold leading-p1 tracking-tightest">{heading}</p>
                            {shouldShowCount ? <NotesBadge noteCount={count} /> : null}
                        </Disclosure.Button>
                        <SlideDown isOpen={open}>
                            <Disclosure.Panel as="div" className="p-2 pb-10">
                                {children}
                            </Disclosure.Panel>
                        </SlideDown>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

Accordion.propTypes = {
    heading: PropTypes.string.isRequired,
    shouldShowCount: PropTypes.bool,
    count: PropTypes.number,
    children: PropTypes.node.isRequired,
};
