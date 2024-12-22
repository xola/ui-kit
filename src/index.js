// Components
export { FadeIn } from "./components/Animation/FadeIn";
export { SlideDown } from "./components/Animation/SlideDown";
export { Button } from "./components/Buttons/Button";
export { SubmitButton } from "./components/Buttons/SubmitButton";
export { ToggleButton } from "./components/Buttons/ToggleButton";
export { Badge } from "./components/Badge";
export { Tag } from "./components/Tag";
export { Dot } from "./components/Dot/Dot";
export { DotProgress } from "./components/Dot/DotProgress";
export { Alert } from "./components/Alert";
export { Sidebar } from "./components/Sidebar/index.js";
export { Avatar } from "./components/Avatar";
export { Tooltip } from "./components/Tooltip";
export { Popover } from "./components/Popover/Popover";
export { PopoverList } from "./components/Popover/PopoverList";
export { Modal } from "./components/Modal";
export { Table } from "./components/Table";
export { ButtonGroup } from "./components/Buttons/ButtonGroup";
export { Counter } from "./components/Counter";
export { Logo } from "./components/Logo";
export { Search } from "./components/Search";
export { Spinner } from "./components/Spinner";
export { Breadcrumb } from "./components/Breadcrumb";
export { Breakdown } from "./components/Breakdown";
export { FormGroup } from "./components/Forms/FormGroup";
export { ValuePopoverText } from "./components/Forms/ValuePopoverText";
export { Input } from "./components/Forms/Input";
export { Textarea } from "./components/Forms/Textarea";
export { Select } from "./components/Forms/Select";
export { ComboBox } from "./components/Forms/ComboBox";
export { Switch } from "./components/Forms/Switch";
export { Checkbox } from "./components/Forms/Checkbox";
export { Label } from "./components/Forms/Label";
export { RangeSlider } from "./components/Forms/RangeSlider";
export { HeaderToolbar } from "./components/HeaderToolbar";
export { Tabs } from "./components/Tabs/index.js";
export { Skeleton } from "./components/Skeleton";
export { Drawer } from "./components/Drawer";
export { Key } from "./components/Key";
export { Login } from "./components/Screens/Login";
export { DatePicker } from "./components/DatePicker/DatePicker";
export { RelativeDateRange } from "./components/DatePicker/RelativeDateRange";
export { DatePickerPopover } from "./components/DatePicker/DatePickerPopover";
export { InlineValuePopover } from "./components/Forms/InlineValuePopover";
export { ImageUpload } from "./components/ImageUpload";

// Utilities
export { Currency } from "./components/Utilities/Currency";
export { Phone } from "./components/Utilities/Phone";
export { Number } from "./components/Utilities/Number";

// Helpers
export { getInitials } from "./utils/avatar.js";
export { almostZero, compactNumber, numberFormat, roundNumber } from "./utils/numbers";
export { getSymbol, isZeroDecimal } from "./utils/currency";
export { formatDate, formatTime, dateFromObjectId } from "./utils/date";
export { formatPhoneNumber } from "./utils/phone";
export { isOSX, isIosBrowser } from "./helpers/browser";
export { flash } from "./helpers/flash";
export { getChildByType, getChildrenByType } from "./helpers/children";

export { useIsClient } from "./hooks/useIsClient";
export { useViewportHeight } from "./hooks/useViewportHeight";

//
// IMPORTANT: Add all icon exports into icons/index.js, and it will be published as a new package @xola/icons
// This is temporary only for backward compatibility. Later all icons will be removed from @xola/ui-kit and only
// @xola/icons will be used
//
export * from "./icons/index.js";

// export { theme } from "./theme";

export { Provider } from "./components/Provider";
