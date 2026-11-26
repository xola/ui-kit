---
name: using-ui-kit
description: Use when building or editing UI in an app that depends on @xola/ui-kit, to pick the right component, follow its prop conventions, set up Provider and Tailwind, or use the 3.8 Tooltip, Popover, Sidebar.Menu, RangeSlider and SubmitButton APIs.
---

# Using @xola/ui-kit

`@xola/ui-kit` is Xola's React component library on Tailwind CSS v3. Import every component from the package root, never from a deep path:

```tsx
import { Button, Modal, Tooltip } from "@xola/ui-kit";
```

ui-kit is ESM only. Never `require` it. Only the root, `index.css`, `build/*`, the two config files and `package.json` resolve; any other subpath throws `ERR_PACKAGE_PATH_NOT_EXPORTED`.

Check `index.d.ts` in the package for types. `Tooltip`, `Popover`, `Sidebar` (with `Sidebar.Menu`) and `RangeSlider` are fully typed (`TooltipProps`, `PopoverProps`, `PopoverContentProps`, `SidebarMenuProps`, `RangeSliderProps`, `Placement`). Other components are typed `any`, so read their source or story for props.

## Setup

Wrap the app once in `Provider`. It generates stable ids (needed for SSR) and holds the one tooltip provider that every `Tooltip` shares. `locale` and `localize` are its only props.

```tsx
import { Provider } from "@xola/ui-kit";

export const Root = ({ children }: { children: React.ReactNode }) => <Provider>{children}</Provider>;
```

`Tooltip` outside a `Provider` wraps itself and still works. Other components log a warning about ids.

Tailwind v3 apps re-export ui-kit's configs and import two stylesheets. Use `.mjs` files, or set `"type": "module"` in the app's `package.json`:

```js
// tailwind.config.mjs
export { default } from "@xola/ui-kit/tailwind.config.js";
// postcss.config.mjs
export { default } from "@xola/ui-kit/postcss.config.js";
```

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

Tailwind v4 apps import only `@xola/ui-kit/build/style.css`, never `index.css`, and add `@source "../node_modules/@xola/ui-kit/build/**/*.js";` plus `@import "@xola/ui-kit/build/theme.css";` to the CSS entry that has `@import "tailwindcss";`. Import `theme.css` after the app's own theme tokens.

Use ui-kit's named colors (`bg-primary`, `text-gray-dark`, `border-gray-light`), not Tailwind's numbered palette. The theme has no dark mode.

## Prop conventions

- Booleans are named `is*` or `should*`: `isOpen`, `isLoading`, `isChecked`, `isDisabled`, `shouldCloseOnOutsideClick`.
- Callbacks are `on*`: `onClose`, `onChange`, `onClickOutside`.
- `className` styles the root. Several components also take a `classNames` object for inner parts.
- Variants are string props: `color`, `size`, `variant`.
- Compound components hang off the parent: `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Popover.Content`, `Table.Row`, `Tabs.Tab`, `Sidebar.Link`.
- Exception: the overlay trio `Tooltip`, `Popover` and `Sidebar.Menu` follow Radix naming instead of `is*`: `open` and `onOpenChange` on all three, `disabled` on `Tooltip` and `Popover` only.

## Catalog

Actions

- `Button`: `color`, `variant`, `size`, optional `icon`. `SecondaryButton` is its outline secondary preset.
- `SubmitButton`: a `Button` that shows loading and success states. `isLoading`, `isSuccess`.
- `ToggleButton`: a `Button` with required `isActive`. `ButtonGroup`: segmented choice by `value` and `onChange`.

Forms

- `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Label`, `FormGroup`: base fields and layout.
- `ComboBox` and `Search`: typed choice from a list.
- `GooglePlacesAutocomplete`: address lookup.
- `RangeSlider`: one or more number handles.
- `ImageUpload`: image picker with size limit and delete.
- `InlineValuePopover`: click a value to edit it in a popover. `ValuePopoverText` renders its text and error icon.

Dates

- `DatePicker`: calendar with `variant`, ranges and disabled days. `DatePickerPopover`: the same calendar behind an input.
- `RelativeDateRange`: choose a range such as "last week". `MonthPicker`: month grid.

Overlays

- `Modal`, `Drawer`, `BottomSheet`: dialogs, side panel, mobile sheet. `isOpen` and `onClose` are required.
- `Tooltip`, `Popover`, `PopoverList`: hover and click overlays, see the 3.8 APIs below.
- `flash`: toast function, `flash.show(...)`.

Navigation

- `Sidebar` (with `Sidebar.Account`, `Sidebar.Button`, `Sidebar.Link`, `Sidebar.Menu`, `Sidebar.Heading`, `Sidebar.Separator`, `Sidebar.Footer`), `Tabs`, `Breadcrumb`, `HeaderToolbar`.

Data display

- `Table`, `Breakdown`, `Badge`, `Tag`, `Avatar`, `Dot`, `DotProgress`, `Counter`, `Skeleton`, `Spinner`, `Alert`, `Logo`, `Key`.
- `Currency`, `Number`, `Phone`: format the value passed as children.

Motion

