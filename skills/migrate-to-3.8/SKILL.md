---
name: migrate-to-3.8
description: Use when upgrading an app from @xola/ui-kit 3.7 to 3.8, or when Tooltip, Popover, PopoverList, InlineValuePopover, DatePickerPopover, Sidebar.Menu or RangeSlider props log "was removed in 3.8", or Tippy and noUiSlider styles vanish after the bump.
---

# Migrate @xola/ui-kit 3.7 to 3.8

3.8 moves `Tooltip`, `Popover` and `Sidebar.Menu` from Tippy to Radix, `RangeSlider` from noUiSlider to Radix Slider, and removes ui-kit's Headless UI dependency. Dialogs and `Switch` use Radix, while transitions use local staged classes or Radix Collapsible. It drops every `defaultProps`, adds React 19 form actions to `SubmitButton`, and types the new props in `index.d.ts`. Removed props still compile in JavaScript. In dev builds each logs one warning, `UI Kit <Component>: '<prop>' was removed in 3.8, <replacement>`, and does nothing.

Work through the steps in order. Each ends with a check; do not start the next step until it passes. Run every `rg` command from the app root (a monorepo root is fine). The commands skip `node_modules`, `dist` and `build`.

Fixtures in [fixtures/before](fixtures/before) and [fixtures/after](fixtures/after) show each rule as a pair. A file named in a rule below is the pair for that rule.

## 1. Preflight

- `git status` shows a clean working tree.
- `react` and `react-dom` resolve to 18.3.1 or newer (`npm ls react react-dom`).
- `npm ls @xola/ui-kit` shows 3.8.x (npm version or `github:xola/ui-kit#v3.8.0`) and this file exists at `node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md`. In a monorepo, every workspace that depends on `@xola/ui-kit` moves to 3.8 in the same change. A shared package that still resolves 3.7 breaks, for example on `import type { Placement } from "@xola/ui-kit"`.
- The app already builds and its tests pass on 3.7 behavior. Record the failing tests, if any, so the final run separates old failures from new ones.

Done when all four hold.

## 2. Find call sites

Run each command, keep the output, and treat every hit as a candidate. Expect many false hits: the removed-props command matches whole files, so local variables named `offset` or `visible`, another library's `appendTo` (a `ComboBox` menu), a Headless UI `Popover`, comments and strings all match. Confirm that each hit is an attribute on a `@xola/ui-kit` element (or on a wrapper of one) before you edit it, and skip the rest. After the `declare module` shim is deleted (3.5), `tsc` also reports removed props on the typed components (`Tooltip`, `Popover`, `Popover.Content`, `Sidebar` and its parts (including `Sidebar.Menu`), and `RangeSlider`), which makes it a second net there. `PopoverList`, `InlineValuePopover` and `DatePickerPopover` are typed `any` in `index.d.ts`, and so is any wrapper that spreads props into them, so `tsc` never reports removed props on those. The search commands are the only net for them.

Before searching, inventory aliased `@xola/ui-kit` imports and record each affected component's exact local JSX tag: `PopoverList as ActionsMenu` becomes `ActionsMenu`, and `Sidebar as Navigation` becomes `Navigation.Menu`. Add these local tags to the component alternation in the file-list, removed-props, wrappers/spreads and `RangeSlider` commands below. Otherwise `<ActionsMenu visible={isOpen} />` escapes every search, and `tsc` cannot catch it for components typed `any`.

Files that render an affected component (the list the next commands read):

```bash
rg -l -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Removed props as attributes in those files. A prop name must be followed by `=`, whitespace, `/`, `>` or the end of the line, so the command matches a prop on its own line, inline, and as a boolean shorthand (`<Tooltip allowHTML content={x}>`). It covers multi-line JSX and tags whose `content` prop holds JSX:

```bash
rg -l0 -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -0 -r rg -HnP '(?:^|\s)(visible|enabled|allowHTML|offset|animation|appendTo|trigger|arrow|zIndex|duration|minWidth|onCreate|onShown|onShow|onHide|onMount|onHidden|onDestroy|hideOnClick|interactive|followCursor|interactiveBorder|isLazy|tooltipCustomFormatter)(?=[\s=/>]|$)'
```

Read the enclosing element for each hit and decide which component owns the prop.

Wrappers and spreads. A wrapper component that forwards `...rest` (or a named prop) into one of these components passes the removed props through. List spreads in the same files:

```bash
rg -l0 -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -0 -r rg -HnP '\{\.\.\.[\w.]+\}'
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

