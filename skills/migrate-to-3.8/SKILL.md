---
name: migrate-to-3.8
description: Use when upgrading an app from @xola/ui-kit 3.7 to 3.8, or when Tooltip, Popover, PopoverList, InlineValuePopover, DatePickerPopover, Sidebar.Menu or RangeSlider props log "was removed in 3.8", or Tippy and noUiSlider styles vanish after the bump.
---

# Migrate @xola/ui-kit 3.7 to 3.8

3.8 moves `Tooltip`, `Popover` and `Sidebar.Menu` from Tippy to Radix, `RangeSlider` from noUiSlider to Radix Slider, and Headless UI from 1.7 to 2.2. It drops every `defaultProps`, adds React 19 form actions to `SubmitButton`, and types the new props in `index.d.ts`. Removed props still compile in JavaScript. In dev builds each logs one warning, `UI Kit <Component>: '<prop>' was removed in 3.8, <replacement>`, and does nothing.

Work through the steps in order. Each ends with a check; do not start the next step until it passes. Run every `rg` command from the app root (a monorepo root is fine). The commands skip `node_modules`, `dist` and `build`.

Fixtures in [fixtures/before](fixtures/before) and [fixtures/after](fixtures/after) show each rule as a pair. A file named in a rule below is the pair for that rule.

## 1. Preflight

- `git status` shows a clean working tree.
- `react` and `react-dom` resolve to 18.3.1 or newer (`npm ls react react-dom`).
- `npm ls @xola/ui-kit` shows 3.8.x (npm version or `github:xola/ui-kit#v3.8.0`) and this file exists at `node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md`.
- The app already builds and its tests pass on 3.7 behavior. Record the failing tests, if any, so the final run separates old failures from new ones.

Done when all four hold.

## 2. Find call sites