- `FadeIn` and `SlideDown`: show and hide content with a transition.

Icons are exported by name (`*Icon`), for example CheckIcon. Screens: `Login`.

## 3.8 APIs

Overlays use Radix. Props that Tippy accepted and 3.8 dropped (`visible`, `trigger`, `offset`, `appendTo`, `zIndex`, `interactive`, and the rest) no longer do anything. `Tooltip`, `Popover` and `RangeSlider` log one dev warning per removed prop. `Sidebar.Menu` warns only for `visible` and its callbacks and ignores `offset`, `appendTo` and the rest silently. To move an app from 3.7, follow `migrate-to-3.8`.

### Tooltip

```tsx
<Tooltip content="Refund the full amount" placement="top-start" delay={300}>
    <Button>Refund</Button>
</Tooltip>
```

Props: `content` (empty shows nothing), `placement`, `open` (controlled), `disabled`, `delay`, `skidding`, `distance`, `maxWidth`, `role`, `className`, `contentClassName`, `onOpenChange`, `onClickOutside`. It wraps `children` in a `<span>`, so a disabled button inside still shows it. It opens on hover and keyboard focus, closes on Escape, and the content is not hoverable. Use `Popover` for interactive content.

- `placement` is a `Placement`: `top`, `right`, `bottom` or `left`, optionally with `-start`, `-center` or `-end`. `"auto"` and plain strings fail the type check. Radix flips on collision.
- `delay` is `number | [number, number]`. A tooltip uses only the first value, because Radix has no close delay.
- `skidding` shifts along the edge for `-start` and `-end` placements only, and it is reversed for `-end` (Radix negates it). Pass the negative of the Tippy value there.
- In tests, query an open tooltip with `getByRole("tooltip")`. It leaves the DOM about 250ms after closing.

### Popover

```tsx
<Popover openOn="click" placement="bottom-start">
    <Button>Filters</Button>
    <Popover.Content>
        <FilterForm />
    </Popover.Content>
</Popover>
```

Props: `open`, `openOn`, `disabled`, `placement`, `delay`, `skidding`, `distance`, `maxWidth`, `content`, `className`, `onOpenChange`, `onClickOutside`. Every child except `Popover.Content` is the target. `Popover.Content` is the body, and `content` replaces it. `PopoverList` and `PopoverList.Item` render a menu-style list in a popover.

Hover or click is chosen once, at mount:

- `openOn` set: it wins. `"hover"` opens on hover and focus and closes on a mouse press of the target, `"click"` opens on click.
- `openOn` omitted and `open` defined: click popover. The content is tabbable and there is no hover.
- `openOn` omitted and `open` undefined: hover popover.
- A popover whose `open` starts `undefined` stays hover for life. Start controlled state at `false`.

For new code, use `openOn="click"` for content with inputs or links: hover popovers take their content out of the tab order, and iOS does not open them on tap.

Escape closes an open popover. A controlled popover with no `onOpenChange` calls `onClickOutside` on Escape. The Escape does not reach an enclosing `Modal`, so closing both takes two presses. `onClickOutside` receives no arguments. Content portals to `document.body`, so focus stays on the trigger and Tab does not enter the content.

### Sidebar.Menu

```tsx
<Sidebar.Menu content={<Sidebar.Button label="Logout" onClick={logout} />}>
    <Sidebar.Account name={name} />
</Sidebar.Menu>
```

Props: `content`, `open`, `delay`, `onOpenChange`. The menu opens on hover, keyboard focus or a tap, and closes on Escape, an outside press, another menu opening, and a sidebar resize starting. `delay` defaults to `[150, 300]` (open, close). The close value is also the time the pointer has to cross from the item to the menu, so do not set it low. Control it with `open` and `onOpenChange`; there is no instance object.

### RangeSlider

```tsx
<RangeSlider
    values={[10, 80]}
    min={0}
    max={100}
    shouldConnectHandles
    tooltipPlacement={["bottom", "top"]}
    formatTooltip={(value) => `${value}%`}
    onChange={setRange}
/>
```

Props: `values`, `min`, `max`, `step` (default 1), `isDisabled`, `shouldConnectHandles`, `isTooltipEnabled` (default true), `tooltipSuffix`, `tooltipPlacement`, `formatTooltip`, `className`, `onChange`.

- `values` seeds the handles and is re-applied when it changes by deep equality. A new array with equal numbers does not undo a drag. Change `key` to remount.
- `tooltipPlacement` is `"top"`, `"bottom"` or an array with one entry per handle. Do not write CSS against slider internals to move a tooltip.
- `formatTooltip(value, index)` returns the tooltip text and replaces `tooltipSuffix`.
- `onChange` receives `number[]` once, on release or keyboard commit.

### SubmitButton and React 19 form actions

On React 19, a `SubmitButton` inside `<form action={fn}>` shows its loading state while the action runs, with no `isLoading` wiring:

```tsx
<form action={saveAction}>
    <SubmitButton>Save</SubmitButton>
</form>
```

An explicit `isLoading`, including `false`, wins over the form state. On React 18, or outside a form that has an `action`, nothing changes. ui-kit uses a React 19 API only when the installed React has it, so one release supports both.
