import{a as t,j as e}from"./jsx-runtime-5e7b5774.js";import{O as o,c as a,p as N,b,d as A}from"./PieOptions-ef3152f6.js";import{r as p}from"./index-e6e5af86.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const $={title:"Overlay/BottomSheet",component:o,args:{shouldCloseOnOutsideClick:!0,isOpen:!1},argTypes:{shouldCloseOnOutsideClick:{type:{required:!1},description:"Close the sheet if user clicks the overlay",control:{type:"boolean"}},isOpen:{type:{required:!1},description:"Control the sheet open state",control:{type:"boolean"}}}},d=({shouldCloseOnOutsideClick:r})=>{const[s,i]=p.useState(!1),n=()=>{i(!s)};return t("div",{children:[e(a,{onClick:n,children:"Click me to launch a bottom sheet"}),t(o,{isOpen:s,shouldCloseOnOutsideClick:r,onClose:n,children:[e(o.Header,{description:"Enter the code below to apply the code",children:"Apply Code"}),e(o.Body,{children:e(N,{placeholder:"Coupon or Affiliate"})}),t(o.Footer,{children:[e(a,{color:"secondary",variant:"outline",onClick:n,children:"Cancel"}),e(a,{color:"primary",onClick:n,children:"Confirm"})]})]})]})},c=({shouldCloseOnOutsideClick:r})=>{const[s,i]=p.useState(!1),n=()=>{i(!s)};return t("div",{children:[e(a,{onClick:n,children:"Click me to launch a scrollable bottom sheet"}),t(o,{isOpen:s,shouldCloseOnOutsideClick:r,onClose:n,children:[e(o.Header,{children:"Terms & Conditions"}),e(o.Body,{children:Array.from({length:30}).map((h,l)=>t("p",{className:"mb-4",children:["Paragraph ",l+1,": the body scrolls independently while the header and footer stay pinned."]},l))}),e(o.Footer,{children:e(a,{color:"primary",onClick:n,children:"Accept"})})]})]})},D=r=>{const s=A(r).date();return t("span",{className:"text-xs text-gray-dark",children:["$",s%3===0?22:27]})},m=({shouldCloseOnOutsideClick:r})=>{const[s,i]=p.useState(!1),[n,h]=p.useState(new Date),l=()=>{i(!s)},f=["6:00 AM","7:30 AM","10:00 AM","1:00 PM","3:30 PM"];return t("div",{children:[e(a,{onClick:l,children:"Click me to change arrival"}),t(o,{isOpen:s,shouldCloseOnOutsideClick:r,className:"max-md:!px-3",onClose:l,children:[e(o.Header,{children:"Change Arrival"}),t(o.Body,{children:[t("div",{className:"rounded-lg bg-gray-lighter p-4",children:[e("div",{className:"font-bold",children:"Traveler App Test"}),e("div",{className:"mt-1 text-sm text-gray-darker",children:"July 2, 2026 · 6:00 AM · 2 Guests"})]}),t("div",{className:"mt-4 space-y-1",children:[e("span",{className:"text-sm font-bold",children:"Date"}),e(b,{shouldShowYearPicker:!0,value:n,getDayContent:D,onChange:h})]}),t("div",{className:"mt-4 space-y-1",children:[e("span",{className:"text-sm font-bold",children:"Time"}),e("div",{className:"flex flex-wrap gap-2",children:f.map(u=>e("span",{className:"rounded-lg border border-gray-light px-4 py-2 text-sm",children:u},u))})]}),t("div",{className:"mt-4 rounded-lg bg-gray-lighter p-4",children:[e("div",{className:"text-lg font-bold text-secondary",children:"Purchase Summary"}),t("p",{className:"mt-2 text-sm text-gray-darker",children:["New arrival: ",n.toDateString()]}),e("p",{className:"mt-1 text-sm text-gray-darker",children:"Amount due: $0.00"})]})]}),t(o.Footer,{children:[e(a,{color:"secondary",variant:"outline",onClick:l,children:"Cancel"}),e(a,{color:"primary",onClick:l,children:"Save Changes"})]})]})]})};d.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"ScrollableContent"};m.__docgenInfo={description:"",methods:[],displayName:"WithDatePicker"};var g,C,y;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`({
  shouldCloseOnOutsideClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <div>
            <Button onClick={toggle}>Click me to launch a bottom sheet</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <BottomSheet.Header description="Enter the code below to apply the code">Apply Code</BottomSheet.Header>

                <BottomSheet.Body>
                    <Input placeholder="Coupon or Affiliate" />
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="primary" onClick={toggle}>
                        Confirm
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>;
}`,...(y=(C=d.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var B,v,S;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`({
  shouldCloseOnOutsideClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <div>
            <Button onClick={toggle}>Click me to launch a scrollable bottom sheet</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <BottomSheet.Header>Terms &amp; Conditions</BottomSheet.Header>

                <BottomSheet.Body>
                    {Array.from({
          length: 30
        }).map((_, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <p key={index} className="mb-4">
                            Paragraph {index + 1}: the body scrolls independently while the header and footer stay
                            pinned.
                        </p>)}
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="primary" onClick={toggle}>
                        Accept
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>;
}`,...(S=(v=c.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var O,k,x;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`({
  shouldCloseOnOutsideClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const timeSlots = ["6:00 AM", "7:30 AM", "10:00 AM", "1:00 PM", "3:30 PM"];
  return <div>
            <Button onClick={toggle}>Click me to change arrival</Button>

            <BottomSheet isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} className="max-md:!px-3" onClose={toggle}>
                <BottomSheet.Header>Change Arrival</BottomSheet.Header>

                <BottomSheet.Body>
                    <div className="rounded-lg bg-gray-lighter p-4">
                        <div className="font-bold">Traveler App Test</div>
                        <div className="mt-1 text-sm text-gray-darker">July 2, 2026 · 6:00 AM · 2 Guests</div>
                    </div>

                    <div className="mt-4 space-y-1">
                        <span className="text-sm font-bold">Date</span>
                        <DatePickerPopover shouldShowYearPicker value={date} getDayContent={getPricedDayContent} onChange={setDate} />
                    </div>

                    <div className="mt-4 space-y-1">
                        <span className="text-sm font-bold">Time</span>
                        <div className="flex flex-wrap gap-2">
                            {timeSlots.map(slot => <span key={slot} className="rounded-lg border border-gray-light px-4 py-2 text-sm">
                                    {slot}
                                </span>)}
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-gray-lighter p-4">
                        <div className="text-lg font-bold text-secondary">Purchase Summary</div>
                        <p className="mt-2 text-sm text-gray-darker">New arrival: {date.toDateString()}</p>
                        <p className="mt-1 text-sm text-gray-darker">Amount due: $0.00</p>
                    </div>
                </BottomSheet.Body>

                <BottomSheet.Footer>
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="primary" onClick={toggle}>
                        Save Changes
                    </Button>
                </BottomSheet.Footer>
            </BottomSheet>
        </div>;
}`,...(x=(k=m.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};const q=["Default","ScrollableContent","WithDatePicker"];export{d as Default,c as ScrollableContent,m as WithDatePicker,q as __namedExportsOrder,$ as default};