Every `RangeSlider` element, whether or not it has a removed prop. Its `onChange` handler changes even when no other prop does:

```bash
rg -nP '<RangeSlider\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Tippy, noUiSlider and Headless UI, in code, CSS, configs and `package.json`:

```bash
rg -ni 'tippy' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -ni 'noUi|nouislider' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -n '@headlessui/react' -g '!node_modules' -g '!package-lock.json' .
rg -nP 'declare module ["'"'"']@xola/ui-kit["'"'"']' -g '*.d.ts' -g '!node_modules' .
```

The first two catch `import "tippy.js/dist/tippy.css"`, `TippyProps` and `Instance` type imports, bundler `inline` or `noExternal` lists that name Tippy, `@tippyjs/react` and `tippy.js` entries in `package.json`, and `.noUi-*` selectors. The Headless UI command finds direct imports that need an explicit app dependency (3.6). The last one finds a `declare module "@xola/ui-kit";` shim.

Done when you have a written list of candidate sites grouped by rule below.

## 3. Apply the rules

Rules 3.1 to 3.4 cover the components. Apply every one that has hits. Kept props need no change: `content`, `placement` (see 3.5), `disabled`, `delay`, `maxWidth`, `className`, `contentClassName` (Tooltip), `role` (Tooltip), `skidding`, `distance`, `onClickOutside`.

Edit in place. A renamed or converted prop keeps the old prop's position among the attributes, a deleted prop is removed, and nothing is sorted or reordered (imports included). A wrapper's own props keep their names: rename a prop only on the ui-kit element (`visible={isVisible}` becomes `open={isVisible}`).

Props that are neither kept nor in a table (for example `data-testid` on `Popover`, `PopoverList` or `InlineValuePopover`) reached no DOM element under Tippy and still reach none. Leave them. The exception is `title` on `Popover.Content`: it was a no-op, and `PopoverContentProps` has no `title`, so `tsc` rejects it once the shim is gone. Delete it.

### 3.1 Tooltip

Fixture: `tooltip-removed-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. |
| `enabled` | Rename to `disabled` and negate the value: `enabled={x}` becomes `disabled={!x}`. |
| `offset={[s, d]}` | `skidding={s}` and `distance={d}`, both in the place of `offset`. Omit a value equal to its default (skidding 0, distance 10). On a `-end` placement write `skidding={-s}`: Radix reverses the shift for `-end`, Tippy did not. |
| `animation`, `appendTo`, `arrow`, `zIndex`, `duration`, `minWidth`, `onCreate`, `onShown`, `hideOnClick`, `followCursor`, `interactiveBorder` | Delete. There is no replacement. The tooltip portals to `document.body`, stacks at z-index 9999 and has one built-in fade. |
| `trigger="mouseenter"` or `trigger="mouseenter focus"` | Delete. A tooltip opens on hover and keyboard focus. |
| Any other `trigger` (`"focus"`, `"click"`, `"manual"`, a runtime value) | Hand review, see section 4. |
| `interactive` | Delete when the content is plain text. When the content holds links or buttons, a tooltip is the wrong component: hand review, see section 4. |
| `allowHTML` | Hand review, see section 4. |

Behavior changes:

- A tooltip opens on hover and on keyboard focus of the target. Tippy never opened on focus inside the target. Only focus that matches `:focus-visible` counts: focus a dialog moves from script (its initial focus, or focus given back to the opener on close) opens nothing after a mouse click.
- A touch tap on the target toggles the tooltip and a tap outside closes it, as Tippy's did. The tap still reaches the wrapped control.
- Escape closes the tooltip. A controlled tooltip with no `onOpenChange` gets `onClickOutside()` instead, so a `visible` plus `onClickOutside` site now closes on Escape (Tippy ignored Escape). For a tooltip held open with neither, see section 4.

### 3.2 Popover, PopoverList, InlineValuePopover, DatePickerPopover

