---
name: migrate-to-3.8
description: Use when upgrading @xola/ui-kit from 3.7 to 3.8, when a dev warning says "was removed in 3.8", or when Tippy, noUiSlider or react-day-picker styles and test selectors break after that upgrade.
---

# Migrate @xola/ui-kit 3.7 to 3.8

What 3.8 changes:

- `Tooltip`, `Popover` and `Sidebar.Menu` move from Tippy to Radix. `PopoverList`, `InlineValuePopover` and `DatePickerPopover` forward to `Popover`.
- `DatePicker` and `DatePickerPopover` move from react-day-picker 7 to 9.
- `RangeSlider` moves from noUiSlider to Radix Slider.
- `Modal`, `Drawer`, `BottomSheet` and `Switch` use Radix, `SlideDown` uses Radix Collapsible, and `FadeIn`, `SubmitButton` and `flash` use local transition stages. ui-kit no longer depends on Headless UI, Tippy or noUiSlider.
- No component has `defaultProps`, `SubmitButton` accepts React 19 form actions, and `index.d.ts` types the new props.

A removed prop still compiles in JavaScript. In a dev build it logs one warning, `UI Kit <Component>: '<prop>' was removed in 3.8, <replacement>`, and does nothing (`DatePicker` exceptions in 3.5).

Work through the steps in order, and start a step only once the previous one's **Done when** holds. Run every `rg` command from the app root (a monorepo root is fine); the commands skip `node_modules`, `dist` and `build`. [fixtures/before](fixtures/before) and [fixtures/after](fixtures/after) hold one pair per rule, named in the rule's section.

When a test fails or the app behaves differently from 3.7 (focus, Escape, touch, DOM position, stacking, test queries), read [behavior-changes.md](behavior-changes.md) before changing the test or the app.

## 1. Preflight

- `git status` shows a clean working tree.
- `npm ls react react-dom` resolves 18.3.1 or newer.
- `npm ls @xola/ui-kit` shows 3.8.x (npm version or `github:xola/ui-kit#v3.8.0`), and `node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md` exists. In a monorepo, every workspace that depends on `@xola/ui-kit` moves to 3.8 in the same change: a shared package left on 3.7 breaks, for example on `import type { Placement } from "@xola/ui-kit"`.
- The app builds and its tests run on 3.7. Record the tests that already fail, so step 5 separates old failures from new ones.

**Done when** all four hold.

## 2. Find call sites

Inventory aliased `@xola/ui-kit` imports first and record each affected component's local JSX tag: `PopoverList as ActionsMenu` gives `ActionsMenu`, `Sidebar as Navigation` gives `Navigation.Menu`. Add those tags to the component alternation in the file-list, removed-props, wrappers and `RangeSlider` commands. A missed alias hides `<ActionsMenu visible={isOpen} />` from every search.

Every hit is a candidate. Expect many false hits: the removed-props command matches whole files, so locals named `offset` or `visible`, another library's `appendTo` (a `ComboBox` menu), a Headless UI `Popover`, comments and strings all match. Read the enclosing element and keep the hit only when the prop is an attribute of a `@xola/ui-kit` element or of a wrapper around one.

`tsc` is a second net only for the typed components, and only once the `declare module "@xola/ui-kit";` shim is deleted (3.6): `Tooltip`, `Popover`, `Popover.Content`, `Sidebar` and its parts (`Sidebar.Menu` included) and `RangeSlider`. `PopoverList`, `InlineValuePopover`, `DatePicker` and `DatePickerPopover` are typed `any` in `index.d.ts`, as is any wrapper that spreads props into them, so for those the commands below are the only net.

Files that render an affected component (the list the next commands read):

