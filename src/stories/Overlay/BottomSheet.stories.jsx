import dayjs from "dayjs";
import React, { useState } from "react";
import { expect, fn, spyOn, waitFor } from "storybook/test";
import { BottomSheet, Button, DatePickerPopover, Input } from "../..";
import { expectFocusInside, getPortalCanvas, wait, waitForClosed } from "../helpers";

const BottomSheetStories = {
    title: "Overlay/BottomSheet",
    component: BottomSheet,
    args: {
        shouldCloseOnOutsideClick: true,
        isOpen: false,
    },
    argTypes: {
        shouldCloseOnOutsideClick: {
            type: { required: false },
            description: "Close the sheet if user clicks the overlay",
            control: { type: "boolean" },
        },
        isOpen: {
            type: { required: false },
            description: "Control the sheet open state",
            control: { type: "boolean" },
        },
    },
};

export const Default = ({ shouldCloseOnOutsideClick, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        onClose();
        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a bottom sheet</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={handleClose}>
                <BottomSheet.Header description="Enter the code below to apply the code">Apply Code</BottomSheet.Header>

                <BottomSheet.Body>
                    <Input placeholder="Coupon or Affiliate" />
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="primary" onClick={toggle}>
                        Confirm
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>
    );
};

Default.args = {
    onClose: fn(),
};

Default.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const launcher = canvas.getByRole("button", { name: "Click me to launch a bottom sheet" });
    await expect(body.queryByText("Apply Code")).not.toBeInTheDocument();

    await userEvent.click(launcher);
    const dialog = await body.findByRole("dialog");
    await expect(body.getByText("Apply Code")).toBeInTheDocument();
    await expect(body.getByPlaceholderText("Coupon or Affiliate")).toBeInTheDocument();

    // Opening focuses the first focusable element inside, not the dialog container itself
    await expectFocusInside(dialog, ownerDocument);

    for (let press = 0; press < 5; press++) {
        await userEvent.tab();
        await expectFocusInside(dialog, ownerDocument);
    }

    await userEvent.keyboard("{Escape}");
    await wait(400);
    await expect(dialog).toBeVisible();
    await expect(args.onClose).not.toHaveBeenCalled();

    await userEvent.click(body.getByRole("button", { name: "Close" }));
    await waitForClosed(body.queryByText("Apply Code"));
    await expect(args.onClose).toHaveBeenCalledExactlyOnceWith();
    await waitFor(() => expect(launcher).toHaveFocus());

    await userEvent.click(launcher);
    await body.findByText("Apply Code");
    await userEvent.click(ownerDocument.querySelector(".ui-bottom-sheet-overlay"));
    await waitForClosed(body.queryByText("Apply Code"));
    await expect(args.onClose).toHaveBeenCalledTimes(2);
    await expect(args.onClose).toHaveBeenLastCalledWith();
    await waitFor(() => expect(launcher).toHaveFocus());
};

const handleOpenSheetClose = () => {};

const OpenSheet = ({ onClose = handleOpenSheetClose }) => {
    return (
        <BottomSheet isOpen onClose={onClose}>
            <BottomSheet.Header>Open bottom sheet</BottomSheet.Header>
            <BottomSheet.Body>Open bottom sheet body</BottomSheet.Body>
            <BottomSheet.Footer>
                <Button>Done</Button>
            </BottomSheet.Footer>
        </BottomSheet>
    );
};

const expectOpenSheet = async ({ canvasElement }) => {
    const body = getPortalCanvas(canvasElement);
    const dialog = await body.findByRole("dialog");
    const sheet = dialog.closest(".ui-bottom-sheet");

    await waitFor(() => {
        expect(dialog).toBeVisible();
        expect(sheet.getAnimations({ subtree: true })).toHaveLength(0);
    });
};

export const Open = ({ onClose }) => <OpenSheet onClose={onClose} />;
Open.args = {
    onClose: fn(),
};

Open.play = async (context) => {
    const { args, canvasElement, userEvent } = context;
    await expectOpenSheet(context);

    const dialog = getPortalCanvas(canvasElement).getByRole("dialog");
    await userEvent.click(canvasElement.ownerDocument.querySelector(".ui-bottom-sheet-overlay"));
    await wait(400);
    await expect(dialog).toBeVisible();
    await expect(args.onClose).not.toHaveBeenCalled();
};

