import React, { useEffect, useState } from "react";
import { expect, waitFor } from "storybook/test";
import { Switch } from "../..";

const SwitchStories = {
    primary: true,
    title: "Forms & Fields/Switch",
    parameters: {
        docs: {
            description: {
                component: "This is a toggle for situations where you require a better looking boolean form component",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A483033&viewport=7074%2C-1137%2C0.4",
        },
    },
    args: {
        size: "medium",
    },
    argTypes: {
        size: {
            description: "Switch Size",
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
};

export const Default = ({ size }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState([]);
    const [submitPath, setSubmitPath] = useState();

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    // Read before the state update: the updater may run after the event dispatch ends
                    const value = String(new FormData(event.currentTarget).get("notifications"));
                    setValues((previous) => [...previous, value]);
                }}
            >
                <Switch isChecked={checked} name="notifications" size={size} value="weekly" onChange={setChecked} />
                {/* Hidden so the visual and aria snapshots keep matching the pre-migration baseline */}
                <div className="hidden" data-testid="values">
                    {values.join(",")}
                </div>
            </form>
            {/* Transparent text and aria-hidden keep this out of the visual and aria snapshots; the switch is
                clipped (sr-only) so it paints nothing but stays focusable for the keyboard steps below */}
            <div aria-hidden="true" className="absolute text-transparent">
                {/* Enter inside a form with a submit button must click that button (the primary
                    attemptSubmit branch) rather than fall back to requestSubmit; requestSubmit never fires
                    the button's own click handlers, so the spy is what distinguishes the two branches */}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <span className="sr-only">
                        <Switch data-testid="submit-button-switch" isChecked />
                    </span>
                    <button className="hidden" type="submit" onClick={() => setSubmitPath("submit-button-click")}>
                        Submit
                    </button>
                </form>
                <span data-testid="submit-path">{submitPath}</span>
            </div>
        </>
    );
};

Default.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.keyboard("[Space]");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    // Enter does not toggle the switch; it submits the enclosing form with the checked name/value pair
    await userEvent.keyboard("[Enter]");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(canvas.getByTestId("values")).toHaveTextContent("weekly");
    await userEvent.keyboard("[Space]");
    await userEvent.keyboard("[Enter]");
    // An unchecked switch submits no pair
    await expect(canvas.getByTestId("values")).toHaveTextContent("weekly,null");
    // A form with a submit button takes the primary branch: Enter clicks that button
    canvas.getByTestId("submit-button-switch").focus();
    await userEvent.keyboard("[Enter]");
    await expect(canvas.getByTestId("submit-button-switch")).toHaveAttribute("aria-checked", "true");
    await waitFor(() => expect(canvas.getByTestId("submit-path")).toHaveTextContent("submit-button-click"));
    // Radix resets a controlled switch to its mount-time checked value on form reset, and the consumer's
    // onChange receives that value (a documented difference from Headless UI, which ignored resets)
    toggle.focus();
    await userEvent.keyboard("[Space]");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    toggle.closest("form").reset();
    await waitFor(() => expect(toggle).toHaveAttribute("aria-checked", "false"));
    // Restore the checked final state the visual baseline was captured with
    await userEvent.keyboard("[Space]");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
};

export const WithLabel = () => {
    const [checked, setChecked] = useState(false);
    const [linkChecked, setLinkChecked] = useState(false);
    const [linkDefaultPrevented, setLinkDefaultPrevented] = useState();

    useEffect(() => {
        const onClick = (event) => {
            const isLinkClick = event.target instanceof Element && event.target.closest('[data-testid="label-link"]');
            if (!isLinkClick) return;
            // Nobody upstream (the label guard included) may cancel the link's click; cancel it only here,
            // after the full dispatch ran, so the test iframe does not actually navigate
            setLinkDefaultPrevented(event.defaultPrevented);
            event.preventDefault();
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, []);

    return (
        <>
            <Switch.Group>
                <Switch.Label direction="left">Hello World</Switch.Label>
                <Switch isChecked={checked} size="small" onChange={setChecked} />
            </Switch.Group>
            {/* Transparent text and aria-hidden keep this out of the visual and aria snapshots, while the
                link keeps a real hit box for the play below; the switch itself is clipped so it paints
                nothing */}
            <div aria-hidden="true" className="absolute text-transparent">
                <Switch.Group>
                    <Switch.Label direction="left">
                        <a className="focus:outline-none" href="#" data-testid="label-link">
                            docs
                        </a>
                    </Switch.Label>
                    <span className="sr-only">
                        <Switch data-testid="label-link-switch" isChecked={linkChecked} onChange={setLinkChecked} />
                    </span>
                </Switch.Group>
                <span data-testid="link-default-prevented">{String(linkDefaultPrevented)}</span>
            </div>
        </>
    );
};

WithLabel.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Hello World" });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await userEvent.click(canvas.getByText("Hello World"));
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    // Clicking the label focuses the switch as well as toggling it
    await expect(toggle).toHaveFocus();
    // A click on an interactive child of the label keeps its native action and leaves the switch alone.
    // user-event's simulated label activation forwards clicks to the control even for interactive
    // descendants, which real browsers never do (the HTML spec makes label activation do nothing for
    // interactive content), so this dispatches the click directly to match a real browser
    const linkSwitch = canvas.getByTestId("label-link-switch");
    canvas.getByTestId("label-link").dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    await expect(linkSwitch).toHaveAttribute("aria-checked", "false");
    await expect(linkSwitch).not.toHaveFocus();
    await waitFor(() => expect(canvas.getByTestId("link-default-prevented")).toHaveTextContent("false"));
};

export const WithLabelAndId = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Switch.Group>
            <Switch.Label direction="left">Email notifications</Switch.Label>
            <Switch id="email-notifications" isChecked={checked} size="small" onChange={setChecked} />
        </Switch.Group>
    );
};

WithLabelAndId.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Email notifications" });
    const label = canvas.getByText("Email notifications");
    await expect(toggle).toHaveAttribute("id", "email-notifications");
    await userEvent.click(label);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await userEvent.click(label);
    await expect(toggle).toHaveAttribute("aria-checked", "false");
};

export const Focused = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Switch
            className="bg-gray disabled:bg-gray-light relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none h-5 w-8 consumer-switch"
            isChecked={checked}
            onChange={setChecked}
        />
    );
};

Focused.play = async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("switch");
    // A consumer className replaces the internal classes rather than merging with them; the string replicates
    // the internal classes minus the styleless `ui-switch` marker so the baseline screenshot still matches
    await expect(toggle).toHaveClass("consumer-switch");
    await expect(toggle).not.toHaveClass("ui-switch");
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    // Focus appearance is a suppressed outline, not the browser default
    const { outlineColor } = canvasElement.ownerDocument.defaultView.getComputedStyle(toggle);
    await expect(outlineColor).toBe("rgba(0, 0, 0, 0)");
};

export const Disabled = ({ size }) => {
    const [checked, setChecked] = useState(false);
    return <Switch disabled isChecked={checked} size={size} onChange={setChecked} />;
};

Disabled.play = async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch");
    await expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    // Disabled switch must not toggle
    await expect(toggle).toHaveAttribute("aria-checked", "false");
};

export default SwitchStories;