```bash
rg -l -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Removed props as attributes in those files. A prop name followed by `=`, whitespace, `/`, `>` or the line end matches on its own line, inline, as a boolean shorthand (`<Tooltip allowHTML content={x}>`), in multi-line JSX and in tags whose `content` prop holds JSX:

```bash
rg -l0 -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu|RangeSlider)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -0 -r rg -HnP '(?:^|\s)(visible|enabled|allowHTML|offset|animation|appendTo|trigger|arrow|zIndex|duration|minWidth|onCreate|onShown|onShow|onHide|onMount|onHidden|onDestroy|hideOnClick|interactive|followCursor|interactiveBorder|isLazy|tooltipCustomFormatter)(?=[\s=/>]|$)'
```

Spreads in the same files. A wrapper that forwards `...rest` (or a named prop) into one of these components passes removed props through:

```bash
rg -l0 -P '<(Tooltip|Popover|PopoverList|InlineValuePopover|DatePickerPopover|Sidebar\.Menu)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -0 -r rg -HnP '\{\.\.\.[\w.]+\}'
```

For each wrapper, re-run the removed-props and spreads commands with the wrapper's tag in place of the ui-kit tags to reach its call sites.

`DatePicker` and `DatePickerPopover` props that react-day-picker 9 renamed, and react-day-picker 7 class names and imports anywhere in the app:

```bash
rg -l0 -P '<(DatePicker|DatePickerPopover)\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' . | xargs -0 -r rg -HnP '(?:^|\s)(selectedDays|disabledDays|fromMonth|toMonth|month|modifiersStyles|modifiers)(?=[\s=/>]|$)|daysOfWeek'
rg -nP 'DayPicker(-[A-Za-z]+)*(--[a-z]+)?|react-day-picker' -g '*.{ts,tsx,js,jsx,mjs,css,scss}' -g '!node_modules' -g '!dist' -g '!build' .
```

Objects that reach `popoverProps`, and similar names:

```bash
rg -niP '(popover|tooltip|tippy)_?props' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

`placement: "auto"` and `placement` typed as a plain string:

