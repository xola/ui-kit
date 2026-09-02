import{j as t,a as C}from"./jsx-runtime-5e7b5774.js";import{D as u,d as l,b as N}from"./PieOptions-ef3152f6.js";import{r as c}from"./index-e6e5af86.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const B={title:"Data Display/Date & Time/Date Range Picker",component:u,parameters:{docs:{description:{component:"Rendering a date *range* picker with various functionality based on [React Day Picker](https://react-day-picker.js.org) library"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=3063%3A140153"}},args:{shouldShowRelativeRanges:"boolean",ranges:["day","week","month","quarter","year"]},argTypes:{shouldShowRelativeRanges:{control:{type:"boolean"},table:{defaultValue:{summary:!0}}},ranges:{control:{type:"object"}}}},d=l.tz("2022-10-10").toDate(),b=e=>{console.log("handleSubmitDateRange",{event:e})},o=()=>{const[e,a]=c.useState({from:new Date("2022-02-03"),to:new Date("2022-03-08")});return t(u,{variant:"range",value:e,onChange:a})},r=()=>{const[e,a]=c.useState({from:new Date("2022-03-03"),to:new Date("2022-04-08")});return t("div",{className:"flex w-3/4 flex-col",children:t(u,{shouldShowYearPicker:!0,shouldShowRelativeRanges:!0,value:e,variant:"range",onChange:a,onSubmitDateRange:b})})},s=()=>{const[e,a]=c.useState({from:new Date("2022-03-03"),to:new Date("2022-04-08")});return t("div",{className:"flex w-3/4 flex-col",children:t(u,{shouldShowYearPicker:!0,shouldShowRelativeRanges:!0,value:e,variant:"range",onChange:a,timezoneName:"America/Los_Angeles",onSubmitDateRange:b})})},i=({shouldShowRelativeRanges:e,ranges:a})=>{const V={from:d,to:l(d).add(7,"days").toDate()},[n,k]=c.useState(V);return t("div",{children:t(N,{variant:"range",value:n,popoverProps:{placement:"bottom-start"},shouldShowRelativeRanges:!!e,ranges:a,onChange:x=>{k(x)},children:C("div",{className:"w-75 cursor-pointer bg-gray-lighter p-3",children:[n.from?l(n.from).format("LL"):"Pending"," to ",n.to?l(n.to).format("LL"):"Pending"]})})})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"RelativeDateRanges"};s.__docgenInfo={description:"",methods:[],displayName:"RelativeDateRangesWithTimeZone"};i.__docgenInfo={description:"",methods:[],displayName:"DateRangeWithInput"};var m,g,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [value, setValue] = useState({
    from: new Date("2022-02-03"),
    to: new Date("2022-03-08")
  });
  return <DatePicker variant="range" value={value} onChange={setValue} />;
}`,...(p=(g=o.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var h,v,D;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [value, setValue] = useState({
    from: new Date("2022-03-03"),
    to: new Date("2022-04-08")
  });
  return <div className="flex w-3/4 flex-col">
            <DatePicker shouldShowYearPicker shouldShowRelativeRanges value={value} variant="range" onChange={setValue} onSubmitDateRange={handleSubmitDateRange} />
        </div>;
}`,...(D=(v=r.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};var R,f,w;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [value, setValue] = useState({
    from: new Date("2022-03-03"),
    to: new Date("2022-04-08")
  });
  return <div className="flex w-3/4 flex-col">
            <DatePicker shouldShowYearPicker shouldShowRelativeRanges value={value} variant="range" onChange={setValue} timezoneName={"America/Los_Angeles"} onSubmitDateRange={handleSubmitDateRange} />
        </div>;
}`,...(w=(f=s.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var S,y,P;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`({
  shouldShowRelativeRanges,
  ranges
}) => {
  const defaultValue = {
    from: today,
    to: dayjs(today).add(7, "days").toDate()
  };
  const [value, setValue] = useState(defaultValue);
  const handleChange = newValue => {
    setValue(newValue);
  };
  return <div>
            <DatePickerPopover variant="range" value={value} popoverProps={{
      placement: "bottom-start"
    }} shouldShowRelativeRanges={!!shouldShowRelativeRanges} ranges={ranges} onChange={handleChange}>
                <div className="w-75 cursor-pointer bg-gray-lighter p-3">
                    {value.from ? dayjs(value.from).format("LL") : "Pending"}
                    &nbsp;to&nbsp;
                    {value.to ? dayjs(value.to).format("LL") : "Pending"}
                </div>
            </DatePickerPopover>
        </div>;
}`,...(P=(y=i.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};const q=["Default","RelativeDateRanges","RelativeDateRangesWithTimeZone","DateRangeWithInput"];export{i as DateRangeWithInput,o as Default,r as RelativeDateRanges,s as RelativeDateRangesWithTimeZone,q as __namedExportsOrder,B as default};