Fixtures: `popover-trigger.tsx`, `popover-default-hover.tsx`, `popover-controlled.tsx`, `popover-list-spread.tsx`, `inline-value-popover.tsx`, `date-picker-popover-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `trigger="click"` | `openOn="click"` in place, also when `visible` is set on the same element. |
| `trigger="mouseenter"` or `trigger="mouseenter focus"` | Delete. Hover is the default. |
| `trigger="manual"` | Delete. The popover is controlled through `open` (renamed from `visible`); start its state at `false`. With no `visible` on the element, hand review, see section 4. |
| A runtime `trigger` that only switches the popover on and off (`trigger={cond ? undefined : "manual"}`, no `visible`) | `disabled={!cond}`, in the place of `trigger`. |
| Any other `trigger` (`"focus"`, `"click mouseenter"`, other runtime values) | Hand review, see section 4. |
| `visible` | Rename to `open`. See the primitive rule below. |
| `enabled` | Rename to `disabled` and negate the value. |
| `offset={[s, d]}` | `skidding={s}` and `distance={d}`, both in the place of `offset`. Omit defaults (0, 10). On a `-end` placement write `skidding={-s}`. `offset` used to override both. |
| `onMount`, `onShow`, `onShown`, `onHide`, `onHidden`, `onCreate` | `onOpenChange(open)`. It receives a boolean, never a Tippy instance. If the old callback used the instance, see section 4. |
| `appendTo={document.body}` or a function returning it | Delete. Content always portals to `document.body`. |
| `appendTo` with any other node | Delete `appendTo`, flag the site, keep it on the hand-review list, and do the stacking check in section 4. |
| `animation`, `arrow`, `zIndex`, `duration`, `minWidth`, `hideOnClick`, `interactive`, `interactiveBorder`, `followCursor`, `isLazy` | Delete. Content mounts only while open and stacks at z-index 50 unless `className` sets another (see the stacking check in section 4). |

`PopoverList`, `InlineValuePopover` and `DatePickerPopover` forward their extra props (`PopoverList` and `InlineValuePopover` through `...rest`, `DatePickerPopover` through `popoverProps`) to `Popover`, so the same table applies at their call sites, in wrappers that spread `...rest` into them, and in the objects found in step 2. A wrapper's own prop types must drop a removed prop too, and so must its callers, or they still compile. When a `popoverProps` object ends up empty (`{}`), or an object constant is left empty, delete the `popoverProps` attribute (and the constant).

Delete plumbing that only existed to feed a removed prop: a `popoverParentId` or `parentId` prop or id that fed `appendTo`, an `inModal` flag that only picked a `popoverProps` object, a ref or state that only a Tippy callback used. Delete the matching argument at each caller, and keep going until the linter reports no unused variable.

`InlineValuePopover` already sets `openOn="click"` and `open={isOpen}`. Do not add either. Keep `isOpen` and `onClickOutside`.

Primitive rule, which decides how `open` and `openOn` combine:

- An explicit `openOn` always wins.
- With no `openOn`, a popover whose `open` is defined on its first render is a click popover (Radix Popover). Its content is tabbable and it has no hover behavior.
- With no `openOn` and `open` undefined, the popover is a hover popover (Radix HoverCard). It opens on hover and on keyboard focus of the trigger (`:focus-visible`; a dialog's initial focus or the focus it restores does not open it), and a mouse press on the trigger closes it, as Tippy's `hideOnClick` default did. After that press it stays closed, focus included, until the pointer re-enters the trigger.
- The choice is made once, at mount. A popover whose `open` starts `undefined` stays a hover popover for its whole life, even after `open` is set. Start the state at `false`: `useState<boolean>()` becomes `useState(false)`. Changing `openOn` after mount swaps the primitive and remounts the target, so keep it constant.

Whether to add `openOn` keeps Tippy's behavior:

- A popover that had no `trigger` and no `visible` stays a hover popover, with no `openOn`. `popover-default-hover.tsx` is the same file before and after.
- A hover popover keeps its content open while the pointer moves onto it, so links and buttons inside stay usable with a mouse. A hover popover takes every focusable element in its content out of the tab order, so Tab and keyboard users never reach it. Leave links and buttons as hover and accept that loss, or add `openOn="click"` where keyboard access matters. A hover popover also does not open on a touch tap (see the touch bullet below), so links in it are unreachable on tablets: add `openOn="click"` where touch matters.
- Content with fields the user types in (inputs, selects, textareas) needs `openOn="click"`, because a field that cannot take focus is unusable.

An app hook that drives `open` from hovering the target (`useHover` plus `visible={isHovering}`, with the Tippy `interactive` content inside the hover target) changes behavior. `open` selects the click primitive, and the content portals out of the hover target, so moving the pointer onto it ends the hover and closes the popover. Delete the hook and the `visible` prop, and use the default hover popover. If the hover state is also used elsewhere, or if `visible` combines the hover with other conditions (`open={isHovering || isPinned}`), hand review, see section 4: deleting the prop would drop those conditions.

Behavior changes to know before touching tests:

- Escape closes the popover. A controlled popover with `onOpenChange` gets `onOpenChange(false)`. A controlled popover with no `onOpenChange` gets `onClickOutside()` instead, so a `visible` plus `onClickOutside` site still closes on Escape. There is no `onEscapeKeyDown` prop. The Escape is consumed while a popover is open, so an enclosing `Modal` closes on the second press. For a popover held open with neither callback, see section 4.
- `onClickOutside` takes no arguments (Tippy passed `(instance, event)`).
- Focus stays on the trigger and Tab does not reach content that is portaled to `document.body`. Content that Tippy placed next to the trigger used to be reachable by Tab.
- Click popovers have `role="dialog"` on the content, and the trigger span gets `aria-haspopup`, `aria-expanded` and `type="button"`. A test that uses `getByRole("dialog")` for a `Modal` finds two while a click popover is open.
- Content leaves the target's DOM subtree. Ancestor CSS no longer reaches it, ancestor `overflow: hidden` no longer clips it, and tests that query inside the target's container must query `document.body` (`screen` does).
- Hover popovers close 100ms after the pointer leaves target and content (or the close `delay`, if larger).
- Hover popovers no longer open on a touch tap. Use `openOn="click"` where touch matters. `Tooltip` and `Sidebar.Menu` do open on a tap.
- `skidding` shifts content only for `-start` and `-end` placements, and the shift is reversed for `-end` (Radix negates it, Tippy did not). Pass `skidding={-s}` there.
- `text-*` classes on the popover now color its content.

### 3.3 Sidebar.Menu

Fixture: `sidebar-menu.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. A plain rename keeps working. |
| `onMount`, `onShow`, `onHide`, `onHidden`, `onDestroy` | `onOpenChange(open)`. If the callback used the Tippy instance (`instance.hide()`, `instance.popper`), see below. |

