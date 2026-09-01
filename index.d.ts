import type * as React from "react";

export interface SidebarNotificationSection {
    count?: number;
    content?: React.ReactNode;
    title?: string;
    onClose?: () => void;
}

export interface SidebarProps {
    logo?: React.ReactNode;
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
    onSidebarResize?: (width: string) => void;
    variant?: "icons" | "text" | "iconsAndText";
    minWidth?: number;
    maxWidth?: number;
    isCollapsible?: boolean;
    isCollapsed?: boolean;
    onCollapsedChange?: (isCollapsed: boolean) => void;
    onVariantChange?: (variant: string) => void;
    autoCollapseBelow?: number | null;
    storageKey?: string | null;
    cssVariableTarget?: HTMLElement | null;
    notifications?: {
        announcements?: SidebarNotificationSection & { hide?: boolean };
        notices?: SidebarNotificationSection;
    };
}

export interface SidebarAccountProps {
    name: string;
    description?: string;
    image?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export interface SidebarButtonProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className?: string;
}

export interface SidebarFooterProps {
    children: React.ReactNode;
}

export interface SidebarLinkProps {
    align?: "center" | "left" | "right";
    isActive?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    // A consumer-supplied trailing node. Rendered in every variant, unlike the default chevron.
    info?: React.ReactNode;
    children: React.ReactNode;
    isSubMenuItem?: boolean;
    className?: string;
    classNames?: { text?: string };
}

export interface SidebarSeparatorProps {
    className?: string;
}

export interface SidebarMenuProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

export interface SidebarHeadingProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className?: string;
}

export declare const SIDEBAR_WIDTH: { MIN: number; MAX: number };
export declare const SIDEBAR_VARIANT: { ICONS: string; TEXT: string; ICONS_AND_TEXT: string };
export declare const SIDEBAR_VARIANT_WIDTH: { TEXT: number; ICONS_AND_TEXT: number };

export declare function useSidebar(): {
    variant: string;
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
    AccountIcon,
    AddNoteIcon,
    AddSquareIcon,
    Alert,
    almostZero,
    AnnounceIcon,
    AppIcon,
    AppStoreBadge,
    ArchiveIcon,
    ArrowCcwIcon,
    ArrowCwIcon,
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowTopRightIcon,
    ArrowUpIcon,
    AtIcon,
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
    BriefcaseIcon,
    Button,
    ButtonCodeIcon,
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
    CheckboxIcon,
    CheckIcon,
    ChecklistIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    ChipIcon,
    CircleCheckIcon,
    CircleCrossIcon,
    CircleCrownIcon,
    CircleDollarIcon,
    CircleDotIcon,
    CircleInfinityIcon,
    CircleInfoIcon,
    CircleKeyIcon,
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
    CommentAltIcon,
    CommentIcon,
    compactNumber,
    CompassIcon,
    CopyIcon,
    Counter,
    CouponIcon,
    CrmIcon,
    CrownIcon,
    Currency,
    CustomizeColumnsIcon,
    DashboardIcon,
    dateFromObjectId,
    DatePicker,
    DatePickerPopover,
    DecreaseIcon,
    DepositIcon,
    DisabledIcon,
    DisputeIcon,
    Dot,
    DotProgress,
    DotCircleIcon,
    DoubleCheckIcon,
    DownArrowIcon,
    DownloadIcon,
    Drawer,
    DropdownIcon,
    DumbbellIcon,
    DuplicateIcon,
    DurationIcon,
    EditIcon,
    EditNoteIcon,
    EditNotesIcon,
    EllipsisIcon,
    EmailCheckedIcon,
    EmailIcon,
    EmailResendIcon,
    EmailSendIcon,
    EmptyChecklistIcon,
    EquipmentIcon,
    EquipmentCheckoutIcon,
    EquipmentReturnIcon,
    ExportIcon,
    EyeClosedIcon,
    EyeIcon,
    FaceNeutralIcon,
    FaceSadIcon,
    FaceSmileIcon,
    FadeIn,
    FeedbackLightBulbIcon,
    FilterIcon,
    FilterIconOld,
    FlagIcon,
    flash,
    FlexFee2Icon,
    FlexFeeIcon,
    FoodIcon,
    ForkIcon,
    formatDate,
    formatTime,
    FormGroup,
    FunnelIcon,
    getChildByType,
    getChildrenByType,
    getInitials,
    getSymbol,
    GiftIcon,
    GlobeIcon,
    HandIcon,
    HandshakeIcon,
    HeaderToolbar,
    HelpCenterIcon,
    HiddenIcon,
    HouseIcon,
    ImageIcon,
    ImageUpload,
    InfinityIcon,
    InlineValuePopover,
    Input,
    InvoiceIcon,
    isOSX,
    isZeroDecimal,
    ItemsIcon,
    Key,
    KeyIcon,
    KioskIcon,
    Label,
    LabelIcon,
    LandscapeIcon,
    LightIcon,
    LightningIcon,
    LinkIcon,
    LockIcon,
    Login,
    Logo,
    LogoutIcon,
    MagicIcon,
    MedicalIcon,
    MegaphoneIcon,
    MenuIcon,
    MinusIcon,
    MixedChecklistIcon,
    MobileIcon,
    Modal,
    MoneyAddIcon,
    MoneyBackIcon,
    MoneyIcon,
    MountainIcon,
    MonthPicker,
    MouseIcon,
    Number,
    numberFormat,
    PassIcon,
    PauseIcon,
    PenIcon,
    Phone,
    PhoneIcon,
    PhotosIcon,
    PiggyBankIcon,
    PinIcon,
    PipeIcon,
    PlayIcon,
    PlayMarketBadge,
    PlusIcon,
    PolicyIcon,
    Popover,
    PopoverList,
    PrintIcon,
    ProductsIcon,
    Provider,
    QuestionIcon,
    QuestionnaireIcon,
    RangeSlider,
    ReceiptIcon,
    ReceptionBellIcon,
    ReceptionBellMoneyIcon,
    RefreshIcon,
    RefundIcon,
    RelativeDateRange,
    RosterIcon,
    RoundedSquareIcon,
    roundNumber,
    RulerIcon,
    ScanQrCodeIcon,
    Search,
    SearchAltIcon,
    SearchIcon,
    Select,
    SendIcon,
    SeniorIcon,
    SeniorV2Icon,
    SeniorV3Icon,
    ServiceIcon,
    SettingsIcon,
    ShapesIcon,
    ShareIcon,
    ShirtIcon,
    ShoppingBagIcon,
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
    ThumbsDownIcon,
    ThumbsUpIcon,
    TicketIcon,
    ToggleButton,
    Tooltip,
    TransferArrowIcon,
    TranslationIcon,
    TrashIcon,
    TutorialsBadgeIcon,
    TutorialsButtonIcon,
    TutorialsSquareIcon,
    UnlinkIcon,
    useId,
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
} from "./build/ui-kit.umd";