```bash
rg -nP "placement[^\n]*[\"'\`]auto[\"'\`]|\bplacement\??:\s*string" -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Every `RangeSlider` element, removed prop or not, since its `onChange` handler changes regardless:

```bash
rg -nP '<RangeSlider\b' -g '*.{ts,tsx,js,jsx,mjs}' -g '!node_modules' -g '!dist' -g '!build' .
```

Tippy, noUiSlider, Headless UI and the type shim, in code, CSS, configs and `package.json`:

```bash
rg -ni 'tippy' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -ni 'noUi|nouislider' -g '!node_modules' -g '!dist' -g '!build' -g '!package-lock.json' .
rg -n '@headlessui/react' -g '!node_modules' -g '!package-lock.json' .
rg -nP 'declare module ["'"'"']@xola/ui-kit["'"'"']' -g '*.d.ts' -g '!node_modules' .
```

The `tippy` and `noUi` commands catch `import "tippy.js/dist/tippy.css"`, `TippyProps` and `Instance` type imports, bundler `inline` or `noExternal` lists, `@tippyjs/react` and `tippy.js` entries in `package.json`, `.tippy-*` and `.noUi-*` selectors, and test mocks and comments (3.9). The Headless UI command finds direct imports (3.8). The last finds the shim (3.6).

**Done when** every command has run with the alias tags added, and every hit is written down either under the section 3 rule that owns it or as a false hit with its reason.

## 3. Apply the rules

Rules that hold for every section below:

- **In place.** A renamed or converted prop takes the removed prop's position among the attributes, a deleted prop is removed, and nothing else moves: no sorting or reordering, imports included. A wrapper's own props keep their names; rename only on the ui-kit element (`visible={isVisible}` becomes `open={isVisible}`).
- **Kept props** need no change: `content`, `placement` (3.6), `disabled`, `delay`, `maxWidth`, `className`, `contentClassName` and `role` (Tooltip), `skidding`, `distance`, `onClickOutside`.
- A prop that is neither kept nor in a table (`data-testid` on `Popover`, `PopoverList` or `InlineValuePopover`) reached no DOM element under Tippy and still reaches none: leave it. The exception is `title` on `Popover.Content`, a no-op that `PopoverContentProps` lacks, so `tsc` rejects it once the shim is gone: delete it.
- **Plumbing** that only fed a removed prop goes too: a `popoverParentId` or `parentId` prop or id that fed `appendTo`, an `inModal` flag that only picked a `popoverProps` object, a ref or state only a Tippy callback used. Delete the matching argument at each caller, until the linter reports no unused variable.
- **Hand review** marks a site no rule settles. Make the edit the entry describes when it gives one, and add the site to the step 4 list either way.

Shared by `Tooltip`, the `Popover` family and `Sidebar.Menu` where each lists the prop as removed:

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. |
| `enabled` | Rename to `disabled` and negate the value: `enabled={x}` becomes `disabled={!x}`. |
| `offset={[s, d]}` | `skidding={s}` and `distance={d}`, in place. Omit a value equal to its default (skidding 0, distance 10). On a `-end` placement write `skidding={-s}`: Radix reverses the shift for `-end`, Tippy did not. Where the element also sets `skidding` or `distance`, the `offset` values won under Tippy, so they win here. |

### 3.1 Tooltip

Fixture: `tooltip-removed-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible`, `enabled`, `offset` | Shared table above. |
| `animation`, `appendTo`, `arrow`, `zIndex`, `duration`, `minWidth`, `onCreate`, `onShown`, `hideOnClick`, `followCursor`, `interactiveBorder` | Delete, no replacement. The tooltip portals to `document.body`, stacks at `z-[9999]` and has one built-in fade. |
| `trigger="mouseenter"`, `trigger="mouseenter focus"` | Delete. A tooltip opens on hover and keyboard focus. |
| Any other `trigger` (`"focus"`, `"click"`, `"manual"`, a runtime value such as `cond ? "mouseenter" : "manual"`) | Hand review. Tooltip has no trigger prop: use `disabled={!cond}` to switch it on and off, or `open` with `onOpenChange` for full control. |
| `interactive` on plain-text content | Delete. |
| `interactive` on content with links or buttons | Hand review. Tooltip content is not hoverable, so replace the `Tooltip` with a `Popover` (`content` prop or a `Popover.Content` child), keep `disabled` for the empty case, and pick `openOn` per 3.2. |
| `allowHTML` | Hand review. Pass JSX as `content` and delete `allowHTML`. Convert an HTML string to JSX; inject no unsanitized HTML. |

### 3.2 Popover, PopoverList, InlineValuePopover, DatePickerPopover

Fixtures: `popover-trigger.tsx`, `popover-default-hover.tsx`, `popover-controlled.tsx`, `popover-list-spread.tsx`, `inline-value-popover.tsx`, `date-picker-popover-props.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible`, `enabled`, `offset` | Shared table above. For `visible`, see the primitive rule below. |
| `trigger="click"` | `openOn="click"` in place, also when `visible` is on the same element. |
| `trigger="mouseenter"`, `trigger="mouseenter focus"` | Delete. Hover is the default. |
| `trigger="manual"` with `visible` | Delete. `open` (from `visible`) controls it; start its state at `false`. |
| `trigger="manual"` without `visible` | Delete, and hand review. |
| A runtime `trigger` that only switches the popover on and off (`trigger={cond ? undefined : "manual"}`, no `visible`) | `disabled={!cond}` in place. |
| Any other `trigger` (`"focus"`, `"click mouseenter"`, other runtime values) | Hand review. Use `disabled={!cond}` for on and off, or `open` with `onOpenChange` for full control. |
| `onMount`, `onShow`, `onShown`, `onHide`, `onHidden`, `onCreate` | `onOpenChange(open)`, which receives a boolean. A callback that read the Tippy `instance` (`instance.hide()`, `instance.popper`, `instance.setProps`) or a `popperInstance` is hand review: replace it with controlled `open` state and `onOpenChange`, and move `instance.popper` behavior to a React `onClick` on the content. |
| `appendTo={document.body}` or a function returning it | Delete. Content always portals to `document.body`. |
| `appendTo` with any other node (a function, a parent id lookup, a ref) | Delete, and hand review: see stacking below. |
| `animation`, `arrow`, `zIndex`, `duration`, `minWidth`, `hideOnClick`, `interactive`, `interactiveBorder`, `followCursor`, `isLazy` | Delete. Content mounts only while open and stacks at `z-50`. |

`PopoverList` and `InlineValuePopover` forward extra props through `...rest`, and `DatePickerPopover` through `popoverProps`, so the table applies at their call sites, in wrappers that spread into them, and in the objects step 2 found. A wrapper's own prop types drop a removed prop too, and so do its callers, or they still compile. An object left empty (`popoverProps={{}}`, or an empty constant) is deleted with its attribute.

`InlineValuePopover` already sets `openOn="click"` and `open={isOpen}`, so its call sites need neither. Keep `isOpen` and `onClickOutside`.

**Primitive rule.** It decides how `open` and `openOn` combine:

- An explicit `openOn` always wins.
- No `openOn`, and `open` defined on the first render: a **click popover** (Radix Popover). Content is tabbable, no hover behavior.
- No `openOn`, and `open` undefined: a **hover popover** (Radix HoverCard).
- The choice is made once, at mount. A popover whose `open` starts `undefined` stays a hover popover for life, so start controlled state at `false`: `useState<boolean>()` becomes `useState(false)`. Keep `openOn` constant: changing it after mount swaps the primitive and remounts the target.

**Choosing `openOn`.** Keep Tippy's behavior unless the content needs more:

- A popover with no `trigger` and no `visible` stays a hover popover, no `openOn` (`popover-default-hover.tsx` is the same before and after).
- A hover popover keeps its content open while the pointer moves onto it, so links and buttons in it work with a mouse. It takes every focusable element in its content out of the tab order and does not open on a touch tap. Add `openOn="click"` where keyboard or touch access to links or buttons matters; otherwise leave it hover and accept that loss.
- Content with fields the user types in (inputs, selects, textareas) needs `openOn="click"`.
- Hand review every hover popover whose control is used on tablets or phones: choose `openOn="click"` there, and confirm on a real iOS and Android device.

**App hover hooks.** A hook that drives `open` from hovering the target (`useHover` plus `visible={isHovering}`, Tippy `interactive` content inside the hover target) breaks: `open` selects the click primitive, and the content portals out of the hover target, so moving onto it ends the hover and closes the popover. Delete the hook and the `visible` prop and use the default hover popover. When the hover state is also used elsewhere, or `visible` combines it with other conditions (`open={isHovering || isPinned}`), hand review: deleting the prop drops those conditions, and no verified recipe combines the hook with `open`. Prefer removing the popover's use of the hook, keep the hook for its other use, and test the popover by hand.

**Stacking** (hand review for `appendTo` with another node). Content now portals to `document.body`. `Popover` content is `z-50`; `Tooltip` and `Sidebar.Menu` content is `z-[9999]`; ui-kit's `Modal`, `Drawer` and `BottomSheet` are `z-30`, so a popover stays above them. When the old target sat inside an app overlay above z-index 50, raise the popover with a class on the Radix content element: `className="z-[60]"` on `Popover`, `PopoverList` or `InlineValuePopover` (which spreads `className` into `Popover`; its `classNames` object styles other parts), or `classNames={{ popover: "z-[60]" }}` on `DatePickerPopover`. The class must appear in the app's own source for Tailwind to generate it. A target inside a scaled or translated container is not solved by a class, and ui-kit has no `container` prop: leave it on the list.

**`content` prop.** Hand review every `Popover` with a `content` prop. It is still supported and replaces the `Popover.Content` child, but it is not wrapped in the `ui-popover-content` div, so check that tests and styles that found the body through that class still find it.

### 3.3 Sidebar.Menu

Fixture: `sidebar-menu.tsx`.

| Removed prop | Do this |
| --- | --- |
| `visible` | Rename to `open`. |
| `onMount`, `onShow`, `onHide`, `onHidden`, `onDestroy` | `onOpenChange(open)`. For a callback that used the Tippy instance, see below. |

`placement`, `offset`, `interactive` and `appendTo` are ignored without a warning. Delete them.

Replace an instance ref (`instance.hide()`, `instance.popper`) with controlled state:

- Replace the ref declaration with `const [isMenuOpen, setIsMenuOpen] = useState(false)` and add `useState` to the `react` import. Drop `useRef` from that import only when nothing else in the file uses it.
- Delete the instance type and the mount handler that only stored the instance.
- Write `open={isMenuOpen}` as the first prop of `Sidebar.Menu`, and `onOpenChange={setIsMenuOpen}` in place of the removed callback.
- Write `setIsMenuOpen(false)` where the code called `instance.hide()`.
- A native listener on `instance.popper` becomes a React `onClick` on the `content` element (the menu is a React portal, so it sees clicks on every item).

`hideAllSidebarMenus` is internal, not a public export. Menus close each other and close on Escape, an outside press and a sidebar resize on their own.

### 3.4 RangeSlider

Fixtures: `range-slider.tsx` and `range-slider.css` (before only: the rule deletes the CSS file).

- `tooltipCustomFormatter` (an array of `{ from, to }`) becomes `formatTooltip={(value, index) => string}`. Define `const formatTooltip = (value: number) => ...` at module scope, in place of the `{ from, to }` formatter object, with the body of its `to` function. Delete the `values.map(() => ...)` constant that built the array. Write `formatTooltip={formatTooltip}` in place of the `tooltipCustomFormatter` attribute. `formatTooltip` replaces `tooltipSuffix`; keep one of them.
- `onChange` receives `number[]`, once on release or keyboard commit as before. A handler that only converted strings to numbers and forwarded them (`onChange(next.map(Number))`, a state setter) is deleted: pass that function directly (`onChange={onChange}`, `onChange={setValues}`). In any other handler remove `Number(...)`, `.map(Number)` and `Number.parseFloat(vals[0])`, and change a `(next: string[])` annotation to `number[]` or the type check fails. A component body left holding only `return (...)` collapses to an expression body.
- A `.noUi-*` rule that moved a tooltip (`.noUi-handle[data-handle="1"] .noUi-tooltip` with `top: auto; bottom: 130%`) becomes a `tooltipPlacement` array with one entry per handle: `"top"` at index N of each `data-handle="N"` the CSS moved above the track, `"bottom"` for the rest (three handles: `["bottom", "top", "bottom"]`). A handle with no entry gets `"bottom"`, extra entries are ignored, and a plain string applies to every handle. Write `tooltipPlacement` in place of `tooltipCustomFormatter`, before `formatTooltip`. Delete the CSS rules, then the file and its `import` when nothing else is in it.
- Any other `.noUi-*` rule (handle size, track color): hand review. Rewrite it against `ui-range-slider`, `ui-range-slider-track`, `ui-range-slider-thumb` and `ui-range-slider-tooltip`, or drop the override.
- `values` stays semi-controlled: a new array with different numbers moves the thumbs, an equal array does not, and a `key` change remounts.

### 3.5 DatePicker, DatePickerPopover

Fixture: `date-picker-v9.tsx`.

Both run on react-day-picker 9 (`DatePickerPopover` forwards its props to `DatePicker`). Each removed prop logs a dev warning and is ignored, so a leftover `disabledDays` shows every day enabled.

| Removed prop | Do this |
| --- | --- |
| `selectedDays` | `selected`: a `Date`, or `{ from, to }` for a range. |
| `disabledDays` | `disabled`, same values except the object matcher `{ daysOfWeek: [0] }` becomes `{ dayOfWeek: [0] }`. `{ before }`, `{ after }`, `{ after, before }`, a `Date` list and a function keep their shape. |
| `fromMonth`, `toMonth` | `startMonth`, `endMonth`. |
| `month` | `defaultMonth`. It sets the first month only; `DatePicker` owns navigation, so changing it later does not move the calendar. |

Kept props: `value`, `variant`, `onChange(date, modifiers, event)`, `onMonthChange`, `todayButton` (a label or `false`), `modifiers` (react-day-picker 9 matchers, so `daysOfWeek` becomes `dayOfWeek` there too), `modifiersStyles`, `getDayContent`, `getTooltip`, `loadingDays`, `upcomingDates`, `shouldShowYearPicker`, `shouldShowMonthSelector`, `locale`, `timezoneName`.

Styles and tests that reach into the calendar:

- A custom modifier renders `ui-day-<name>` on the day cell: `waitlist` gives `ui-day-waitlist`, which was `DayPicker-Day--waitlist`.
- `.DayPicker` becomes `.rdp-root`, `.DayPicker-Day` becomes `.rdp-day`, and `--selected`, `--disabled`, `--outside`, `--today` become `.rdp-selected`, `.rdp-disabled`, `.rdp-outside`, `.rdp-today`. The cell is a `td[data-day]` with `data-selected`, `data-disabled`, `data-outside` and `data-today`, and the clickable element is the `button` inside it: a test clicks the button.
- The month arrows are buttons named "Go to the previous month" and "Go to the next month".
- ui-kit no longer imports `react-day-picker/lib/style.css`. An app that imports `react-day-picker` 7 itself can move to 9.

### 3.6 Types

Fixture: `tippy-props-type.tsx`.

- Replace `import type { TippyProps } from "@tippyjs/react"` (or a plain `import { TippyProps }`) in place with `import type { PopoverProps } from "@xola/ui-kit"` (`TooltipProps` for a tooltip wrapper), on its own line, separate from the value import. Swap the name in `extends Except<TippyProps, "children">` or similar. A Tippy prop that `PopoverProps` lacks is a removed prop: fix it through the tables above.
- Any other type from `tippy.js` or `@tippyjs/react` (`Instance`, `Placement`, `Props`) resolved only through ui-kit's dependency and now fails to import: hand review. Delete the type and the code that needs it.
- `placement` is a `Placement` union: `"top"`, `"bottom"`, `"left"`, `"right"`, each optionally with `-start`, `-center` or `-end`. `placement="auto"` and a `placement` typed `string` fail the type check (at runtime ui-kit maps `"auto"` and unknown strings to `"top"`). Delete `placement="auto"`; Radix flips on collision.
- A wrapper that forwards `placement?: string`: type it as `Placement` (imported from `@xola/ui-kit`). A wrapper default of `placement = "auto"` (form fields that show a tooltip) is hand review: pick a side, usually `"top"`, and check the layout.
- `placement: "auto"` in a `popoverProps` object (`DatePickerPopover`): delete the key. `DatePickerPopover` keeps its own `"bottom"`, which Tippy's auto often chose, and flips on collision near the bottom of a modal.
- `delay` is `number | [number, number]`. Type a `number[]` variable as a tuple.
- Delete the `declare module "@xola/ui-kit";` shim (it types every export as `any` and hides these errors), run the type check, and fix each new error per 3.7. The shim stays deleted.

### 3.7 Type errors once the shim is gone

The typed components listed in step 2 now reject props the shim hid. Fix each at its source; a cast is not a fix.

- A prop the component never had, for example `to` on `Sidebar.Link`: delete it. `Sidebar.Link` renders a `<button>`, so `to` was an inert attribute; navigation belongs in `onClick`. Same for `title` on `Popover.Content`.
- `className={cond ? null : "hidden"}` on `Popover` or `Tooltip`: `className` is `string | undefined`, so use `undefined`.
- A `Tooltip` with no children: `children` is required, since the tooltip needs a target. Give it the element it describes, or delete the `Tooltip`.
- A `Popover` child that is a function, or an app type whose children return `void`: `children` is `ReactNode`. Call the function and pass its result, and type the app's render prop as returning `ReactNode`.
- `icon={<SomeIcon />}` on `Sidebar.Link`, `Sidebar.Button` or `Sidebar.Heading`, or an app prop typed `ReactElement | ReactNode`: `icon` is a component. Pass `icon={SomeIcon}` and type the app's prop as `React.ComponentType<{ className?: string }>` (`SidebarLinkIcon` for `Sidebar.Link`, exported from `@xola/ui-kit`, which also accepts a thunk `() => ReactElement | null`). `Sidebar.Account` `icon` is a `ReactNode`: leave an element there.
- `label={user?.name}` on `Sidebar.Button`: `label` is a `string`. Pass `user?.name ?? ""`, or render the button only when there is a name.

The Sidebar errors come from 3.7; `migrate-2.6-to-3.7` lists them too.

### 3.8 Headless UI

When the app imports `@headlessui/react` itself, declare it in the app's own `package.json` at the version the app has tested; ui-kit no longer provides, dedupes or upgrades that copy. Keep the app's imports and test them against that version. With no direct import, nothing replaces it. Delete `overrides`, `resolutions`, bundler `dedupe` entries and test-runner `moduleNameMapper` entries that existed only for ui-kit's copy. Run `npm install` after changing dependencies so the lockfile stays in sync.

The `headless-ui-2.tsx` fixture pair records the former shared-copy 1.x to 2.x migration and is not a 3.8 change. Apply its renames only when the app upgrades its own Headless UI dependency.

### 3.9 Tippy and noUiSlider leftovers

- `import "tippy.js/dist/tippy.css"`, `@tippyjs/react` or `tippy.js` in `package.json`, and Tippy names in a bundler `inline` or `noExternal` list: when nothing in the app renders Tippy itself, delete them and run `npm uninstall @tippyjs/react tippy.js` (or the package manager's equivalent) so the lockfile updates. When the app renders `@tippyjs/react` directly, keep it, declare it in `package.json` and import `tippy.js/dist/tippy.css` yourself: ui-kit's `build/style.css` no longer contains Tippy CSS.
- CSS that targets `.tippy-*` classes or `data-tippy-*` attributes: rewrite it against the `ui-tooltip`, `ui-popover` and `ui-sidebar-menu` classes and the `data-state` and `data-side` attributes, or drop it.
- A `jest.mock` or `vi.mock` of `@tippyjs/react`, a comment that Tippy never opens in jsdom or that mentions noUiSlider, and helpers named after Tippy (`handleShouldCloseTippy`): re-run each such test without the mock (the app runs ui-kit 3.8 on React 18.3 or newer) and keep the mock only if the test still fails, rewording its comment. Rename leftover helpers.

**Done when** every candidate from step 2 is either edited by its rule or listed for hand review, and the linter reports no unused variable in the changed files.

## 4. Hand-review list

Decide each site from the surrounding code and write the decision in the PR description (or commit message). The list holds every site marked hand review in step 3, plus these app-wide checks that no step 2 command finds:

- A `Tooltip` or `Popover` held open with `open` inside a `Modal`, `Drawer` or `BottomSheet`, with no `onOpenChange` or `onClickOutside` that closes it. It takes every Escape and backdrop click of that dialog (each closes only the open layer, which stays open), so the dialog cannot close those ways. Give it `onOpenChange`, or an `onClickOutside` that closes it.
- Document `click` listeners (analytics, `useClickAway`, outside-click hooks). A click on the backdrop of ui-kit's `Modal` or `Drawer` now reaches them; 3.7's Headless UI 1.7 `Dialog.Overlay` stopped it. Clicks inside the dialog panel still do not reach the backdrop. Check that such a listener ignores a backdrop click.
- App elements that showed above an open `Drawer`. `Drawer` moved from `z-10` to `z-30`, the layer of `Modal` and `BottomSheet`, so a drawer opened from a modal is now on top of it, and an app element with a z-index from 11 to 30 (a sticky header, a chat widget, ui-kit's own `Sidebar` at `z-20`) now sits under the drawer's backdrop. The drawers `Sidebar.Notifications` opens beside the rail stay at `z-10`. To keep another drawer at the old layer, pass `classNames={{ dialog: "z-10" }}`; a drawer opened from a modal then goes under the modal again. Any drawer whose `classNames.dialog` sets a z-index below 30 (`z-20` included) renders under a default `Drawer`, `Modal` or `BottomSheet`, even one opened before it.
- Dialog-stack workarounds that relied on ui-kit sharing Headless UI 1 internals, such as a closed `static` `Dialog` rendered only to register a nested dialog. Radix does not use that registry. Remove the workaround and confirm focus and Escape by hand.

**Done when** every site marked hand review and every check above that applies has a written decision.

## 5. Verify

Run the app's own checks:

```bash
npx eslint <files you changed>   # read-only: many lint scripts pass --fix
npx tsc --noEmit                 # TypeScript apps
npm test
npm run build
```

Format a changed file only if it was already formatted at `HEAD`, so the diff holds only migration changes.

Re-run the step 2 commands. Then work through the manual browser checks for each kind of component the app uses:

- Tooltip: hover and keyboard focus show it, Escape and moving away hide it, a tap toggles it on a touch device, and a tooltip on a disabled button still shows. Closing a `Modal` with the mouse does not show the tooltip of the button that opened it.
- Hover popover: opens on hover and keyboard focus, stays open while the pointer crosses to the content, closes on an outside click and on a mouse press of the trigger. A `Modal` or `Drawer` opened from inside the trigger is not covered by the popover.
- Click and controlled popover: opens on click, closes on an outside click and Escape, and inside a `Modal` the first Escape closes the popover and the second closes the modal. A backdrop click does the same in a `Modal`, `Drawer` or `BottomSheet` that closes on one. Tab order around the trigger is unchanged.
- `DatePickerPopover`: opens on the right side, including inside a modal and near a viewport edge.
- `DatePicker`: arrows change the month, disabled days cannot be picked, the Today button selects today, and a range picks in both click orders.
- `Sidebar.Menu`: hover opens it after about 150ms, a diagonal move to a low item keeps it open, a second menu replaces the first, and a tap opens it on a touch device.
- `RangeSlider`: drag and arrow keys move handles, the tooltip text and placement match, and release calls `onChange` once with numbers.
- Headless UI dialogs and transitions the app imports from its own dependency: they open, trap focus, close on Escape and an outside click, and animate.

**Done when** all of these hold:

- Lint, type check, tests and build pass, apart from the failures recorded in step 1.
- The removed-props command finds only false hits (locals, another library's `appendTo` or `visible`, comments, strings, props on non-ui-kit components), each written down with its reason.
- The `tippy` command finds nothing, or only comments and app-owned `@tippyjs/react` usage you chose to keep. The `noUi` command finds nothing, or only comments you chose to keep. The shim is gone.
- A dev run of the app and its tests logs no line containing `was removed in 3.8`.
- Every manual check above passes for each component the app uses, or its difference is explained in [behavior-changes.md](behavior-changes.md) and recorded in the PR description.
