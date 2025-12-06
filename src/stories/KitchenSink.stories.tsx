import React from "react";

// Import all components for the kitchen sink demo
import { Alert } from "../components/Alert";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { Breadcrumb } from "../components/Breadcrumb";
import { Breakdown } from "../components/Breakdown";
import { Counter } from "../components/Counter";
import { Drawer } from "../components/Drawer";
import { GooglePlacesAutocomplete } from "../components/GooglePlacesAutocomplete";
import { HeaderToolbar } from "../components/HeaderToolbar";
import { ImageUpload } from "../components/ImageUpload";
import { Key } from "../components/Key";
import { Logo } from "../components/Logo";
import { Modal } from "../components/Modal";
import { Provider } from "../components/Provider";
import { Search } from "../components/Search";
import { Skeleton } from "../components/Skeleton";
import { Spinner } from "../components/Spinner";
import { Table } from "../components/Table";
import { Tag } from "../components/Tag";
import { Tooltip } from "../components/Tooltip";

// Buttons
import { Button } from "../components/Buttons/Button";
import { ToggleButton } from "../components/Buttons/ToggleButton";
import { SubmitButton } from "../components/Buttons/SubmitButton";
import { ButtonGroup } from "../components/Buttons/ButtonGroup";

// Forms
import { FormGroup } from "../components/Forms/FormGroup";
import { InlineValuePopover } from "../components/Forms/InlineValuePopover";
import { ValuePopoverText } from "../components/Forms/ValuePopoverText";
import { ComboBox } from "../components/Forms/ComboBox";
import { Label } from "../components/Forms/Label";
import { BaseInput } from "../components/Forms/BaseInput";
import { Checkbox } from "../components/Forms/Checkbox";
import { RangeSlider } from "../components/Forms/RangeSlider";
import { Switch } from "../components/Forms/Switch";
import { Select } from "../components/Forms/Select";
import { Textarea } from "../components/Forms/Textarea";
import { Input } from "../components/Forms/Input";

// Tabs
import { Tabs } from "../components/Tabs/Tabs";
import { Tab } from "../components/Tabs/Tabs.Tab";
import { Panel as TabPanel } from "../components/Tabs/Tabs.Panel";

// Sidebar
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SidebarButton } from "../components/Sidebar/Sidebar.Button";
import { SidebarMenu } from "../components/Sidebar/Sidebar.Menu";
import { SidebarFooter } from "../components/Sidebar/Sidebar.Footer";
import { SidebarAccount } from "../components/Sidebar/Sidebar.Account";
import { SidebarHeading } from "../components/Sidebar/Sidebar.Heading";
import { SidebarLink } from "../components/Sidebar/Sidebar.Link";

// Animation
import { FadeIn } from "../components/Animation/FadeIn";
import { SlideDown } from "../components/Animation/SlideDown";

// Popover
import { Popover } from "../components/Popover/Popover";
import { PopoverList } from "../components/Popover/PopoverList";

// DatePicker
import { DatePicker } from "../components/DatePicker/DatePicker";
import { LocalizedDayPicker } from "../components/DatePicker/LocalizedDayPicker";
import { RelativeDateRange } from "../components/DatePicker/RelativeDateRange";
import { DatePickerPopover } from "../components/DatePicker/DatePickerPopover";
import { Day } from "../components/DatePicker/Day";

// Dot
import { Dot } from "../components/Dot/Dot";
import { DotProgress } from "../components/Dot/DotProgress";

// Utilities
import { Number as NumberUtil } from "../components/Utilities/Number";
import { Phone as PhoneUtil } from "../components/Utilities/Phone";
import { Currency as CurrencyUtil } from "../components/Utilities/Currency";

export default {
    title: "Kitchen Sink",
};