Other props that Tippy accepted (`placement`, `offset`, `interactive`, `appendTo`) are ignored without a warning. Delete them.

Replace an instance ref with controlled state:

- Replace the ref declaration with `const [isMenuOpen, setIsMenuOpen] = useState(false)`, and add `useState` to the `react` import. Drop `useRef` from that import only when nothing else in the file uses it.
- Delete the instance type and the mount handler that only stored the instance in the ref.
- Write `open={isMenuOpen}` as the first prop of `Sidebar.Menu`, and `onOpenChange={setIsMenuOpen}` in the place of the removed callback.
- Write `setIsMenuOpen(false)` where the code called `instance.hide()`.

A native listener added to `instance.popper` becomes a React `onClick` on the `content` element (the menu is a React portal, so it sees clicks on every item).

Behavior changes:

- The default `delay` is `[150, 300]` (open, close). The close value is the whole grace for a diagonal move from an item to its menu across a neighbouring link. An explicit `delay` sets both values, so `delay={200}` gives 200ms of grace. Do not shorten it to make menus vanish faster.
- A menu also opens on keyboard focus and on a tap (touch screens), and closes on Escape, an outside press, another menu opening, and a sidebar resize starting. Each of these calls `onOpenChange(false)`.
- A menu held open with `open` and no `onOpenChange` stays open when another menu opens.
- `hideAllSidebarMenus` is not a public export. Do not import it.

### 3.4 RangeSlider

Fixture: `range-slider.tsx` and `range-slider.css`.

