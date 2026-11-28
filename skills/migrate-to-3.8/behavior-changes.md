# 3.8 runtime behavior changes

Reference for [SKILL.md](SKILL.md): how ui-kit 3.8 components behave differently from 3.7 at runtime. Prop rules live in SKILL.md; this file explains a failing test or a manual check that differs from 3.7.

## Tooltip

- Opens on hover and on keyboard focus of the target; Tippy never opened on focus inside the target. Only focus that matches `:focus-visible` counts, so focus a dialog moves from script (its initial focus, or focus given back to the opener on close) opens nothing after a mouse click.
- A touch tap on the target toggles it and a tap outside closes it, as Tippy did. The tap still reaches the wrapped control.
- Escape closes it. A controlled tooltip with no `onOpenChange` gets `onClickOutside()` instead, so a `visible` plus `onClickOutside` site now closes on Escape (Tippy ignored Escape). A tooltip held open with neither is a step 4 check.

## Popover, PopoverList, InlineValuePopover, DatePickerPopover

- A hover popover opens on hover and on keyboard focus of the trigger (`:focus-visible`; a dialog's initial or restored focus does not open it). A mouse press on the trigger closes it, as Tippy's `hideOnClick` default did, and it then stays closed, focus included, until the pointer re-enters the trigger.
- A hover popover closes 100ms after the pointer leaves target and content, or after the close `delay` if larger.
- A hover popover opens on a touch tap on its target and closes on a tap outside, like `Tooltip` and `Sidebar.Menu`. Mouse clicks are unchanged.
- Escape closes the popover. A controlled popover with `onOpenChange` gets `onOpenChange(false)`; one without gets `onClickOutside()`, so a `visible` plus `onClickOutside` site still closes on Escape. There is no `onEscapeKeyDown` prop. The Escape is consumed while a popover is open, so an enclosing `Modal` closes on the second press.
- `onClickOutside` takes no arguments (Tippy passed `(instance, event)`).
- Focus stays on the trigger, and Tab does not reach content portaled to `document.body`. Content Tippy placed next to the trigger was reachable by Tab.
- A click popover's content has `role="dialog"`, and its trigger span gets `aria-haspopup`, `aria-expanded` and `type="button"`. A test using `getByRole("dialog")` for a `Modal` finds two while a click popover is open.
- Content leaves the target's DOM subtree: ancestor CSS no longer reaches it, ancestor `overflow: hidden` no longer clips it, and tests that queried inside the target's container query `document.body` (`screen` does).
- `text-*` classes on the popover now color its content.

## Sidebar.Menu

- The default `delay` is `[150, 300]` (open, close). The close value is the whole grace for a diagonal move from an item to its menu across a neighbouring link, and an explicit `delay` sets both values (`delay={200}` gives 200ms of grace). Keep the close delay at 300ms or more; a shorter one drops menus on diagonal moves.
- A menu also opens on keyboard focus and on a tap, and closes on Escape, an outside press, another menu opening and a sidebar resize starting. Each calls `onOpenChange(false)`.
- A menu held open with `open` and no `onOpenChange` stays open when another menu opens.

## Modal, Drawer, BottomSheet, Switch, transitions

- `Modal`, `Drawer` and `BottomSheet` keep their public props and callbacks. Radix hides content outside an open dialog from the accessibility tree with `aria-hidden`, so the launcher and other outside controls are absent from the dialog's accessibility snapshot. Focus trapping and return, Escape, outside press, scroll lock and nested backdrop order are preserved. A denied `Modal` outside press still focuses its frame.
- `Switch` still toggles on Space and label click; Enter submits its enclosing form instead of toggling. A form reset restores the mount-time checked state and calls `onChange` with that value. Inside a form, Radix stops the switch click before ancestor `onClick` handlers. The button gains `data-state`, `data-disabled` and `value`, plus `aria-required` when required. A standalone `Switch` no longer generates an id, and `Switch.Label` outside `Switch.Group` renders an unpaired label instead of throwing. Interactive children of a label keep their native actions without toggling the switch.
- `FadeIn` keeps `enter` and `enterTo` after entering and appends `entered`, so persistent resting styles keep working. `SlideDown` keeps an empty, hidden content wrapper while closed. `SubmitButton` and `flash` keep their public APIs, transition durations and callback behavior.

## Tests

- Radix renders one `role="tooltip"` element for an open tooltip, so `getByRole("tooltip")` is the stable query.
- A tooltip or popover leaves the DOM about 250ms after it closes (the fade-out), so wrap "is gone" assertions in `waitFor`.
- jsdom has no `ResizeObserver`, which Radix needs when a popper or the slider mounts. On "ResizeObserver is not defined", stub it in the test setup.
