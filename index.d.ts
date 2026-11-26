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
    /** Controls visibility. Leave undefined to open on hover and focus. */
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
    /** Bubble max width. Numbers are px. Default 350. */
    maxWidth?: number | string;
    /** Role of the bubble element. Default "tooltip". */
    role?: string;
    /** Class name of the target `<span>`. */
    className?: string;
    /** Class name of a `<span>` around `content`. */
    contentClassName?: string;
    /** Called on hover, focus, Escape and so on. */
    onOpenChange?: (open: boolean) => void;
    /** Called on a press outside the open bubble and its target. */
    onClickOutside?: () => void;
}

export interface PopoverProps {
    /** Never shows the popover. */
    disabled?: boolean;
    /** Controls visibility. Leave undefined to open on `openOn`. */
    open?: boolean;
    /**
     * "hover" opens on hover and focus and closes on a mouse press of the target (Radix HoverCard), "click" opens on click
     * (Radix Popover, content is tabbable).
     * Without `openOn`, `open` set on the first render picks "click" and `open` undefined picks "hover". The
     * primitive is chosen at mount, so a popover that starts with `open` undefined stays hover for life: start a
     * controlled popover at `false`, not `undefined`.
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
    /** Box max width. Numbers are px. Default 350. */
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
export declare const AppStoreBadge: any;
export declare const Avatar: any;
export declare const Badge: any;
export declare const BalloonIcon: any;
export declare const BankCheckIcon: any;
export declare const BarGraphIcon: any;
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
export declare const Popover: React.ComponentType<PopoverProps> & { Content: React.ComponentType<PopoverContentProps> };
export declare const PopoverList: any;
export declare const Provider: any;
export declare const RangeSlider: React.ComponentType<RangeSliderProps>;
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
export declare const Tooltip: React.ComponentType<TooltipProps>;
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

// Remaining runtime exports of src/index.js, also untyped. src/icons is re-exported wholesale, so each icon is declared here.
export declare const BaseChartOptions: any;
export declare const CircleCrossImage: any;
export declare const CirclePlusImage: any;
export declare const ComputerImage: any;
export declare const EmvImage: any;
export declare const ExpediaImage: any;
export declare const GooglePlacesAutocomplete: any;
export declare const HistogramOptions: any;
export declare const PieOptions: any;
export declare const SecondaryButton: any;
export declare const VerifoneImage: any;
export declare const XolaLogo: any;
export declare const XolaLogoCircle: any;
export declare const XolaLogoSimple: any;
export declare const formatPhoneNumber: any;
export declare const isIosBrowser: any;
export declare const rangeLabels: any;
export declare const rangeOptions: any;

export declare const AccountIcon: any;
export declare const AddNoteIcon: any;
export declare const AddSquareIcon: any;
export declare const AffirmIcon: any;
export declare const AfterpayIcon: any;
export declare const AmexIcon: any;
export declare const AnnounceIcon: any;
export declare const AppIcon: any;
export declare const ArchiveIcon: any;
export declare const ArrowCcwIcon: any;
export declare const ArrowCwIcon: any;
export declare const ArrowDownIcon: any;
export declare const ArrowRightIcon: any;
export declare const ArrowTopRightIcon: any;
export declare const ArrowUpIcon: any;
export declare const AtIcon: any;
export declare const BriefcaseIcon: any;
export declare const ButtonCodeIcon: any;
export declare const ChallengeIcon: any;
export declare const CheckIcon: any;
export declare const CheckboxIcon: any;
export declare const ChecklistIcon: any;
export declare const ChevronDownIcon: any;
export declare const ChevronLeftIcon: any;
export declare const ChevronRightIcon: any;
export declare const ChevronUpIcon: any;
export declare const ChipIcon: any;
export declare const CircleCheckFilledIcon: any;
export declare const CircleCheckIcon: any;
export declare const CircleCrossIcon: any;
export declare const CircleCrownIcon: any;
export declare const CircleDollarIcon: any;
export declare const CircleDotIcon: any;
export declare const CircleInfinityIcon: any;
export declare const CircleInfoIcon: any;
export declare const CircleKeyIcon: any;
export declare const CommentAltIcon: any;
export declare const CommentIcon: any;
export declare const CompassIcon: any;
export declare const CopyIcon: any;
export declare const CouponIcon: any;
export declare const CrmIcon: any;
export declare const CrownIcon: any;
export declare const DecreaseIcon: any;
export declare const DepositIcon: any;
export declare const DinersClubIcon: any;
export declare const DisabledIcon: any;
export declare const DiscoverIcon: any;
export declare const DisputeIcon: any;
export declare const DoubleCheckIcon: any;
export declare const DownArrowIcon: any;
export declare const DownloadIcon: any;
export declare const DropdownIcon: any;
export declare const DumbbellIcon: any;
export declare const DuplicateIcon: any;
export declare const DurationIcon: any;
export declare const EditIcon: any;
export declare const EditNoteIcon: any;
export declare const EllipsisIcon: any;
export declare const EmailCheckedIcon: any;
export declare const EmailIcon: any;
export declare const EmailResendIcon: any;
export declare const EmptyChecklistIcon: any;
export declare const EquipmentCheckoutIcon: any;
export declare const EquipmentIcon: any;
export declare const EquipmentReturnIcon: any;
export declare const ExportIcon: any;
export declare const EyeClosedIcon: any;
export declare const EyeIcon: any;
export declare const FaceNeutralIcon: any;
export declare const FaceSadIcon: any;
export declare const FaceSmileIcon: any;
export declare const FacebookIcon: any;
export declare const FeedbackLightBulbIcon: any;
export declare const FilterIcon: any;
export declare const FlagIcon: any;
export declare const FlexFee2Icon: any;
export declare const FlexFeeIcon: any;
export declare const FoodIcon: any;
export declare const ForkIcon: any;
export declare const GiftIcon: any;
export declare const GlobeIcon: any;
export declare const HandIcon: any;
export declare const HandshakeIcon: any;
export declare const HelpCenterIcon: any;
export declare const HouseIcon: any;
export declare const ImageIcon: any;
export declare const InfinityIcon: any;
export declare const InstagramIcon: any;
export declare const InvoiceIcon: any;
export declare const KeyIcon: any;
export declare const KioskIcon: any;
export declare const KlarnaIcon: any;
export declare const LightIcon: any;
export declare const LightningIcon: any;
export declare const LinkIcon: any;
export declare const LockIcon: any;
export declare const LogoutIcon: any;
export declare const MaestroIcon: any;
export declare const MagicIcon: any;
export declare const MasterCardIcon: any;
export declare const MedicalIcon: any;
export declare const MegaphoneIcon: any;
export declare const MenuIcon: any;
export declare const MinusIcon: any;
export declare const MixedChecklistIcon: any;
export declare const MobileIcon: any;
export declare const PassIcon: any;
export declare const PenIcon: any;
export declare const PhoneIcon: any;
export declare const PhotosIcon: any;
export declare const PiggyBankIcon: any;
export declare const PinIcon: any;
export declare const PipeIcon: any;
export declare const PlayIcon: any;
export declare const PlusIcon: any;
export declare const PolicyIcon: any;
export declare const PrintIcon: any;
export declare const ProductsIcon: any;
export declare const QuestionIcon: any;
export declare const QuestionnaireIcon: any;
export declare const ReceiptIcon: any;
export declare const ReceptionBellIcon: any;
export declare const ReceptionBellMoneyIcon: any;
export declare const RefreshIcon: any;
export declare const RosterIcon: any;
export declare const RoundedSquareIcon: any;
export declare const SearchAltIcon: any;
export declare const SearchIcon: any;
export declare const SendIcon: any;
export declare const SeniorIcon: any;
export declare const SeniorV2Icon: any;
export declare const SeniorV3Icon: any;
export declare const ServiceIcon: any;
export declare const SettingsIcon: any;
export declare const ShapesIcon: any;
export declare const ShareIcon: any;
export declare const ShieldIcon: any;
export declare const ShirtIcon: any;
export declare const ShoppingBagIcon: any;
export declare const SnapchatIcon: any;
export declare const ThumbsDownIcon: any;
export declare const ThumbsUpIcon: any;
export declare const TicketIcon: any;
export declare const TikTokIcon: any;
export declare const TripadvisorIcon: any;
export declare const TwitterIcon: any;
export declare const VisaIcon: any;
export declare const WarningFilledIcon: any;
export declare const XIcon: any;
export declare const YelpIcon: any;
export declare const ZipIcon: any;