- `tooltipCustomFormatter` (an array of `{ from, to }`) becomes `formatTooltip={(value, index) => string}`. Define `const formatTooltip = (value: number) => ...` at module scope, in the place of the `{ from, to }` formatter object, with the body of its `to` function. Delete the `values.map(() => ...)` constant that built the array. Write `formatTooltip={formatTooltip}` in the place of the `tooltipCustomFormatter` attribute. `formatTooltip` replaces `tooltipSuffix`; keep one of them.
- `onChange` now receives `number[]`. Every `RangeSlider` `onChange` handler drops its conversion, including the forms `value.map(Number)` followed by a state setter and `Number.parseFloat(vals[0])`. A handler that only converted strings to numbers and forwarded the result to a function (a prop callback such as `onChange(next.map(Number))`, or a state setter) is deleted: pass that function directly (`onChange={onChange}`, `onChange={setValues}`). In any other handler remove `Number(...)`, `.map(Number)` and `Number.parseFloat(vals[0])`, and change a `(next: string[])` annotation to `number[]` or it fails the type check. If these deletions leave a component body that holds only `return (...)`, collapse it to an expression body. It fires once on release or keyboard commit, as before.
- A `.noUi-*` selector that moved a tooltip (for example `.noUi-handle[data-handle="1"] .noUi-tooltip` with `top: auto; bottom: 130%`) is replaced by a `tooltipPlacement` array with one entry per handle (`values.length`; entries beyond the handle count are ignored, and a handle with no entry gets `"bottom"`; a plain string applies to every handle): `"top"` at the index N of each `data-handle="N"` the CSS moved above the track, `"bottom"` for the others (for three handles, `["bottom", "top", "bottom"]`). Write `tooltipPlacement` in the place of `tooltipCustomFormatter`, before `formatTooltip`. Delete the CSS rules. Delete the file when nothing else is in it, and the `import` of it. `fixtures/after` has no `range-slider.css` for that reason. Other `.noUi-*` rules: hand review, see section 4.
- `values` is still semi-controlled: a new array with different numbers moves the thumbs, an equal array does not, and a `key` change remounts.

### 3.5 Types

Fixtures: `tippy-props-type.tsx`.

- Replace the line `import type { TippyProps } from "@tippyjs/react"` in place with `import type { PopoverProps } from "@xola/ui-kit"` (or `TooltipProps` for a tooltip wrapper). A plain `import { TippyProps } from "@tippyjs/react"` is replaced by the same `import type` line. Keep it a separate line; do not merge it into the value import. Swap the name in `extends Except<TippyProps, "children">` or similar. A Tippy prop that `PopoverProps` lacks is a removed prop: fix it through the tables above.
- `placement` is a `Placement` union: `"top"`, `"bottom"`, `"left"`, `"right"`, each optionally with `-start`, `-center` or `-end`. `placement="auto"` and a `placement` variable typed `string` now fail the type check. At runtime ui-kit maps `"auto"` and unknown strings to `"top"`. Delete `placement="auto"`: Radix flips on collision. For a wrapper that forwards `placement?: string`, type it as `Placement` (import the type from `@xola/ui-kit`) and change an `"auto"` default, see section 4.
- `delay` is `number | [number, number]`. A `number[]` variable fails the type check; type it as a tuple.
- Delete any `declare module "@xola/ui-kit";` shim (it types every export as `any` and hides these errors). Then run the type check and fix each new error with 3.7 below. Do not restore the shim.

### 3.6 Headless UI removal

3.8 removes `@headlessui/react` from ui-kit. `Modal`, `Drawer`, `BottomSheet` and `Switch` use Radix. `SlideDown` uses Radix Collapsible; `FadeIn`, `SubmitButton` and `flash` use local transition stages.

If the app imports `@headlessui/react` directly, declare it in the app's own `package.json` at the version the app has tested. ui-kit no longer provides, dedupes or upgrades that copy. Keep the app's own imports and test them against that declared version. If nothing in the app imports Headless UI, no replacement is needed. Delete `overrides`, `resolutions`, bundler `dedupe` entries and test-runner `moduleNameMapper` entries that existed only for ui-kit's old copy. Run `npm install` after changing dependencies so the lockfile stays in sync.

The `headless-ui-2.tsx` fixture pair records the former shared-copy 1.x-to-2.x migration. It is historical, not a required 3.8 change. Do not apply those renames unless the app independently chooses to upgrade its own Headless UI dependency.