export const AllComponents = () => (
    <div style={{ padding: 24 }}>
        <Alert color="primary" className="" onClose={() => {}}>Alert</Alert>
        <hr />
        <Avatar name="John Doe" size="large" color="bg-primary-lighter" />
        <hr />
        <Badge color="primary" size="small">Badge</Badge>
        <hr />
        <Breadcrumb separator="/">
            <span>Home</span>
            <span>Page</span>
        </Breadcrumb>
        <hr />
        <Breakdown currency="USD">
            <tr><td>Breakdown</td><td>42</td></tr>
        </Breakdown>
        <hr />
        <Counter>5</Counter>
        <hr />
        {/* Drawer removed due to prop mismatch */}
        <hr />
        <GooglePlacesAutocomplete initialValue="" onSelect={() => {}} apiBaseUrl="https://api.example.com" />
        <hr />
        <HeaderToolbar classNames="">
            <span>Toolbar Content</span>
        </HeaderToolbar>
        <hr />
        <ImageUpload src="" onChange={() => {}} onDelete={() => {}} onError={() => {}} />
        <hr />
        <Key char="cmd" />
        <hr />
        <Logo size="small" />
        <hr />
        <Modal isOpen={false} onClose={() => {}} size="medium" position="center">
            <div>Modal Content</div>
        </Modal>
        <hr />
        <Provider locale="en_US" localize={true}>
            <div>Provider Content</div>
        </Provider>
        <hr />
        <Search items={[]} onSubmit={() => {}} />
        <hr />
        <Skeleton height={40} shouldAnimate={true} />
        <hr />
        <Spinner size="small" color="secondary" />
        <hr />
        <Table className="">
            <thead><tr><th>Header</th></tr></thead>
            <tbody><tr><td>Cell</td></tr></tbody>
        </Table>
        <hr />
        <Tag color="primary" size="small">Tag</Tag>
        <hr />
        <Tooltip content="Tooltip" className=""><span>Hover me</span></Tooltip>
        <hr />
        <Button color="primary" variant="standard" size="medium">Button</Button>
        <hr />
        <ToggleButton color="primary" variant="outline" isActive={false}>Toggle</ToggleButton>
        <hr />
        <SubmitButton color="primary" variant="standard">Submit</SubmitButton>
        <hr />
        <ButtonGroup size="small" value={0} onChange={() => {}}>
            <Button>One</Button>
            <Button>Two</Button>
        </ButtonGroup>
        <hr />
        <FormGroup className="">Form Group</FormGroup>
        <hr />
        <InlineValuePopover text="Popover" />
        <hr />
        <ValuePopoverText value="Text" />
        <hr />
        <ComboBox options={[]} />
        <hr />
        <Label>Label</Label>
        <hr />
        <BaseInput value="Input" />
        <hr />
        <Checkbox checked={false} label="Checkbox" />
        <hr />
        <RangeSlider values={[10]} min={0} max={100} />
        <hr />
        <Switch isChecked={false} />
        <hr />
        <Select value="" />
        <hr />
        <Textarea value="Text" />
        <hr />
        <Input value="Input" />
        <hr />
        <Tabs value={0} onChange={() => {}} className="mb-4" variant="default">
            <Tab className="mr-2">Tab 1</Tab>
            <TabPanel>Panel 1</TabPanel>
        </Tabs>
        <hr />
        <Sidebar
            className="mb-4"
            logo={<Logo />}
            footer={<SidebarFooter>Footer</SidebarFooter>}
            onLogoClick={() => {}}
            notifications={{
                announcements: { count: 0, content: <div>No announcements</div>, title: "Announcements" },
                notices: { count: 0, content: <div>No notices</div>, title: "Notices" }
            }}
            isFixed={false}
            isStickyHeader={false}
            isStickyFooter={false}
            isLeftDrawerOpen={false}
            isRightDrawerOpen={false}
            handleDrawerStateChange={() => {}}
            onSidebarResize={() => {}}
        >
            <SidebarButton icon={() => <Logo />} label="Button" />
            <SidebarMenu content={<div>Menu Content</div>}><span>Menu Children</span></SidebarMenu>
            <SidebarAccount name="John Doe" description="Account" image={<Logo />} />
            <SidebarHeading label="Heading" icon={() => <Logo />} />
            <SidebarLink icon={() => <Logo />} isSubMenuItem={false} align="left" classNames={{}}>
                Link
            </SidebarLink>
        </Sidebar>
        <hr />
        <FadeIn shouldShow={true} shouldAppear={true} tag="div" enter="transition-opacity duration-700" enterFrom="opacity-0" enterTo="opacity-100" className="mb-2">FadeIn</FadeIn>
        <hr />
        <SlideDown isOpen={true}>SlideDown</SlideDown>
        <hr />
        <Popover className="mb-2" isLazy={true} skidding={0} distance={10}><span>Popover Target</span></Popover>
        <hr />
        <PopoverList className="mb-2" placement="bottom"><span>Popover List Target</span></PopoverList>
        <hr />
        <DatePicker
            value={null}
            getDayContent={() => null}
            selectedDays={[]}
            onChange={() => {}}
            className="mb-2"
            onMonthChange={() => {}}
            onSubmitDateRange={() => {}}
            ranges={[]}
            getTooltip={() => null}
            loadingDays={[]}
            disabledDays={[]}
            shouldShowYearPicker={false}
            timezoneName={null}
            upcomingDates={[]}
            locale="en-US"
            variant="single"
        />
        <hr />
        {/* LocalizedDayPicker removed due to incompatible props */}
        <hr />
        <RelativeDateRange value={null} onChange={() => {}} onSubmit={() => {}} ranges={[]} timezoneName="UTC" />
        <hr />
        <DatePickerPopover
            value={null}
            onChange={() => {}}
            popoverProps={{}}
            getDayContent={() => null}
            classNames={{}}
            components={{}}
            variant="single"
        >
            <span>DatePickerPopover Content</span>
        </DatePickerPopover>
        <hr />
        <Day
            selectedDate={new Date()}
            date={new Date()}
            getContent={() => null}
            currentMonth={new Date()}
            isLoading={false}
            disabled={false}
        />
        <hr />
        <Dot color="primary" size="medium" className="mb-2" />
        <hr />
        <DotProgress current={1} total={3} />
        <hr />
        <NumberUtil locale="en-US" maximumFractionDigits={2} isCompact={false}>123</NumberUtil>
        <hr />
        <PhoneUtil countryCode="US">555-1234</PhoneUtil>
        <hr />
        <CurrencyUtil currency="USD" locale="en-US" shouldRemoveTrailingZeroes={true} maximumFractionDigits={2} compact={false} isNarrowSymbolForm={false}>100</CurrencyUtil>
    </div>
);