export const Mobile = () => <OpenSheet />;
Mobile.play = async (context) => {
    await expectOpenSheet(context);

    const userAgent = spyOn(Navigator.prototype, "userAgent", "get").mockReturnValue("iPhone WebKit");
    const innerHeight = spyOn(window, "innerHeight", "get").mockReturnValue(640);
    window.dispatchEvent(new Event("orientationchange"));

    const sheet = context.canvasElement.ownerDocument.querySelector(".ui-bottom-sheet-panel");
    await waitFor(() => expect(sheet).toHaveStyle({ maxHeight: "576px" }));

    userAgent.mockRestore();
    innerHeight.mockRestore();
    window.dispatchEvent(new Event("orientationchange"));
    await waitFor(() => expect(sheet.style.maxHeight).toBe(""));
};

// Tall scrollable body: the Body scrolls independently while the Header/Footer stay pinned.
export const ScrollableContent = ({ shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>Click me to launch a scrollable bottom sheet</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <BottomSheet.Header>Terms &amp; Conditions</BottomSheet.Header>

                <BottomSheet.Body>
                    {Array.from({ length: 30 }).map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <p key={index} className="mb-4">
                            Paragraph {index + 1}: the body scrolls independently while the header and footer stay
                            pinned.
                        </p>
                    ))}
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="primary" onClick={toggle}>
                        Accept
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>
    );
};

ScrollableContent.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Click me to launch a scrollable bottom sheet" }));
    await expect(await body.findByText("Terms & Conditions")).toBeInTheDocument();
    await expect(body.getByText(/Paragraph 1:/)).toBeInTheDocument();

    const panel = canvasElement.ownerDocument.querySelector(".ui-bottom-sheet-panel");
    const scrollBody = panel.querySelector(".ui-bottom-sheet-body");
    const footer = panel.querySelector(".ui-bottom-sheet-footer");
    await waitFor(() => expect(scrollBody.scrollHeight).toBeGreaterThan(scrollBody.clientHeight));

    const panelRect = panel.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    await expect(footerRect.top).toBeGreaterThanOrEqual(panelRect.top);
    await expect(footerRect.bottom).toBeLessThanOrEqual(panelRect.bottom);

    scrollBody.scrollTop = scrollBody.scrollHeight;
    await expect(scrollBody.scrollTop).toBeGreaterThan(0);
    scrollBody.scrollTop = 0;
    await expect(scrollBody.scrollTop).toBe(0);
};

// Priced day content: reproduces the traveler calendar's `has-custom-content` layout (larger day
// cells + a price under each date), which is what makes the calendar tall enough to overflow a
// phone before the mobile size fix in DatePicker.css.
const getPricedDayContent = (date) => {
    const dayOfMonth = dayjs(date).date();
    return <span className="text-xs text-gray-dark">${dayOfMonth % 3 === 0 ? 22 : 27}</span>;
};

// Mirrors the traveler "Change Arrival" modal: a tall sheet with an item summary, a date field
// whose (large, priced) calendar opens in a popover, time slots, and a purchase summary. Verifies
// (a) the calendar stacks ABOVE the sheet (z-40 popover vs z-30 sheet) rather than being hidden,
// and (b) the calendar fits on a phone instead of overflowing below the viewport.
export const WithDatePicker = ({ shouldCloseOnOutsideClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const timeSlots = ["6:00 AM", "7:30 AM", "10:00 AM", "1:00 PM", "3:30 PM"];

    return (
        <div>
            <Button onClick={toggle}>Click me to change arrival</Button>

            <BottomSheet
                isOpen={isOpen}
                shouldCloseOnOutsideClick={shouldCloseOnOutsideClick}
                className="max-md:!px-3"
                onClose={toggle}
            >
                <BottomSheet.Header>Change Arrival</BottomSheet.Header>

                <BottomSheet.Body>
                    <div className="rounded-lg bg-gray-lighter p-4">
                        <div className="font-bold">Traveler App Test</div>
                        <div className="mt-1 text-sm text-gray-darker">July 2, 2026 · 6:00 AM · 2 Guests</div>
                    </div>

                    <div className="mt-4 space-y-1">
                        <span className="text-sm font-bold">Date</span>
                        <DatePickerPopover
                            shouldShowYearPicker
                            value={date}
                            getDayContent={getPricedDayContent}
                            onChange={setDate}
                        />
                    </div>

                    <div className="mt-4 space-y-1">
                        <span className="text-sm font-bold">Time</span>
                        <div className="flex flex-wrap gap-2">
                            {timeSlots.map((slot) => (
                                <span key={slot} className="rounded-lg border border-gray-light px-4 py-2 text-sm">
                                    {slot}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-gray-lighter p-4">
                        <div className="text-lg font-bold text-secondary">Purchase Summary</div>
                        <p className="mt-2 text-sm text-gray-darker">New arrival: {date.toDateString()}</p>
                        <p className="mt-1 text-sm text-gray-darker">Amount due: $0.00</p>
                    </div>
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="primary" onClick={toggle}>
                        Save Changes
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>
    );
};

export default BottomSheetStories;