Behavior changes in ui-kit components:

- `Modal`, `Drawer` and `BottomSheet` keep their public props and callbacks. Radix hides content outside an open dialog from the accessibility tree with `aria-hidden`, so tests must not expect the launcher or other outside controls in the dialog's accessibility snapshot. Focus trapping and return, Escape, outside press, scroll lock and nested backdrop order are preserved. A denied Modal outside press still focuses its frame.
- `Switch` still toggles on Space and label click, and Enter submits its enclosing form instead of toggling. A form reset now restores the mount-time checked state and calls `onChange` with that value. Inside a form, Radix stops the switch click before ancestor `onClick` handlers. The button gains `data-state`, `data-disabled` and `value` attributes, plus `aria-required` when required. A standalone Switch no longer generates an id, and `Switch.Label` outside `Switch.Group` renders an unpaired label instead of throwing. Interactive children of a label keep their native actions without toggling the switch.
- `FadeIn` removes `enter` and `enterTo` after entering. Put persistent resting styles in `entered`. `SlideDown` keeps an empty, hidden content wrapper while closed. `SubmitButton` and `flash` keep their public APIs, transition durations and callback behavior.

### 3.7 Type errors once the shim is gone

Deleting the `declare module "@xola/ui-kit";` shim (3.5) types the typed components (`Tooltip`, `Popover`, `Popover.Content`, `Sidebar` and its parts (including `Sidebar.Menu`), and `RangeSlider`). Props the shim hid now fail. These patterns are known. Fix each at its source, never with a cast.

- A dead prop that was never part of the component, for example `to` on `Sidebar.Link`: delete it. `Sidebar.Link` renders a `<button>` and `to` only became an inert attribute. Navigation belongs in `onClick`. Same for `title` on `Popover.Content` (3.2).
- `className={cond ? null : "hidden"}` on `Popover` or `Tooltip`: `className` is `string | undefined`. Use `undefined` in place of `null`.
- A `Tooltip` with no children: `children` is required, because the tooltip needs a target. Give it the element it describes, or delete the `Tooltip`.
- A `Popover` child that is a function, or an app type whose children return `void`: `children` is `ReactNode`. Call the function and pass its result, and type the app's own render prop as returning `ReactNode`.
- `Sidebar.Link`, `Sidebar.Button` or `Sidebar.Heading` with `icon={<SomeIcon />}` or an app prop typed `ReactElement | ReactNode`: `icon` is a component, not an element. `Sidebar.Account` `icon` is the exception: it is a `ReactNode`, so leave an element there. Pass `icon={SomeIcon}` and type the app's prop as `React.ComponentType<{ className?: string }>` (`SidebarLinkIcon` for `Sidebar.Link`, exported from `@xola/ui-kit`). `Sidebar.Link` also accepts a thunk `() => ReactElement | null`.
- `Sidebar.Button` with `label={user?.name}`: `label` is a `string`. Pass a string (`user?.name ?? ""`), or render the button only when there is a name.

Sidebar errors come from 3.7, not 3.8; `migrate-2.6-to-3.7` lists them too.

## 4. Hand-review list

A rule cannot settle these. Decide each one from the surrounding code, and write the decision in the commit or PR description.

