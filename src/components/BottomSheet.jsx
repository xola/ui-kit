import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useId } from "react";
import { BackdropOwnerContext, getBackdropHandlers } from "../helpers/backdrop";
import { isIosBrowser } from "../helpers/browser";
import { useDialogFocusReturn } from "../hooks/useDialogFocusReturn";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { CloseIcon } from "../icons";
import {
    DialogFrame,
    DialogTitle,
    DialogTitleScope,
    preventDialogOutsideInteraction,
    preventExpandedComboBoxEscape,
} from "./Dialog/Dialog";

/**
 * A mobile-first bottom sheet. Mirrors Modal's compound API (Header/Body/Footer) so it can replace a Modal on small screens.
 * Stays at z-30 like Modal and Drawer, so the dialog opened last is on top. Popover (z-50) and Tooltip (z-[9999]) portal
 * above it. ComboBox draws its menu inline, inside the sheet.
 */
export const BottomSheet = ({
    isOpen = false,
    // When true, tapping the overlay closes the sheet. Wired to the overlay's onClick, not the Dialog's
    // outside-click, so a press on a portaled Popover or Tooltip is never mistaken for an outside click.
    shouldCloseOnOutsideClick = false,
    onClose,
    children,
    className,
}) => {
    const viewportHeight = useViewportHeight();
    const isIOS = isIosBrowser();
    const backdropOwner = useId();
    const { onOpenAutoFocus, onCloseAutoFocus } = useDialogFocusReturn();

    const handleOverlayClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    /** Drops the click event so `onClose` keeps being called with no arguments. */
    const handleClose = () => onClose();

    const overlayHandlers = getBackdropHandlers(handleOverlayClick);

    // iOS mobile browsers report an unreliable `vh`/`dvh` (collapsing address bar), so cap the sheet
    // by the measured innerHeight there. Other browsers use `dvh` via the class below. Guarded on a
    // non-zero height so the panel doesn't briefly render at 0 height and jump on mount.
    const panelStyle = isIOS && viewportHeight ? { maxHeight: `${Math.round(viewportHeight * 0.9)}px` } : undefined;

    return (
        <BackdropOwnerContext.Provider value={backdropOwner}>
            <DialogFrame
                isOpen={isOpen}
                className="ui-bottom-sheet group/bottom-sheet fixed inset-0 z-30 [--ui-dialog-out-duration:200ms] data-[state=closed]:animate-dialog-hold"
            >
                <div
                    className="ui-bottom-sheet-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity [--ui-dialog-in-duration:300ms] [--ui-dialog-opacity:0] group-data-[state=closed]/bottom-sheet:animate-dialog-out group-data-[state=open]/bottom-sheet:animate-dialog-in"
                    aria-hidden="true"
                    data-backdrop-owner={backdropOwner}
                    {...overlayHandlers}
                />

                <RadixDialog.Content
                    aria-modal="true"
                    aria-describedby={undefined}
                    style={panelStyle}
                    className={clsx(
                        className,
                        "ui-bottom-sheet-panel fixed inset-x-0 bottom-0 flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white px-6 pb-8 pt-6 text-left shadow-xl",
                        "[--ui-dialog-in-duration:300ms] [--ui-dialog-translate:0_100%] data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
                    )}
                    onEscapeKeyDown={preventExpandedComboBoxEscape}
                    onInteractOutside={preventDialogOutsideInteraction}
                    onOpenAutoFocus={onOpenAutoFocus}
                    onCloseAutoFocus={onCloseAutoFocus}
                >
                    <DialogTitleScope>
                        <button
                            type="button"
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 p-1 text-black hover:text-gray-darker"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </button>

                        {children}
                    </DialogTitleScope>
                </RadixDialog.Content>
            </DialogFrame>
        </BackdropOwnerContext.Provider>
    );
};

BottomSheet.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    shouldCloseOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

// px-8 keeps the centered title clear of the absolute close button in the top-right corner.
const Header = ({ children, description, className, ...rest }) => {
    return (
        <DialogTitle className={clsx(className, "ui-bottom-sheet-header shrink-0 px-8 text-center")} {...rest}>
            <h3 className="text-2xl font-semibold leading-6 text-black">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </DialogTitle>
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
