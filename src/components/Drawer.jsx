import * as RadixDialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import React, { forwardRef, useId } from "react";
import { BackdropOwnerContext, getBackdropHandlers } from "../helpers/backdrop";
import { isIosBrowser } from "../helpers/browser";
import cn from "../helpers/classnames";
import { useDialogFocusReturn } from "../hooks/useDialogFocusReturn";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { CloseIcon } from "../icons";
import { Button } from "./Buttons/Button";
import { DialogFrame, preventDialogOutsideInteraction, preventExpandedComboBoxEscape } from "./Dialog/Dialog";

const sizes = {
    small: "w-72",
    medium: "w-85",
    large: "w-110",
    xl: "w-200",
    "2xl": "w-screen md:max-w-screen-md 2xl:max-w-screen-lg", // This was the old size
};

export const Drawer = forwardRef(
    (
        {
            isOpen = false,
            title = "",
            size = "medium",
            content,
            sideIndent = 0,
            onClose,
            classNames = {},
            position = "right",
            "data-testid": dataTestId,
            bodyTestId,
        },
        ref,
    ) => {
        const viewportHeight = useViewportHeight();
        const isIOS = isIosBrowser();
        const backdropOwner = useId();
        const { onOpenAutoFocus, onCloseAutoFocus } = useDialogFocusReturn(isOpen);

        // Escape and outside presses pass `false`; the close button passes its click event.
        const handleOverlayClick = () => onClose(false);
        const overlayHandlers = getBackdropHandlers(handleOverlayClick);

        const handleOpenChange = (open) => {
            if (!open) {
                onClose(false);
            }
        };

        return (
            <BackdropOwnerContext.Provider value={backdropOwner}>
                <DialogFrame
                    ref={ref}
                    isOpen={isOpen}
                    className={cn(
                        "ui-drawer group/drawer fixed inset-0 z-30 overflow-hidden [--ui-dialog-out-duration:500ms] data-[state=closed]:animate-dialog-hold",
                        classNames.dialog,
                    )}
                    onOpenChange={handleOpenChange}
                    data-testid={dataTestId}
                >
                    <div
                        className={cn(
                            "flex",
                            isIOS ? `h-[${viewportHeight}px] max-h-[${viewportHeight}px] w-full` : "h-screen w-full",
                        )}
                    >
                        <div
                            className={cn(
                                "ui-drawer-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity",
                                "[--ui-dialog-in-duration:500ms] [--ui-dialog-opacity:0] [--ui-dialog-out-duration:200ms] group-data-[state=closed]/drawer:animate-dialog-out group-data-[state=open]/drawer:animate-dialog-in",
                                classNames.overlay,
                            )}
                            data-backdrop-owner={backdropOwner}
                            {...overlayHandlers}
                        />
                        <div
                            style={{
                                [position === "right" ? "right" : "left"]: `${sideIndent ?? 0}px`,
                            }}
                            className={cn(
                                "ui-drawer-container",
                                "fixed inset-y-0 flex max-w-full",
                                classNames.dialogContent,
                            )}
                        >
                            <RadixDialog.Content
                                aria-describedby={undefined}
                                className={cn(
                                    "flex",
                                    position === "right"
                                        ? "[--ui-dialog-translate:100%_0]"
                                        : "[--ui-dialog-translate:-100%_0]",
                                    "[--ui-dialog-in-duration:500ms] [--ui-dialog-out-duration:500ms] [--ui-dialog-out-ease:cubic-bezier(0.4,0,0.2,1)] data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
                                )}
                                onEscapeKeyDown={preventExpandedComboBoxEscape}
                                onInteractOutside={preventDialogOutsideInteraction}
                                onOpenAutoFocus={onOpenAutoFocus}
                                onCloseAutoFocus={onCloseAutoFocus}
                            >
                                {position === "right" && <CloseButton onClose={onClose} />}

                                <DrawerContent
                                    bodyTestId={bodyTestId}
                                    classNames={classNames}
                                    content={content}
                                    size={size}
                                    title={title}
                                />

                                {position === "left" && <CloseButton onClose={onClose} />}
                            </RadixDialog.Content>
                        </div>
                    </div>
                </DialogFrame>
            </BackdropOwnerContext.Provider>
        );
    },
);

const CloseButton = ({ onClose }) => {
    return (
        <Button
            size="small"
            variant="link"
            className="m-2.5 inline-flex !h-10 !w-10 items-center justify-center !rounded-full bg-white !px-1.5 !text-black"
            onClick={onClose}
        >
            <CloseIcon size="medium" />
        </Button>
    );
};

Drawer.displayName = "Drawer";

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    onClose: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    position: PropTypes.string,
    sideIndent: PropTypes.number,
    "data-testid": PropTypes.string,
    bodyTestId: PropTypes.string,
};

const DrawerContent = ({ bodyTestId, classNames, content, size, title }) => {
    return (
        <div
            className={cn(
                "flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-8 shadow-xl sm:px-6",
                sizes[size],
                classNames.children,
            )}
        >
            <div className="ui-drawer-header w-full">
                <RadixDialog.Title>{title}</RadixDialog.Title>
            </div>
            <div className={cn("ui-drawer-body relative mt-3 flex-1", classNames.content)} data-testid={bodyTestId}>
                {content}
            </div>
        </div>
    );
};

DrawerContent.propTypes = {
    bodyTestId: PropTypes.string,
    classNames: PropTypes.object.isRequired,
    content: Drawer.propTypes.content,
    size: PropTypes.oneOf(Object.keys(sizes)).isRequired,
    title: Drawer.propTypes.title,
};
