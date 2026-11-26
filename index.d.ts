import type * as React from "react";

// The only three widths a sidebar can render at. Shared by the `variant` prop, `onVariantChange`,
// and `useSidebar()`'s return value so the three sites can't drift apart.
export type SidebarVariant = "icons" | "text" | "iconsAndText";

export interface SidebarNotificationSection {
    count?: number;
    content?: React.ReactNode;
    title?: string;
    onClose?: () => void;
}

export interface SidebarProps {
    logo?: React.ReactElement;
    children: React.ReactNode;
    className?: string;
    footer?: React.ReactElement;
    isFixed?: boolean;
    isStickyHeader?: boolean;
    isStickyFooter?: boolean;
    onLogoClick?: () => void;
    isLeftDrawerOpen?: boolean;
    isRightDrawerOpen?: boolean;
    handleDrawerStateChange?: (side: "left" | "right") => void;
    onSidebarResize?: (width: number) => void;
    variant?: SidebarVariant;
    minWidth?: number;
    maxWidth?: number;
    isCollapsed?: boolean;
    onCollapsedChange?: (isCollapsed: boolean) => void;
    onVariantChange?: (variant: SidebarVariant) => void;
    autoCollapseBelow?: number | null;
    storageKey?: string | null;
    cssVariableTarget?: HTMLElement | null;
    notifications?: {
        announcements?: SidebarNotificationSection & { hide?: boolean };
        notices?: SidebarNotificationSection;
    };
}

export interface SidebarAccountProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    description?: string;
    image?: React.ReactNode;
    icon?: React.ReactNode;
    /**
     * @deprecated No-op. The sidebar's variant (see `useSidebar`) now drives this presentation.
     * Kept only so consumers built against the pre-variant API still compile. Warns in development.
     */
    isResponsive?: boolean;
}

export interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** "solid" gives a filled, card-like button with a larger icon; defaults to "plain". */
    appearance?: "plain" | "solid";
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

// A bare thunk is a real call shape: consumers pass `() => Icon` for an already-built element,
// ignoring `className`. The runtime gate is `PropTypes.func`, which permits both.
export type SidebarLinkIcon = React.ComponentType<{ className?: string }> | (() => React.ReactElement | null);

export interface SidebarLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    align?: "center" | "left" | "right";
    isActive?: boolean;
    /** Renders the trailing chevron that promises a `Sidebar.Menu` flyout. */
    hasSubmenu?: boolean;
    icon?: SidebarLinkIcon;
    // A consumer-supplied trailing node. Rendered in every variant, unlike the default chevron.
    info?: React.ReactNode;
    children: React.ReactNode;
    isSubMenuItem?: boolean;
    classNames?: { button?: string; text?: string };
}

export interface SidebarSeparatorProps {
    className?: string;
}

/** Removed in 3.8: `visible` (use `open`), `onMount`, `onShow`, `onHide`, `onHidden`, `onDestroy` (use `onOpenChange`). */
export interface SidebarMenuProps {
    /** Controls visibility. Leave undefined to open on hover, focus and tap. */
    open?: boolean;
    content: React.ReactNode;
    /** Delay in ms before opening and before closing; `[open, close]` sets them apart. Default `[150, 300]`. */
    delay?: number | [number, number];
    children: React.ReactNode;
    /** Called on hover, focus, tap, Escape, a press outside, another menu opening, and a sidebar resize starting. */
    onOpenChange?: (open: boolean) => void;
}

type PlacementSide = "top" | "right" | "bottom" | "left";

/** Placement strings `toSideAlign` maps to a Radix side and align. `"auto"` is not accepted: Radix flips on collision. */
export type Placement = PlacementSide | `${PlacementSide}-${"start" | "center" | "end"}`;

