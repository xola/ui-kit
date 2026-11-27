---
name: using-ui-kit
description: Use when @xola/ui-kit or @xola/icons code is written or changed, when ui-kit is added to an app, or when a ui-kit Tooltip, Popover, Sidebar.Menu or dialog opens, closes, takes focus or stacks unexpectedly.
---

# Using @xola/ui-kit

Components come from the package root. Icons come from `@xola/icons`, a separate package whose `index.ts` lists every icon, badge and logo plus the `IconProps`, `IconComponent` and `IconSize` types.

```tsx
import { CheckIcon, type IconProps } from "@xola/icons";
import { Button, Modal, Tooltip } from "@xola/ui-kit";
```

Props: `index.d.ts` documents `Tooltip`, `Popover`, `Sidebar` (every part, plus `useSidebar`) and `RangeSlider` in JSDoc. Read it before using one of them. Every other export is typed `any`; its prop names and allowed values are in its `propTypes`, in `node_modules/@xola/ui-kit/build/components/` (one readable file per component).

Adding ui-kit to an app: see [Setup](#setup).

## Conventions

- Booleans are `is*` or `should*` (`isOpen`, `isDisabled`, `shouldCloseOnOutsideClick`), callbacks `on*`, variants string props (`color`, `size`, `variant`).
- Compound parts hang off the parent: `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Popover.Content`, `Table.Row`, `Tabs.Tab`, `Sidebar.Link`.
- `className` styles the root. Components with inner parts (`Drawer`, `Breadcrumb`, `Checkbox`, `Sidebar.Link`, ...) also take a `classNames` object.
- `Tooltip`, `Popover` and `Sidebar.Menu` use Radix names instead: `open` and `onOpenChange`, plus `disabled` on `Tooltip` and `Popover`.
- Write only declared props. Tippy-era overlay props (`visible`, `trigger`, `offset`, `appendTo`, `interactive`, ...) and react-day-picker 7 props do nothing: `Tooltip`, `Popover`, `DatePicker` and `RangeSlider` log a dev warning per removed prop, `Sidebar.Menu` only for `visible` and its old callbacks. Code written against 3.7: follow [migrate-to-3.8](../migrate-to-3.8/SKILL.md).

Colors are named, shades too (`lighter`, `light`, default, `dark`, `darker`): `bg-primary`, `text-gray-dark`, `border-gray-light`. The full scale is in ui-kit's `tailwind.config.js`. Numbered classes like `text-gray-600` are not generated under Tailwind v3 and resolve to Tailwind's own off-brand palette under v4. The theme is light only.

## Catalog

Actions

- `Button`: `color`, `variant`, `size`, `icon`. `icon` needs `children`; an icon-only button takes the icon as its child. `SecondaryButton` is the outline secondary preset.
- `SubmitButton`: `Button` with loading and success states, see [SubmitButton](#submitbutton).
- `ToggleButton`: `Button` with required `isActive`.
- `ButtonGroup`: segmented control of `ButtonGroup.Button` children. `value` is the active child's index, `onChange(index)`.

Forms

- `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Label`, `FormGroup`: fields and layout.
- `ComboBox`, `Search`: typed choice from a list. `GooglePlacesAutocomplete`: address lookup.
- `RangeSlider`: one or more number handles. `ImageUpload`: image picker with size limit and delete.
- `InlineValuePopover`: click a value to edit it in a popover. `ValuePopoverText` renders its text and error icon.

Dates

- `DatePicker`: calendar, `variant` `"single"` or `"range"`. It is react-day-picker 9 underneath: `disabled`, `selected`, `modifiers`, `startMonth`, `endMonth` and `defaultMonth` take its values. `DatePickerPopover`: the same calendar behind an input.
- `RelativeDateRange`: ranges such as "last week". `MonthPicker`: month grid.

Overlays

- `Modal`, `Drawer`, `BottomSheet`: dialog, side panel, mobile sheet. `isOpen` and `onClose` are required. See [Overlays](#overlays).
- `Tooltip`, `Popover`, `PopoverList` (`PopoverList.Item` rows, a menu in a popover).
- `flash`: toasts. `flash.show({ text, color, size })`, or `flash.success(text)`, `flash.danger(text)` and the other colors. Needs the Toaster from [Setup](#setup).

Navigation: `Sidebar` (`Sidebar.Account`, `Sidebar.Button`, `Sidebar.Link`, `Sidebar.Menu`, `Sidebar.Heading`, `Sidebar.Separator`, `Sidebar.Footer`), `Tabs`, `Breadcrumb`, `HeaderToolbar`.

Data display: `Table`, `Breakdown`, `Badge`, `Tag`, `Avatar`, `Dot`, `DotProgress`, `Counter`, `Skeleton`, `Spinner`, `Alert`, `Logo`, `Key`. `Currency`, `Number` and `Phone` format their children.

Motion

- `FadeIn`: Headless UI Transition-style class stages (`enter`, `enterFrom`, `enterTo`, `leave`, ...) driven by `shouldShow`. After entering it keeps `enter` and `enterTo` and appends `entered`.
- `SlideDown`: `isOpen` slides content in. Children unmount while closed; an empty hidden wrapper stays.

Screens: `Login`. Helpers worth reusing before writing your own: `formatDate`, `formatTime`, `numberFormat`, `compactNumber`, `getSymbol`, `isZeroDecimal`, `formatPhoneNumber`, `getInitials`, `useIsMobile`, `useIsClient`, `useViewportHeight`, chart option presets (`BaseChartOptions`, `HistogramOptions`, `PieOptions`) and `theme`, the Tailwind theme as an object.

## Overlays

Stacking:

- `Modal`, `Drawer` and `BottomSheet` share `z-30`, so the one opened last is on top. A `Drawer` lowered through `classNames.dialog` (for example `z-20`) renders under them even when opened last.
- `Popover` content is `z-50`, `Tooltip` and `Sidebar.Menu` content `z-[9999]`. All portal to `document.body`, above every dialog.

Dismissal:

- Escape and a backdrop click close a `Drawer` always and a `Modal` only with `shouldCloseOnOutsideClick`. A `BottomSheet` closes on a backdrop click with `shouldCloseOnOutsideClick` and ignores Escape.
- The topmost layer goes first: with a `Tooltip` or `Popover` open over a dialog, Escape or a backdrop click closes only that layer, and the next one reaches the dialog.
- A `Tooltip` or `Popover` held open (`open` true, and no `onOpenChange` or `onClickOutside` that closes it) takes every Escape and backdrop click of its dialog, so the dialog cannot close those ways. Give it one of the two. A controlled one with no `onOpenChange` also gets `onClickOutside` on Escape.

### Tooltip

```tsx
<Tooltip content="Refund the full amount" placement="top-start" delay={300}>
    <Button>Refund</Button>
</Tooltip>
```

- The target is wrapped in a `<span>`, so a disabled button inside still shows the tooltip.
- Opens on hover and on `:focus-visible` focus, so a dialog's scripted initial or restored focus after a mouse click opens nothing. A touch tap toggles it and still reaches the wrapped control.
- Content is not hoverable. Content with links or buttons belongs in a `Popover`.
- `placement` takes no `"auto"`; Radix flips on collision.
- `skidding` shifts only `-start` and `-end` placements, and positive always moves inward from the aligned edge (Radix mirrors it for `-end`, Tippy did not).

### Popover

```tsx
<Popover openOn="click" placement="bottom-start">
    <Button>Filters</Button>
    <Popover.Content>
        <FilterForm />
    </Popover.Content>
</Popover>
```

- Every child except `Popover.Content` is the target. The `content` prop replaces `Popover.Content`.
- Hover or click is fixed at mount (full rule: the `openOn` JSDoc in `index.d.ts`). Start controlled state at `false`, never `undefined`, and keep `openOn` constant.
- Use `openOn="click"` for content with inputs, links or buttons. A hover popover takes its content out of the tab order and ignores touch taps.
- Neither kind moves focus into the content, and the content portals to `document.body`, so Tab from the trigger does not reach it.

### Sidebar.Menu

```tsx
import { LogoutIcon } from "@xola/icons";

<Sidebar.Menu content={<Sidebar.Button label="Logout" icon={LogoutIcon} onClick={logout} />}>
    <Sidebar.Account name={name} />
</Sidebar.Menu>;
```

Control it with `open` and `onOpenChange`; there is no Tippy instance. Keep the close value of `delay` near its 300ms default: it is the time the pointer has to cross from the item to the menu.

### RangeSlider

- `values` seeds the handles and re-applies only when its numbers (or `min`, `max`) change, so a new array with equal numbers does not undo a drag. Change `key` to reset.
- `onChange(values)` fires once per release or keyboard commit. There is no per-move callback.
- Move a handle's tooltip with `tooltipPlacement` (one entry per handle), not with CSS on the slider's internal classes.

### SubmitButton

On React 19, a `SubmitButton` inside `<form action={fn}>` shows its loading state while the action runs. An explicit `isLoading`, `false` included, wins. On React 18 or without a form `action`, drive `isLoading` yourself. `isSuccess` shows a check for 3 seconds once loading ends.

## Testing

- Overlay content portals to `document.body`: query through `screen` or `within(document.body)`.
- An open tooltip is `getByRole("tooltip")`. It leaves the DOM about 250ms after closing, so wrap "is gone" assertions in `waitFor`.
- An open click popover is a `role="dialog"`, so `getByRole("dialog")` for a `Modal` finds two.
- jsdom has no ResizeObserver, which Radix needs to mount a popper or the slider. Stub it in the test setup.

## Setup

1. Wrap the app root once in `Provider`. It supplies SSR-stable ids and the one tooltip provider every `Tooltip` shares.
2. Configure Tailwind and import the CSS per `node_modules/@xola/ui-kit/README.md`, section "Tailwind v3 projects" or "Tailwind v4 projects", matching the app's `tailwindcss` major.
3. If the app uses `flash`, render react-hot-toast's `<Toaster />` once at the root, imported from the `react-hot-toast` copy ui-kit depends on (`npm ls react-hot-toast` shows one version).

Done when a `Button` renders in ui-kit blue, a `Tooltip` opens on hover, a `flash.success("ok")` call shows (if step 3 applied), and the console has no "Please wrap your app with `<Provider />`" warning.
