import type { TippyProps } from "@tippyjs/react";
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

// Extends Tippy's own props, not just `{ children, content }`: Sidebar.Menu.jsx spreads
// `...rest` onto the underlying Tippy, so x2-seller's `visible`/`onMount`/`onHide` pass-through
// props need to type-check too.
export interface SidebarMenuProps extends Omit<TippyProps, "children" | "content"> {
    children: React.ReactNode;
    content: React.ReactNode;
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
export declare const AppStoreBadge: any;
export declare const Avatar: any;
export declare const Badge: any;
export declare const BalloonIcon: any;
export declare const BankCheckIcon: any;
export declare const BarGraphIcon: any;
export declare const BaseInput: any;
export declare const BellIcon: any;
export declare const BookIcon: any;
export declare const BookmarkIcon: any;
export declare const BottomSheet: any;
export declare const BoxIcon: any;
export declare const BugIcon: any;
export declare const Breadcrumb: any;
export declare const Breakdown: any;
export declare const Button: any;
export declare const ButtonGroup: any;
export declare const CakeIcon: any;
export declare const CalendarDayIcon: any;
export declare const CalendarIcon: any;
export declare const CalendarListIcon: any;
export declare const CalendarMonthIcon: any;
export declare const CalendarWeekIcon: any;
export declare const CapacityIcon: any;
export declare const CardAltIcon: any;
export declare const CardIcon: any;
export declare const CartIcon: any;
export declare const CashIcon: any;
export declare const Checkbox: any;
export declare const CircleNotch: any;
export declare const CirclePauseIcon: any;
export declare const CirclePlusIcon: any;
export declare const CircleSubtractIcon: any;
export declare const ClipboardIcon: any;
export declare const ClockAltIcon: any;
export declare const ClockIcon: any;
export declare const ClockManualIcon: any;
export declare const CloseCircleIcon: any;
export declare const CloseIcon: any;
export declare const CollapseIcon: any;
export declare const CollectionIcon: any;
export declare const ComboBox: any;
export declare const compactNumber: any;
export declare const Counter: any;
export declare const Currency: any;
export declare const CustomizeColumnsIcon: any;
export declare const DashboardIcon: any;
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
export declare const ItemsIcon: any;
export declare const Key: any;
export declare const Label: any;
export declare const Login: any;
export declare const Logo: any;
export declare const Modal: any;
export declare const MoneyAddIcon: any;
export declare const MoneyBackIcon: any;
export declare const MoneyIcon: any;
export declare const MountainIcon: any;
export declare const MonthPicker: any;
export declare const MouseIcon: any;
export declare const Number: any;
export declare const numberFormat: any;
export declare const Phone: any;
export declare const PlayMarketBadge: any;
export declare const Popover: any;
export declare const PopoverList: any;
export declare const Provider: any;
export declare const RangeSlider: any;
export declare const RelativeDateRange: any;
export declare const roundNumber: any;
export declare const RulerIcon: any;
export declare const ScanQrCodeIcon: any;
export declare const Search: any;
export declare const Select: any;
export declare const Skeleton: any;
export declare const SlideDown: any;
export declare const Spinner: any;
export declare const SplitArrowIcon: any;
export declare const SplitPaymentIcon: any;
export declare const SquareIcon: any;
export declare const StackIcon: any;
export declare const StarFilledIcon: any;
export declare const StarIcon: any;
export declare const StoreCreditIcon: any;
export declare const SubmitButton: any;
export declare const Switch: any;
export declare const Table: any;
export declare const Tabs: any;
export declare const Tag: any;
export declare const TaxIcon: any;
export declare const TableIcon: any;
export declare const Textarea: any;
export declare const theme: any;
export declare const Tooltip: any;
export declare const ToggleButton: any;
export declare const TransferArrowIcon: any;
export declare const TranslationIcon: any;
export declare const TrashIcon: any;
export declare const TutorialsBadgeIcon: any;
export declare const TutorialsButtonIcon: any;
export declare const TutorialsSquareIcon: any;
export declare const UnlinkIcon: any;
export declare const useIsClient: any;
export declare const useIsMobile: any;
export declare const useViewportHeight: any;
export declare const UserAddIcon: any;
export declare const UserChangedIcon: any;
export declare const UserIcon: any;
export declare const UserSubtractIcon: any;
export declare const ValuePopoverText: any;
export declare const VariantIcon: any;
export declare const VerifiedTickIcon: any;
export declare const VeteranIcon: any;
export declare const ViewNotesIcon: any;
export declare const VoucherIcon: any;
export declare const WaitlistIcon: any;
export declare const WarningDiamondIcon: any;
export declare const WarningIcon: any;
export declare const WarningTriangleIcon: any;
export declare const WeightIcon: any;
export declare const WifiIcon: any;
export declare const WriteIcon: any;
export declare const XolaBotIcon: any;
export declare const XrayIcon: any;