export interface TooltipProps {
    /** Never shows the tooltip. */
    disabled?: boolean;
    /**
     * Controls visibility. Leave undefined to open on hover, keyboard focus (`:focus-visible`, so not a dialog's initial
     * focus or the focus it restores on close) and a touch tap, which toggles it. A tooltip held open (`open` true and
     * no `onOpenChange` or `onClickOutside` that closes it) takes every backdrop click and Escape of an enclosing
     * `Modal`, `Drawer` or `BottomSheet`.
     */
    open?: boolean;
    /** Tooltip body. "", null and undefined show no tooltip. */
    content?: React.ReactNode;
    /** Target, wrapped in a `<span>`. */
    children: React.ReactNode;
    /** Default "top". */
    placement?: Placement;
    /** Open delay in ms. With a tuple, only the first entry is used. Default 0. */
    delay?: number | [number, number];
    /** Shift along the aligned edge in px, for "-start" and "-end" placements. Default 0. */
    skidding?: number;
    /** Gap between target and bubble in px. Default 10. */
    distance?: number;
    /** Bubble max width. Numbers are px. Capped at the viewport width less 10px. Default 350. */
    maxWidth?: number | string;
    /** Role of the bubble element. Default "tooltip". */
    role?: string;
    /** Class name of the target `<span>`. */
    className?: string;
    /** Class name of a `<span>` around `content`. */
    contentClassName?: string;
    /** Called on hover, focus, tap, Escape and so on. */
    onOpenChange?: (open: boolean) => void;
    /** Called on a press outside the open bubble and its target. A controlled tooltip with no `onOpenChange` also calls it on Escape. */
    onClickOutside?: () => void;
}

export interface PopoverProps {
    /** Never shows the popover. */
    disabled?: boolean;
    /**
     * Controls visibility. Leave undefined to open on `openOn`. A popover held open (`open` true and no `onOpenChange`
     * or `onClickOutside` that closes it) takes every backdrop click and Escape of an enclosing `Modal`, `Drawer` or
     * `BottomSheet`.
     */
    open?: boolean;
    /**
     * "hover" (Radix HoverCard) opens on hover and keyboard focus (`:focus-visible`, so not a dialog's initial focus or
     * the focus it restores on close), never on a touch tap. A mouse press of the target closes it, and it stays closed,
     * focus included, until the pointer re-enters. "click" opens on click (Radix Popover, content is tabbable).
     * Without `openOn`, `open` set on the first render picks "click" and `open` undefined picks "hover". Both are
     * fixed at mount: a popover that starts with `open` undefined stays hover for life (start a controlled popover at
     * `false`, not `undefined`), and changing `openOn` later swaps the primitive and remounts the target.
     */
    openOn?: "hover" | "click";
    /** Default "top". */
    placement?: Placement;
    /** Hover delay in ms before opening and before closing; `[open, close]` sets them apart. Closing waits at least 100ms. */
    delay?: number | [number, number];
    /** Shift along the aligned edge in px, for "-start" and "-end" placements. Default 0. */
    skidding?: number;
    /** Gap between target and box in px. Default 10. */
    distance?: number;
    /** Box max width. Numbers are px. Capped at the viewport width less 10px. Default 350. */
    maxWidth?: number | string;
    /** Popover body used instead of the `<Popover.Content>` child. */
    content?: React.ReactNode;
    /** Target, plus a `<Popover.Content>`. */
    children: React.ReactNode;
    /** Class name of the popover box. */
    className?: string;
    /** Called on hover, click, Escape and so on. */
    onOpenChange?: (open: boolean) => void;
    /** Called on a press outside the open box and its target. A controlled popover with no `onOpenChange` also calls it on Escape. */
    onClickOutside?: () => void;
}

export interface PopoverContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface RangeSliderProps {
    isDisabled?: boolean;
    /** Default true. */
    isTooltipEnabled?: boolean;
    /** Renders a colored bar between handles. */
    shouldConnectHandles?: boolean;
    /** One thumb each, clamped to [min, max]. Re-applied when it changes by deep-equal. */
    values: number[];
    min: number;
    max: number;
    /** Default 1. */
    step?: number;
    tooltipSuffix?: string;
    /** One placement for every thumb, or one per thumb. Default "bottom". */
    tooltipPlacement?: "top" | "bottom" | Array<"top" | "bottom">;
    className?: string;
    /** Replaces the default tooltip text and `tooltipSuffix`. */
    formatTooltip?: (value: number, index: number) => string;
    /** Called on release or keyboard commit. */
    onChange?: (values: number[]) => void;
}