- Tippy instance callbacks: `onMount`, `onShown`, `onHide`, `onCreate` that read `instance` (`instance.hide()`, `instance.popper`, `instance.setProps`), and a `popperInstance` read. Replace with controlled `open` state and `onOpenChange`. Behavior that depended on `instance.popper` needs a React `onClick` on the content.
- `import type { Instance } from "tippy.js"` and any other type from `tippy.js` or `@tippyjs/react` (`Placement`, `Props`). These resolved only through ui-kit's dependency. 3.8 no longer installs it, so the import fails. Delete the type and the code that needs it.
- `allowHTML` on `Tooltip`. Pass JSX as `content` and delete `allowHTML`. If `content` was an HTML string, convert it to JSX and do not inject unsanitized HTML.
- A `Tooltip` with `interactive` whose content holds links or buttons. Tooltip content is not hoverable now. Replace the `Tooltip` with a `Popover` (`content` prop or a `Popover.Content` child), keeping `disabled` for the empty case, and read the `openOn` rule in 3.2. Plain-text content just drops `interactive` (3.1).
- A dynamic `trigger` (`trigger={cond ? "mouseenter" : "manual"}`, `trigger="focus"`, `trigger="click"`) on a `Tooltip`, and any `Popover` trigger that is not in the 3.2 table. Neither component has a trigger prop. Use `disabled={!cond}` for on and off (both have `disabled`), or `open` with `onOpenChange` for full control.
- A hover hook that drives a popover's `open` and is also used for something else (3.2). There is no verified recipe for combining that hook with `open`. Prefer removing the popover's use of it, keep the hook for its other use, and test the popover by hand.
- `appendTo` that is not `document.body` (a function, a parent id lookup, a ref). The default is to delete `appendTo`, flag the site in the PR, and keep it on this list. Then check stacking, because the content now portals to `document.body`. `Popover` content is `z-50`, and `Tooltip` and `Sidebar.Menu` content is `z-[9999]`. ui-kit's `Modal`, `Drawer` and `BottomSheet` are `z-30`, so a popover stays above them. If the old target sat inside an app overlay with a z-index above 50, raise the popover with a class: `className="z-[60]"` on `Popover`, `PopoverList` or `InlineValuePopover` (it spreads `className` into `Popover`; its `classNames` object styles other parts) lands on the Radix content element and replaces `z-50` (the class must appear in the app's own source for Tailwind to generate it). For `DatePickerPopover` use `classNames={{ popover: "z-[60]" }}`. A target inside a scaled or translated container is not solved by a class: ui-kit has no `container` prop, so leave the site on this list.
- Document `click` listeners (analytics, `useClickAway`, outside-click hooks). A click on the backdrop of ui-kit's `Modal` or `Drawer` now reaches them: 3.7 used Headless UI 1.7's `Dialog.Overlay`, which stopped it. Clicks inside the dialog panel do not reach the backdrop. Check that such a listener does not act on a backdrop click.
- A `Tooltip` or `Popover` held open with `open` inside a `Modal`, `Drawer` or `BottomSheet`, with no `onOpenChange` or `onClickOutside` that closes it. It takes every Escape and every backdrop click of that dialog (each closes only the open layer, which stays open), so the dialog cannot close those ways. Give it `onOpenChange`, or an `onClickOutside` that closes it.
- App elements that showed above an open `Drawer`. `Drawer` moved from `z-10` to `z-30`, the layer of `Modal` and `BottomSheet`, so a drawer opened from a modal is now on top of it. An app element with a z-index from 11 to 30 (a sticky header, a chat widget, ui-kit's own `Sidebar` at `z-20`) now sits under the drawer's backdrop. The announcement and notification drawers that `Sidebar.Notifications` opens beside the rail stay at `z-10`, so the rail stays undimmed next to them. To keep another drawer at the old layer, pass `classNames={{ dialog: "z-10" }}`; a drawer opened from a modal then goes under the modal again. Any drawer whose `classNames.dialog` sets a z-index below 30 (`z-20` included) renders under a default `Drawer`, `Modal` or `BottomSheet`, even one opened before it.
- Wrappers that forward `placement: string`. Type them as `Placement`. Wrappers with a default `placement = "auto"` (form fields that show a tooltip) lose the "auto" side choice. Pick a default side, usually `"top"`, and check the layout.
- `popoverProps` objects with `placement: "auto"` (`DatePickerPopover`). Delete the key. `DatePickerPopover` then keeps its own `"bottom"`, which Tippy's auto often chose. A calendar near the bottom edge of a modal flips on collision.
- `Popover` with a `content` prop. It is still supported and replaces the `Popover.Content` child. It is not wrapped in the `ui-popover-content` div. Check that tests and styles that found the body through that class still find it.
- App-level `import "tippy.js/dist/tippy.css"` and `@tippyjs/react` or `tippy.js` entries in `package.json`, and Tippy names in a bundler `inline` or `noExternal` list. Delete them when nothing in the app renders Tippy itself, and remove the packages with `npm uninstall @tippyjs/react tippy.js` (or the package manager's equivalent) so the lockfile updates. If the app renders `@tippyjs/react` directly, keep the dependency, add it to `package.json` (ui-kit no longer provides it) and import `tippy.js/dist/tippy.css` yourself: ui-kit's `build/style.css` no longer contains Tippy CSS.
- Tests, mocks and comments that assume Tippy or noUiSlider: a `jest.mock` or `vi.mock` of `@tippyjs/react`, a comment that Tippy never opens in jsdom or that mentions noUiSlider, and helpers named after Tippy (`handleShouldCloseTippy`). When the app can run its tests on ui-kit 3.8 (React 18.3 or newer), re-run each such test without the mock and keep the mock only if it still fails. Otherwise keep the mock and reword its comment. Rename leftover helpers.
- CSS that targets `.tippy-*` classes or `data-tippy-*` attributes. Radix content has `ui-tooltip`, `ui-popover` and `ui-sidebar-menu` classes and `data-state` and `data-side` attributes. Rewrite the rule against those or drop it.
- `.noUi-*` selectors other than the tooltip placement rule in 3.4, for example handle size or track color. The Radix DOM has different elements. Rewrite against ui-kit's `ui-range-slider`, `ui-range-slider-track`, `ui-range-slider-thumb` and `ui-range-slider-tooltip` classes or drop the override.
- Tests that assert on a Tooltip or Popover. Radix renders one `role="tooltip"` element for an open tooltip, so `getByRole("tooltip")` is the stable query. The bubble leaves the DOM about 250ms after it closes, so wrap "is gone" assertions in `waitFor`. jsdom has no `ResizeObserver`, which Radix needs when a popper or the slider mounts. If a test fails with "ResizeObserver is not defined", add a stub in the test setup.
- Dialog-stack workarounds that relied on ui-kit sharing Headless UI 1 internals, for example a closed `static` `Dialog` rendered only to register a nested dialog. Radix does not use that registry. Remove the workaround and confirm focus and Escape behavior by hand.
- Hover popovers on touch devices. They no longer open on a tap. Choose `openOn="click"` where tablets or phones use the control. `Sidebar.Menu` still opens on a tap. Confirm on a real iOS and Android device.

## 5. Verify

Run the app's own scripts, all green:

```bash
npx eslint <files you changed>   # read-only; many lint scripts pass --fix, so do not run them
npx tsc --noEmit                 # TypeScript apps
npm test
npm run build
```

Format only the files you changed, and only if they were already formatted before your edit. Do not reformat files that had formatting drift at `HEAD`, or the diff fills with unrelated changes.

Then re-run the step 2 commands. Done when:

- The removed-props command finds only false hits: locals, another library's `appendTo` or `visible`, comments and strings, and props on components that are not from ui-kit. Check every remaining hit and write down why it is not a site.
- The `tippy` command finds nothing, or only comments and the app's own `@tippyjs/react` usage that you chose to keep.
- The `noUi` command finds nothing (or only comments you chose to keep), and `declare module "@xola/ui-kit"` is gone.
- A dev run of the app and its tests logs no line containing `was removed in 3.8`.

Manual checks in the browser, one per kind of component the app uses:

- Tooltip: hover and keyboard focus show it, Escape and moving away hide it, a tap toggles it on a touch device, and a tooltip on a disabled button still shows. Closing a `Modal` with the mouse does not show the tooltip of the button that opened it.
- Hover popover: opens on hover and keyboard focus, stays open while the pointer crosses to the content, closes on an outside click and on a mouse press of the trigger. A `Modal` or `Drawer` opened from inside the trigger is not covered by the popover.
- Click and controlled popover: opens on click, closes on an outside click and Escape, and inside a `Modal` the first Escape closes the popover and the second closes the modal. A backdrop click does the same in a `Modal`, `Drawer` or `BottomSheet` that closes on one. Tab order is unchanged around the trigger.
- `DatePickerPopover`: opens at the right side, including inside a modal and near a viewport edge.
- `Sidebar.Menu`: hover opens it after about 150ms, a diagonal move to a low item keeps it open, a second menu replaces the first, and a tap opens it on a touch device.
- `RangeSlider`: drag and arrow keys move handles, the tooltip text and placement match, release calls `onChange` once with numbers.
- Headless UI dialogs and transitions that the app imports directly from its own declared dependency: they open, trap focus, close on Escape and an outside click, and animate.