Run each command, keep the output, and treat every hit as a candidate. A hit on a component that is not from `@xola/ui-kit` (a Headless UI `Popover`, another library's `visible` prop) is not a site; skip it.

Files that render an affected component (the list the next commands read):

```bash
rg -l -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Removed props as attributes in those files. This matches a prop on its own line, inline, and as a boolean shorthand (`allowHTML`), so it covers multi-line JSX and tags whose `content` prop holds JSX:

```bash
rg -l -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -r rg -nP '(?:^|\s)(visible|enabled|allowHTML|offset|animation|appendTo|trigger|arrow|zIndex|duration|minWidth|onCreate|onShown|onShow|onHide|onMount|onHidden|onDestroy|hideOnClick|interactive|followCursor|interactiveBorder|isLazy|tooltipCustomFormatter)(?:=|\s*/?>|\s*$)'
```

Read the enclosing element for each hit and decide which component owns the prop.

Wrappers and spreads. A wrapper component that forwards `...rest` (or a named prop) into one of these components passes the removed props through. List spreads in the same files:

```bash
rg -l -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -r rg -nP '\{\.\.\.[\w.]+\}'
```

For each wrapper found, fix the wrapper, then re-run the two commands above with the wrapper's tag name in place of the ui-kit tag names to find its call sites.

Objects that reach `popoverProps`, and similar names:

```bash
rg -niP '(popover|tooltip|tippy)_?props' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

`placement: "auto"` and `placement` typed as a plain string:

```bash
rg -nP "placement[^\n]*[\"'\`]auto[\"'\`]|\bplacement\??:\s*string" -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Tippy, noUiSlider and Headless UI, in code, CSS, configs and `package.json`:

```bash
rg -ni 'tippy' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -ni 'noUi|nouislider' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -n '@headlessui/react' -g '!node_modules' -g '!package-lock.json' .
rg -nP 'declare module ["'"'"']@xola/ui-kit["'"'"']' -g '*.d.ts' -g '!node_modules' .
```

The first two catch `import "tippy.js/dist/tippy.css"`, `TippyProps` and `Instance` type imports, bundler `inline` or `noExternal` lists that name Tippy, `@tippyjs/react` and `tippy.js` entries in `package.json`, and `.noUi-*` selectors. The last one finds a `declare module "@xola/ui-kit";` shim.

Done when you have a written list of candidate sites grouped by rule below.

## 3. Apply the rules

Rules 3.1 to 3.4 cover the components. Apply every one that has hits. Kept props need no change: `content`, `placement` (see 3.5), `disabled`, `delay`, `maxWidth`, `className`, `contentClassName` (Tooltip), `role` (Tooltip), `skidding`, `distance`, `onClickOutside`.

Props that are neither kept nor in a table (for example `data-testid` on `Popover`, `PopoverList` or `InlineValuePopover`, or `title` on `Popover.Content`) reached no DOM element under Tippy and still reach none. Leave them.

### 3.1 Tooltip

Fixture: `tooltip-removed-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. |
| `enabled` | Rename to `disabled` and negate the value: `enabled={x}` becomes `disabled={!x}`. |
| `offset={[s, d]}` | `skidding={s}` and `distance={d}`. Omit a value equal to its default (skidding 0, distance 10). |
| `animation`, `appendTo`, `arrow`, `zIndex`, `duration`, `minWidth`, `onCreate`, `onShown`, `hideOnClick`, `interactive`, `followCursor`, `interactiveBorder` | Delete. There is no replacement. The tooltip portals to `document.body`, stacks at z-index 9999 and has one built-in fade. |
| `trigger` with a static string | Delete. A tooltip opens on hover and keyboard focus. |
| `trigger` computed at runtime | Hand review, see section 4. |
| `allowHTML` | Hand review, see section 4. |

### 3.2 Popover, PopoverList, InlineValuePopover, DatePickerPopover

Fixtures: `popover-trigger.tsx`, `popover-default-hover.tsx`, `popover-controlled.tsx`, `popover-list-spread.tsx`, `inline-value-popover.tsx`, `date-picker-popover-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `trigger="click"` | `openOn="click"`. |
| `trigger="mouseenter"` | Delete. Hover is the default. |
| `visible` | Rename to `open`. See the primitive rule below. |
| `enabled` | Rename to `disabled` and negate the value. |
| `offset={[s, d]}` | `skidding={s}` and `distance={d}`. Omit defaults (0, 10). `offset` used to override both. |
| `onMount`, `onShow`, `onShown`, `onHide`, `onHidden`, `onCreate` | `onOpenChange(open)`. It receives a boolean, never a Tippy instance. If the old callback used the instance, see section 4. |
| `appendTo={document.body}` or a function returning it | Delete. Content always portals to `document.body`. |
| `appendTo` with any other node | Hand review, see section 4. |
| `animation`, `arrow`, `zIndex`, `duration`, `minWidth`, `hideOnClick`, `interactive`, `interactiveBorder`, `followCursor`, `isLazy` | Delete. Content mounts only while open and always stacks at z-index 50. |

`PopoverList`, `InlineValuePopover` and `DatePickerPopover` forward their extra props (`PopoverList` and `InlineValuePopover` through `...rest`, `DatePickerPopover` through `popoverProps`) to `Popover`, so the same table applies at their call sites, in wrappers that spread `...rest` into them, and in the objects found in step 2. A wrapper's own prop types must drop a removed prop too, or its callers still compile.

`InlineValuePopover` already sets `openOn="click"` and `open={isOpen}`. Do not add either. Keep `isOpen` and `onClickOutside`.

Primitive rule, which decides how `open` and `openOn` combine:

- An explicit `openOn` always wins.
- With no `openOn`, a popover whose `open` is defined on its first render is a click popover (Radix Popover). Its content is tabbable and it has no hover behavior.
- With no `openOn` and `open` undefined, the popover is a hover popover (Radix HoverCard). It opens on hover and on trigger focus.
- The choice is made once, at mount. A popover whose `open` starts `undefined` stays a hover popover for its whole life, even after `open` is set. Start the state at `false`: `useState<boolean>()` becomes `useState(false)`.

Do not add `openOn` to a popover that had no `trigger` and no `visible`. It stays hover, and `popover-default-hover.tsx` is the same file before and after.

A hover popover moves every focusable element in its content out of the tab order. A popover that holds inputs, selects or links needs `openOn="click"`.

Behavior changes to know before touching tests:

- Escape closes the popover. A controlled popover with `onOpenChange` gets `onOpenChange(false)`. A controlled popover with no `onOpenChange` gets `onClickOutside()` instead, so a `visible` plus `onClickOutside` site still closes on Escape. There is no `onEscapeKeyDown` prop. The Escape is consumed while a popover is open, so an enclosing `Modal` closes on the second press.
- `onClickOutside` takes no arguments (Tippy passed `(instance, event)`).
- Focus stays on the trigger and Tab does not reach content that is portaled to `document.body`. Content that Tippy placed next to the trigger used to be reachable by Tab.
- Click popovers have `role="dialog"` on the content, and the trigger span gets `aria-haspopup`, `aria-expanded` and `type="button"`. A test that uses `getByRole("dialog")` for a `Modal` finds two while a click popover is open.
- Content leaves the target's DOM subtree. Ancestor CSS no longer reaches it, ancestor `overflow: hidden` no longer clips it, and tests that query inside the target's container must query `document.body` (`screen` does).
- Hover popovers close 100ms after the pointer leaves target and content (or the close `delay`, if larger).
- Hover popovers no longer open on a touch tap on iOS. Tap does not focus buttons there. Use `openOn="click"` where touch matters.
- `skidding` shifts content only for `-start` and `-end` placements.
- `text-*` classes on the popover now color its content.

### 3.3 Sidebar.Menu

Fixture: `sidebar-menu.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. A plain rename keeps working. |
| `onMount`, `onShow`, `onHide`, `onHidden`, `onDestroy` | `onOpenChange(open)`. If the callback used the Tippy instance (`instance.hide()`, `instance.popper`), see below. |

Other props that Tippy accepted (`placement`, `offset`, `interactive`, `appendTo`) are ignored without a warning. Delete them.

Replace an instance ref with controlled state: `const [isMenuOpen, setIsMenuOpen] = useState(false)`, `open={isMenuOpen}`, `onOpenChange={setIsMenuOpen}`, and `setIsMenuOpen(false)` where the code called `instance.hide()`. A native listener added to `instance.popper` becomes a React `onClick` on the `content` element (the menu is a React portal, so it sees clicks on every item).

Behavior changes:

- The default `delay` is `[150, 300]` (open, close). The close value is the whole grace for a diagonal move from an item to its menu across a neighbouring link. An explicit `delay` sets both values, so `delay={200}` gives 200ms of grace. Do not shorten it to make menus vanish faster.
- A menu also opens on keyboard focus and on a tap (touch screens), and closes on Escape, an outside press, another menu opening, and a sidebar resize starting. Each of these calls `onOpenChange(false)`.
- A menu held open with `open` and no `onOpenChange` stays open when another menu opens.
- `hideAllSidebarMenus` is not a public export. Do not import it.

### 3.4 RangeSlider

Fixture: `range-slider.tsx` and `range-slider.css`.

- `tooltipCustomFormatter` (an array of `{ from, to }`) becomes `formatTooltip={(value, index) => string}`. Use the old `to` function body. Delete the array, the `{ from, to }` objects and the `values.map(() => ...)` that built it. `formatTooltip` replaces `tooltipSuffix`; keep one of them.
- `onChange` now receives `number[]`. Remove `Number(...)`, `.map(Number)` and `Number.parseFloat(vals[0])`, and change a `(next: string[])` annotation to `number[]` or it fails the type check. It fires once on release or keyboard commit, as before.
- A `.noUi-*` selector that moved a tooltip (for example `.noUi-handle[data-handle="1"] .noUi-tooltip` with `top: auto; bottom: 130%`) is replaced by `tooltipPlacement={["bottom", "top", "bottom"]}`, one entry per handle. Delete the CSS rules. Delete the file when nothing else is in it, and the `import` of it. `fixtures/after` has no `range-slider.css` for that reason. Other `.noUi-*` rules: hand review, see section 4.
- `values` is still semi-controlled: a new array with different numbers moves the thumbs, an equal array does not, and a `key` change remounts.

### 3.5 Types

Fixtures: `tippy-props-type.tsx`.

- Replace `import type { TippyProps } from "@tippyjs/react"` with `import type { PopoverProps } from "@xola/ui-kit"` (or `TooltipProps` for a tooltip wrapper) and swap the name in `extends Except<TippyProps, "children">` or similar. A Tippy prop that `PopoverProps` lacks is a removed prop: fix it through the tables above.
- `placement` is a `Placement` union: `"top"`, `"bottom"`, `"left"`, `"right"`, each optionally with `-start`, `-center` or `-end`. `placement="auto"` and a `placement` variable typed `string` now fail the type check. At runtime ui-kit maps `"auto"` and unknown strings to `"top"`. Delete `placement="auto"`: Radix flips on collision. For a wrapper that forwards `placement?: string`, type it as `Placement` (import the type from `@xola/ui-kit`) and change an `"auto"` default, see section 4.
- `delay` is `number | [number, number]`. A `number[]` variable fails the type check; type it as a tuple.
- Delete any `declare module "@xola/ui-kit";` shim (it types every export as `any` and hides these errors). Then run the type check and fix each new error. Do not restore the shim.

### 3.6 Headless UI 1 to 2 (direct imports only)

Fixture: `headless-ui-2.tsx`.

3.8 runs on Headless UI 2.2. This section applies to an app that imports `@headlessui/react` itself and shares one copy with ui-kit, either through a bundler `dedupe` entry or because `npm ls @headlessui/react` shows a single deduped 2.x. If it shows a separate older copy under the app, the app's own Headless UI imports are unaffected, and this section is done. A shared copy needs the app's own pin bumped to `^2.2.10`.

Required changes:

- `Dialog.Overlay` is removed and throws "Element type is invalid". Use `DialogBackdrop` for the dim layer plus a `DialogPanel` around the content; v2 closes the dialog on a click outside the panel. `DialogBackdrop` has no click handler.
- `<Transition>` without an `as` prop now renders no wrapper element (the default changed from `div` to a fragment). Add `as="div"`, or make sure the single child forwards a `ref`, or it throws "Did you forget to passthrough the `ref`".

Rename when you touch the file. The old names still work and keep their behavior:

| 1.x | 2.x |
| --- | --- |
| `Dialog.Panel`, `Dialog.Title` | `DialogPanel`, `DialogTitle` |
| `Dialog.Description`, `Switch.Description` | `Description` |
| `Transition.Child`, `Transition.Root` | `TransitionChild`, `Transition` |
| `Switch.Group`, `Switch.Label` | `Field`, `Label` |
| `Disclosure.Button`, `Disclosure.Panel` | `DisclosureButton`, `DisclosurePanel` |

Behavior changes in `Dialog`:

- Initial focus goes to the first `[data-autofocus]` element, else the dialog container. 1.7 focused the first focusable element. `autoFocus={false}` on `Dialog` restores that, and an `initialFocus` ref still wins. Touch devices skip initial focus.
- Escape blurs the active element before it calls `onClose`.
- A click on `DialogBackdrop` bubbles to document `click` listeners (analytics, `useClickAway`). 1.7 `Dialog.Overlay` stopped it. `DialogPanel` still stops clicks inside it.
- Inside `Field`, `Label` is a `<label>` and clicks toggle its `Switch`. An explicit `id` on the `Switch` breaks that lookup unless the `Label` gets the same value as `htmlFor`. The deprecated `Switch.Label` does not depend on ids.
- The dependency tree grows (react-aria, react-stately, `@internationalized/*`, `@floating-ui/react`). Expect a larger lockfile diff.

## 4. Hand-review list

A rule cannot settle these. Decide each one from the surrounding code, and write the decision in the commit or PR description.

- Tippy instance callbacks: `onMount`, `onShown`, `onHide`, `onCreate` that read `instance` (`instance.hide()`, `instance.popper`, `instance.setProps`), and a `popperInstance` read. Replace with controlled `open` state and `onOpenChange`. Behavior that depended on `instance.popper` needs a React `onClick` on the content.
- `import type { Instance } from "tippy.js"` and any other type from `tippy.js` or `@tippyjs/react` (`Placement`, `Props`). These resolved only through ui-kit's dependency. 3.8 no longer installs it, so the import fails. Delete the type and the code that needs it.
- `allowHTML` on `Tooltip`. Pass JSX as `content` and delete `allowHTML`. If `content` was an HTML string, convert it to JSX and do not inject unsanitized HTML.
- A `Tooltip` with `interactive`. Tooltip content is not hoverable now. Use a `Popover` if the user must reach links or buttons inside.
- A dynamic `trigger` (`trigger={cond ? "mouseenter" : "manual"}`, `trigger="focus"`, `trigger="click"` on a `Tooltip`). `Tooltip` has no trigger prop. Use `disabled={!cond}` for on and off, or `open` with `onOpenChange` for full control.
- `appendTo` that is not `document.body` (a function, a parent id lookup, a ref). Delete it if the content only needed to escape clipping. If the content must stay inside a container (a modal's stacking context, a scaled or translated parent), it needs a different approach, and ui-kit has no `container` prop. Raise it before changing anything.
- Wrappers that forward `placement: string`. Type them as `Placement`. Wrappers with a default `placement = "auto"` (form fields that show a tooltip) lose the "auto" side choice. Pick a default side, usually `"top"`, and check the layout.
- `popoverProps` objects with `placement: "auto"` (`DatePickerPopover`). Delete the key. `DatePickerPopover` then keeps its own `"bottom"`, which Tippy's auto often chose. A calendar near the bottom edge of a modal flips on collision.
- `Popover` with a `content` prop. It is still supported and replaces the `Popover.Content` child. It is not wrapped in the `ui-popover-content` div. Check that tests and styles that found the body through that class still find it.
- App-level `import "tippy.js/dist/tippy.css"` and `@tippyjs/react` or `tippy.js` entries in `package.json`, and Tippy names in a bundler `inline` or `noExternal` list. Delete them when nothing in the app renders Tippy itself. If the app renders `@tippyjs/react` directly, keep the dependency, add it to `package.json` (ui-kit no longer provides it) and import `tippy.js/dist/tippy.css` yourself: ui-kit's `build/style.css` no longer contains Tippy CSS.
- Tests, mocks and comments that assume Tippy: a `jest.mock` or `vi.mock` of `@tippyjs/react`, a comment that Tippy never opens in jsdom, and helpers named after Tippy (`handleShouldCloseTippy`). Re-run each such test without the mock and keep the mock only if it still fails. Rename leftover helpers.
- CSS that targets `.tippy-*` classes or `data-tippy-*` attributes. Radix content has `ui-tooltip`, `ui-popover` and `ui-sidebar-menu` classes and `data-state` and `data-side` attributes. Rewrite the rule against those or drop it.
- `.noUi-*` selectors other than the tooltip placement rule in 3.4, for example handle size or track color. The Radix DOM has different elements. Rewrite against ui-kit's `ui-range-slider`, `ui-range-slider-track`, `ui-range-slider-thumb` and `ui-range-slider-tooltip` classes or drop the override.
- Tests that assert on a Tooltip or Popover. Radix renders one `role="tooltip"` element for an open tooltip, so `getByRole("tooltip")` is the stable query. The bubble leaves the DOM about 250ms after it closes, so wrap "is gone" assertions in `waitFor`. jsdom has no `ResizeObserver`, which Radix needs when a popper or the slider mounts. If a test fails with "ResizeObserver is not defined", add a stub in the test setup.
- Dialog-stack workarounds written against Headless UI 1 internals, for example a closed `static` `Dialog` rendered only to register a nested dialog. Confirm focus and Escape behavior by hand.
- Hover popovers on touch devices. They no longer open on a tap on iOS. Choose `openOn="click"` where tablets or phones use the control. `Sidebar.Menu` still opens on a tap. Confirm on a real iOS and Android device.

## 5. Verify

Run the app's own scripts, all green:

```bash
npm run lint
npx tsc --noEmit      # TypeScript apps
npm test
npm run build
```

Then re-run the step 2 commands. Done when:

- The removed-props command finds only props on components that are not from ui-kit.
- The `tippy` command finds nothing, or only the app's own `@tippyjs/react` usage that you chose to keep.
- The `noUi` command finds nothing, and `declare module "@xola/ui-kit"` is gone.
- A dev run of the app and its tests logs no line containing `was removed in 3.8`.

Manual checks in the browser, one per kind of component the app uses:

- Tooltip: hover and keyboard focus show it, Escape and moving away hide it, and a tooltip on a disabled button still shows.
- Hover popover: opens on hover and focus, stays open while the pointer crosses to the content, closes on an outside click.
- Click and controlled popover: opens on click, closes on an outside click and Escape, and inside a `Modal` the first Escape closes the popover and the second closes the modal. Tab order is unchanged around the trigger.
- `DatePickerPopover`: opens at the right side, including inside a modal and near a viewport edge.
- `Sidebar.Menu`: hover opens it after about 150ms, a diagonal move to a low item keeps it open, a second menu replaces the first, and a tap opens it on a touch device.
- `RangeSlider`: drag and arrow keys move handles, the tooltip text and placement match, release calls `onChange` once with numbers.
- Headless UI dialogs and transitions that the app imports directly: they open, trap focus, close on Escape and an outside click, and animate.