export interface SidebarHeadingProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className?: string;
}

export declare const SIDEBAR_WIDTH: { MIN: number; MAX: number };
export declare const SIDEBAR_VARIANT: { ICONS: "icons"; TEXT: "text"; ICONS_AND_TEXT: "iconsAndText" };
export declare const SIDEBAR_VARIANT_WIDTH: { TEXT: number; ICONS_AND_TEXT: number };

export declare function useSidebar(): {
    variant: SidebarVariant;
    showIcons: boolean;
    showText: boolean;
    isCollapsed: boolean;
};

export declare function useSidebarWidth(): number;

export declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>> & {
    Account: React.ComponentType<SidebarAccountProps>;
    Button: React.ComponentType<SidebarButtonProps>;
    Footer: React.ComponentType<SidebarFooterProps>;
    Link: React.ComponentType<SidebarLinkProps>;
    Separator: React.ComponentType<SidebarSeparatorProps>;
    Menu: React.ComponentType<SidebarMenuProps>;
    Heading: React.ComponentType<SidebarHeadingProps>;
};

// This is just to make the auto-import work.
// Next step is to add types for the props.
// Declared in place because build/index.d.ts has no per-module declarations to re-export from: pointing at
// "./index.js" is circular (TS2303) and at the module files gives TS7016.
export declare const Alert: any;
export declare const almostZero: any;
export declare const Avatar: any;
export declare const Badge: any;
export declare const BottomSheet: any;
export declare const Breadcrumb: any;
export declare const Breakdown: any;
export declare const Button: any;
export declare const ButtonGroup: any;
export declare const Checkbox: any;
export declare const ComboBox: any;
export declare const compactNumber: any;
export declare const Counter: any;
export declare const Currency: any;
export declare const dateFromObjectId: any;
export declare const DatePicker: any;
export declare const DatePickerPopover: any;
export declare const Dot: any;
export declare const DotProgress: any;
export declare const Drawer: any;
export declare const FadeIn: any;
export declare const flash: any;
export declare const formatDate: any;
export declare const formatTime: any;
export declare const FormGroup: any;
export declare const getChildByType: any;
export declare const getChildrenByType: any;
export declare const getInitials: any;
export declare const getSymbol: any;
export declare const HeaderToolbar: any;
export declare const ImageUpload: any;
export declare const InlineValuePopover: any;
export declare const Input: any;
export declare const isOSX: any;
export declare const isZeroDecimal: any;
export declare const Key: any;
export declare const Label: any;
export declare const Login: any;
export declare const Logo: any;
export declare const Modal: any;
export declare const MonthPicker: any;
export declare const Number: any;
export declare const numberFormat: any;
export declare const Phone: any;
export declare const Popover: React.ComponentType<PopoverProps> & { Content: React.ComponentType<PopoverContentProps> };
export declare const PopoverList: any;
export declare const Provider: any;
export declare const RangeSlider: React.ComponentType<RangeSliderProps>;
export declare const RelativeDateRange: any;
export declare const roundNumber: any;
export declare const Search: any;
export declare const Select: any;
export declare const Skeleton: any;
export declare const SlideDown: any;
export declare const Spinner: any;
export declare const SubmitButton: any;
export declare const Switch: any;
export declare const Table: any;
export declare const Tabs: any;
export declare const Tag: any;
export declare const Textarea: any;
export declare const theme: any;
export declare const Tooltip: React.ComponentType<TooltipProps>;
export declare const ToggleButton: any;
export declare const useIsClient: any;
export declare const useIsMobile: any;
export declare const useViewportHeight: any;
export declare const ValuePopoverText: any;

// Remaining runtime exports of src/index.js, also untyped.
export declare const BaseChartOptions: any;
export declare const GooglePlacesAutocomplete: any;
export declare const HistogramOptions: any;
export declare const PieOptions: any;
export declare const SecondaryButton: any;
export declare const formatPhoneNumber: any;
export declare const isIosBrowser: any;
export declare const rangeLabels: any;
export declare const rangeOptions: any;
