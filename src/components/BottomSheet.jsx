import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { noop } from "lodash";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { isIosBrowser } from "../helpers/browser";
import { useViewportHeight } from "../hooks/useViewportHeight";

// A mobile-first bottom sheet. Mirrors Modal's compound API (Header/Body/Footer) so it can be
// swapped in wherever a Modal is used on small screens. Kept at z-30 (same as Modal) so popovers
// that portal to document.body (DatePicker calendar at z-40, ComboBox menu at z-30) stack above it.
export const BottomSheet = ({
    isOpen = false,
    // Configurable: when true, tapping the dark overlay closes the sheet. Default false keeps parity
    // with Modal. Closing is wired to the overlay's own onClick (not the Dialog's built-in
    // outside-click) so interacting with popovers portaled outside the sheet — the DatePicker
    // calendar, the ComboBox menu — is never mistaken for an outside click.
    shouldCloseOnOutsideClick = false,
    onClose,
    children,
    className,
}) => {
    const viewportHeight = useViewportHeight();
    const isIOS = isIosBrowser();

    const handleOverlayClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    // iOS mobile browsers report an unreliable `vh`/`dvh` (collapsing address bar), so cap the sheet
    // by the measured innerHeight there. Other browsers use `dvh` via the class below. Guarded on a
    // non-zero height so the panel doesn't briefly render at 0 height and jump on mount.
    const panelStyle = isIOS && viewportHeight ? { maxHeight: `${Math.round(viewportHeight * 0.9)}px` } : undefined;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="ui-bottom-sheet fixed inset-0 z-30" onClose={noop}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="ui-bottom-sheet-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity"
                        aria-hidden="true"
                        onClick={handleOverlayClick}
                    />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-out duration-300"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transform transition ease-in duration-200"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                >
                    <div
                        style={panelStyle}
                        className={clsx(
                            className,
                            "ui-bottom-sheet-panel fixed inset-x-0 bottom-0 flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white px-6 pb-8 pt-3 text-left shadow-xl",
                        )}
                    >
                        <div className="mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-gray" aria-hidden="true" />

                        {children}
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

BottomSheet.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    shouldCloseOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

const Header = ({ children, description, className, ...rest }) => {
    return (
        <Dialog.Title as="div" className={clsx(className, "ui-bottom-sheet-header shrink-0 text-center")} {...rest}>
            <h3 className="text-2xl font-semibold leading-6 text-black">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </Dialog.Title>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
};

Header.displayName = "BottomSheet.Header";
BottomSheet.Header = Header;

// The body hugs its content so short sheets stay short (no `flex-1`/grow). `min-h-0` lets it shrink
// below its content and scroll when the content would otherwise push the sheet past `max-h-[90dvh]`,
// keeping the footer pinned and visible. So: short content → short sheet, tall content → scrolls.
const Body = ({ className, ...rest }) => {
    return <div className={clsx(className, "ui-bottom-sheet-body mt-6 min-h-0 overflow-y-auto")} {...rest} />;
};

Body.propTypes = {
    className: PropTypes.string,
};

Body.displayName = "BottomSheet.Body";
BottomSheet.Body = Body;

// Footer actions stretch full width and sit side-by-side per the mobile design, unlike Modal's
// right-aligned footer. The `[&>*]:flex-1` arbitrary variant gives each button equal width.
const Footer = ({ className, ...rest }) => {
    return (
        <div className={clsx(className, "ui-bottom-sheet-footer mt-6 flex shrink-0 gap-3 [&>*]:flex-1")} {...rest} />
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.displayName = "BottomSheet.Footer";
BottomSheet.Footer = Footer;
