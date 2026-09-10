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
export {
    Alert,
    almostZero,
    AppStoreBadge,
    Avatar,
    Badge,
    BalloonIcon,
    BankCheckIcon,
    BarGraphIcon,
    BaseInput,
    BellIcon,
    BookIcon,
    BookmarkIcon,
    BottomSheet,
    BoxIcon,
    BugIcon,
    Breadcrumb,
    Breakdown,
    Button,
    ButtonGroup,
    CakeIcon,
    CalendarDayIcon,
    CalendarIcon,
    CalendarListIcon,
    CalendarMonthIcon,
    CalendarWeekIcon,
    CapacityIcon,
    CardAltIcon,
    CardIcon,
    CartIcon,
    CashIcon,
    Checkbox,
    CircleNotch,
    CirclePauseIcon,
    CirclePlusIcon,
    CircleSubtractIcon,
    ClipboardIcon,
    ClockAltIcon,
    ClockIcon,
    ClockManualIcon,
    CloseCircleIcon,
    CloseIcon,
    CollapseIcon,
    CollectionIcon,
    ComboBox,
    compactNumber,
    Counter,
    Currency,
    CustomizeColumnsIcon,
    DashboardIcon,
    dateFromObjectId,
    DatePicker,
    DatePickerPopover,
    Dot,
    DotProgress,
    Drawer,
    FadeIn,
    flash,
    formatDate,
    formatTime,
    FormGroup,
    getChildByType,
    getChildrenByType,
    getInitials,
    getSymbol,
    HeaderToolbar,
    ImageUpload,
    InlineValuePopover,
    Input,
    isOSX,
    isZeroDecimal,
    ItemsIcon,
    Key,
    Label,
    Login,
    Logo,
    Modal,
    MoneyAddIcon,
    MoneyBackIcon,
    MoneyIcon,
    MountainIcon,
    MonthPicker,
    MouseIcon,
    Number,
    numberFormat,
    Phone,
    PlayMarketBadge,
    Popover,
    PopoverList,
    Provider,
    RangeSlider,
    RelativeDateRange,
    roundNumber,
    RulerIcon,
    ScanQrCodeIcon,
    Search,
    Select,
    Skeleton,
    SlideDown,
    Spinner,
    SplitArrowIcon,
    SplitPaymentIcon,
    SquareIcon,
    StackIcon,
    StarFilledIcon,
    StarIcon,
    StoreCreditIcon,
    SubmitButton,
    Switch,
    Table,
    Tabs,
    Tag,
    TaxIcon,
    TableIcon,
    Textarea,
    theme,
    Tooltip,
    ToggleButton,
    TransferArrowIcon,
    TranslationIcon,
    TrashIcon,
    TutorialsBadgeIcon,
    TutorialsButtonIcon,
    TutorialsSquareIcon,
    UnlinkIcon,
    useIsClient,
    useIsMobile,
    useViewportHeight,
    UserAddIcon,
    UserChangedIcon,
    UserIcon,
    UserSubtractIcon,
    ValuePopoverText,
    VariantIcon,
    VerifiedTickIcon,
    VeteranIcon,
    ViewNotesIcon,
    VoucherIcon,
    WaitlistIcon,
    WarningDiamondIcon,
    WarningIcon,
    WarningTriangleIcon,
    WeightIcon,
    WifiIcon,
    WriteIcon,
    XolaBotIcon,
    XrayIcon,
} from "./build/ui-kit.es";
