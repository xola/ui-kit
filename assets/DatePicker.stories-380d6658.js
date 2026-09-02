import{j as a,a as h,F as Pe}from"./jsx-runtime-5e7b5774.js";import{D as c,d,S as W,b as _,c as Ne,f as x}from"./PieOptions-ef3152f6.js";import{r as o}from"./index-e6e5af86.js";import{t as Ve}from"./theme-869fe131.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";const He={title:"Data Display/Date & Time/Date Picker",component:c,parameters:{docs:{description:{component:"Rendering a date picker with various functionality based on [React Day Picker](https://react-day-picker.js.org) library"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2746%3A97005"}}},{colors:F}=Ve,b=new Date("2022-10-10"),i=d(b).set("date",1).toDate(),Ye=e=>{console.log("Got date",e)},Ie=e=>{let t=d(e).daysInMonth();const n=[];for(;t;){const r=d(e).date(t);n.push(r),t--}return n},P=()=>{const[e,t]=o.useState(b);return a(c,{value:e,onChange:t})},D=()=>{const[e,t]=o.useState(b),n=[new Date(i.setDate(14)),new Date(i.setDate(2)),{after:new Date(i.setDate(18)),before:new Date(i.setDate(23))},{daysOfWeek:[0]}];return a(c,{month:i,disabledDays:n,value:e,onChange:t})};l(D,'Use the `disabledDays` prop to display days with a "disabled" style. You can match a wide range of days by passing one or more [different modifiers](http://react-day-picker.js.org/docs/matching-days) to disabledDays');const g=()=>{const[e,t]=o.useState(b),[n,r]=o.useState(!1);return a(c,{month:i,value:e,components:{Footer:()=>a("div",{className:"px-5 pb-5",children:h(W.Group,{children:[a(W,{isChecked:n,size:"large",onChange:()=>r(!n)}),a(W.Label,{direction:"right",children:"Switch toggle"})]})})},onChange:t})};l(g,"Use the `components` prop to extend DatePicker functionality by passing a react components that will be positioned in the footer are of the component");const y=()=>{const[e,t]=o.useState(b);return a(c,{value:e,month:i,fromMonth:i,toMonth:d().add(2,"month").toDate(),onChange:t})};l(y,"Use the `fromMonth` and `toMonth` props to restrict the navigation between months.");const f=()=>{const[e,t]=o.useState(b),n={thursdays:{daysOfWeek:[4]},waitlist:[new Date(i.setDate(18)),d().set("day",4).toDate()]},r={thursdays:{color:F.primary.darker},outside:{backgroundColor:F.white}};return a(c,{value:e,month:i,modifiers:n,modifiersStyles:r,fromMonth:new Date,onChange:t})};l(f,"*WIP** (based on design changes of date picker) You can apply a custom inline style to day cells using [modifiers](https://react-day-picker.js.org/docs/matching-days). For example you can style certain cells in the Waitlist yellow.");const v=()=>{const[e,t]=o.useState(new Date);return h("div",{className:"space-y-2",children:[a("div",{children:"Date: April 21 2023"}),a(c,{shouldShowYearPicker:!0,value:e,month:new Date(2023,3,21),onChange:t})]})};l(v,"This example shows how to use the `month` and `shouldShowYearPicker` prop to change the calendar's caption. For example, we can use these props to start in the month of April and to add a form to switch between months and years.");const C=()=>{const[e,t]=o.useState(new Date);return h("div",{className:"space-y-2",children:[h("div",{children:["Date: ",e.toDateString()]}),a(c,{shouldShowMonthSelector:!0,value:e,month:new Date(2023,3,21),onChange:t})]})};l(C,"This example shows how to use the `month` and `shouldShowMonthSelector` prop to change the calendar's month selector caption. For example, we can use these props to show month selector option.");const w=()=>{const[e,t]=o.useState(new Date);return a("div",{className:"h-75 w-75",children:a(_,{pickerType:"month",dateFormat:"MMM YYYY",value:e,onChange:t})})};l(w,"This example shows how to use the month picker. For example, opens month selector in a popover.");const m=[null];for(let e=1;e<=d().daysInMonth();e++)m.push(`$${e*3.5}`);m[10]="Please Call/Email";m[15]="Sold Out";m[23]="205 spots";m[22]="Sold Out";const S=()=>{const[e,t]=o.useState(new Date);return a(c,{value:e,getDayContent:n=>m[n],onChange:t})};l(S,"**WIP** (pending designs) Add custom content to any day cell for example the maximum price for a specific date");const k=()=>{const[e,t]=o.useState(new Date);return h("div",{className:"h-75 w-75",children:[a("div",{children:a(Ne,{className:"mb-4",onClick:()=>{t(null)},children:"Clear Date"})}),a(_,{shouldShowYearPicker:!0,value:e,disabledDays:[{daysOfWeek:[0]}],onChange:(p,s)=>{s.disabled||t(p)}})]})};l(k,"The `DatePickerPopover` component binds the DatePicker with an input field, displaying the calendar in a popover");const N=()=>a("div",{className:"h-75",children:a(_,{value:new Date,dateFormat:"DD MMM",onChange:Ye,children:a("div",{className:"cursor-pointer bg-gray-lighter p-3",children:"Hello, click me to open up a date picker"})})}),V=()=>{const[e,t]=o.useState(new Date);return a("div",{className:"h-75",children:a(_,{value:e,getDayContent:n=>m[n],onChange:n=>t(n)})})},Y=()=>{const[e,t]=o.useState(new Date),[n,r]=o.useState(d()),u={};for(const s of Ie(n))u[x(s)]={title:m[s.get("day")]};return a(c,{getTooltip:s=>{if(u[x(s)])return u[x(s)].title},value:e,onChange:t,onMonthChange:r})},M=()=>{const[e,t]=o.useState(new Date),[n,r]=o.useState(new Date),u=s=>{r(s)},p=s=>{t(s)};return h(Pe,{children:[h("div",{children:["Selected Date ",a("code",{className:"mr-1 bg-gray-lighter p-1 text-sm",children:"onDayClick"}),a("span",{className:"inline-block pb-3 font-semibold",children:d(e).format("ddd, DD MMMM YYYY")})]}),h("div",{children:["Current Month ",a("code",{className:"mr-1 bg-gray-lighter p-1 text-sm",children:"handleMonthChange"}),a("span",{className:"inline-block pb-3 font-semibold",children:d(n).format("MMMM YYYY")})]}),a(c,{value:e,onMonthChange:u,onChange:p})]})};l(M,"This shows various useful [event handlers](https://react-day-picker.js.org/api/DayPicker#onBlur) with `DatePicker` ");const I=()=>{const[e,t]=o.useState(i),n=s=>{t(s)},r={thursdays:{daysOfWeek:[4]},waitlist:[new Date(i.setDate(18)),d().set("day",4).toDate()]},u={outside:{backgroundColor:F.white}},p=[new Date(2022,6,20),new Date(2022,4,4),new Date(2022,5,5),new Date(2022,2,2),new Date(2022,7,7),new Date(2022,6,6)];return a(c,{value:e,upcomingDates:p,modifiersStyles:u,modifiers:r,onChange:n})};function l(e,t){e.parameters={docs:{description:{story:t}}}}P.__docgenInfo={description:"",methods:[],displayName:"Default"};D.__docgenInfo={description:"",methods:[],displayName:"DisabledDays"};g.__docgenInfo={description:"",methods:[],displayName:"WithFooter"};y.__docgenInfo={description:"",methods:[],displayName:"RestrictNavigation"};f.__docgenInfo={description:"",methods:[],displayName:"ModifyCellStyle"};v.__docgenInfo={description:"",methods:[],displayName:"SelectYearMonth"};C.__docgenInfo={description:"",methods:[],displayName:"SelectMonth"};w.__docgenInfo={description:"",methods:[],displayName:"MonthPickerPopover"};S.__docgenInfo={description:"",methods:[],displayName:"WithCustomContent"};k.__docgenInfo={description:"",methods:[],displayName:"PickerWithInput"};N.__docgenInfo={description:"",methods:[],displayName:"PickerCustomInput"};V.__docgenInfo={description:"",methods:[],displayName:"InputWithCustomContent"};Y.__docgenInfo={description:"",methods:[],displayName:"DatePickerWithTooltip"};M.__docgenInfo={description:"",methods:[],displayName:"EventHandlers"};I.__docgenInfo={description:"",methods:[],displayName:"WithUpcomingDates"};var j,T,O;P.parameters={...P.parameters,docs:{...(j=P.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultDate);
  return <DatePicker value={value} onChange={setValue} />;
}`,...(O=(T=P.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var A,B,E;D.parameters={...D.parameters,docs:{...(A=D.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultDate);
  const disabledDays = [
  // Disable two specific dates
  new Date(defaultMonth.setDate(14)), new Date(defaultMonth.setDate(2)), {
    // All days between these two dates
    after: new Date(defaultMonth.setDate(18)),
    before: new Date(defaultMonth.setDate(23))
  }, {
    // Disabled all Sundays
    daysOfWeek: [0]
  }];
  return <DatePicker month={defaultMonth} disabledDays={disabledDays} value={value} onChange={setValue} />;
}`,...(E=(B=D.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var U,H,R;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultDate);
  const [isChecked, setIsChecked] = useState(false);
  return <DatePicker month={defaultMonth} value={value} components={{
    Footer: () => <div className="px-5 pb-5">
                        <Switch.Group>
                            <Switch isChecked={isChecked} size="large" onChange={() => setIsChecked(!isChecked)} />

                            <Switch.Label direction="right">Switch toggle</Switch.Label>
                        </Switch.Group>
                    </div>
  }} onChange={setValue} />;
}`,...(R=(H=g.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var G,L,z;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultDate);
  return <DatePicker value={value} month={defaultMonth} fromMonth={defaultMonth} toMonth={dayjs().add(2, "month").toDate()} onChange={setValue} />;
}`,...(z=(L=y.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var $,q,J;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultDate);
  const modifiers = {
    thursdays: {
      daysOfWeek: [4]
    },
    waitlist: [new Date(defaultMonth.setDate(18)), dayjs().set("day", 4).toDate()]
  };
  const modifiersStyles = {
    thursdays: {
      color: colors.primary.darker
    },
    outside: {
      backgroundColor: colors.white
    }
  };
  return <DatePicker value={value} month={defaultMonth} modifiers={modifiers} modifiersStyles={modifiersStyles} fromMonth={new Date()} onChange={setValue} />;
}`,...(J=(q=f.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,Q,X;v.parameters={...v.parameters,docs:{...(K=v.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  return <div className="space-y-2">
            <div>Date: April 21 2023</div>
            <DatePicker shouldShowYearPicker value={value} month={new Date(2023, 3, 21)} onChange={setValue} />
        </div>;
}`,...(X=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,te;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  return <div className="space-y-2">
            <div>Date: {value.toDateString()}</div>
            <DatePicker shouldShowMonthSelector value={value} month={new Date(2023, 3, 21)} onChange={setValue} />
        </div>;
}`,...(te=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ne,oe;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  return <div className="h-75 w-75">
            <DatePickerPopover pickerType="month" dateFormat="MMM YYYY" value={value} onChange={setValue} />
        </div>;
}`,...(oe=(ne=w.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var se,re,ie;S.parameters={...S.parameters,docs:{...(se=S.parameters)==null?void 0:se.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  return <DatePicker value={value} getDayContent={date => customContent[date]} onChange={setValue} />;
}`,...(ie=(re=S.parameters)==null?void 0:re.docs)==null?void 0:ie.source}}};var ce,de,le;k.parameters={...k.parameters,docs:{...(ce=k.parameters)==null?void 0:ce.docs,source:{originalSource:`() => {
  const [date, setDate] = useState(new Date());
  const disabledDays = [{
    daysOfWeek: [0]
  }]; // Disable all Sunday

  const handleChange = (date, options) => {
    if (!options.disabled) {
      setDate(date);
    }
  };
  const handleClearDateClick = () => {
    setDate(null);
  };
  return <div className="h-75 w-75">
            <div>
                <Button className="mb-4" onClick={handleClearDateClick}>
                    Clear Date
                </Button>
            </div>

            <DatePickerPopover shouldShowYearPicker value={date} disabledDays={disabledDays} onChange={handleChange} />
        </div>;
}`,...(le=(de=k.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ue,he,me;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`() => {
  return <div className="h-75">
            <DatePickerPopover value={new Date()} dateFormat="DD MMM" onChange={handleOnChange}>
                <div className="cursor-pointer bg-gray-lighter p-3">Hello, click me to open up a date picker</div>
            </DatePickerPopover>
        </div>;
}`,...(me=(he=N.parameters)==null?void 0:he.docs)==null?void 0:me.source}}};var pe,De,ge;V.parameters={...V.parameters,docs:{...(pe=V.parameters)==null?void 0:pe.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  return <div className="h-75">
            <DatePickerPopover value={value} getDayContent={date => customContent[date]} onChange={date => setValue(date)} />
        </div>;
}`,...(ge=(De=V.parameters)==null?void 0:De.docs)==null?void 0:ge.source}}};var ye,fe,ve;Y.parameters={...Y.parameters,docs:{...(ye=Y.parameters)==null?void 0:ye.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  const [month, setMonth] = useState(dayjs());
  const tooltips = {};
  for (const date of getDaysArrayByMonth(month)) {
    tooltips[formatDate(date)] = {
      title: customContent[date.get("day")]
    };
  }
  const getTooltip = date => {
    if (tooltips[formatDate(date)]) {
      return tooltips[formatDate(date)].title;
    }
  };
  return <DatePicker getTooltip={getTooltip} value={value} onChange={setValue} onMonthChange={setMonth} />;
}`,...(ve=(fe=Y.parameters)==null?void 0:fe.docs)==null?void 0:ve.source}}};var Ce,we,Se;M.parameters={...M.parameters,docs:{...(Ce=M.parameters)==null?void 0:Ce.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const handleMonthChange = newMonth => {
    setMonth(newMonth);
  };
  const handleChange = value => {
    setValue(value);
  };
  return <>
            <div>
                Selected Date <code className="mr-1 bg-gray-lighter p-1 text-sm">onDayClick</code>
                <span className="inline-block pb-3 font-semibold">{dayjs(value).format("ddd, DD MMMM YYYY")}</span>
            </div>
            <div>
                Current Month <code className="mr-1 bg-gray-lighter p-1 text-sm">handleMonthChange</code>
                <span className="inline-block pb-3 font-semibold">{dayjs(month).format("MMMM YYYY")}</span>
            </div>
            <DatePicker value={value} onMonthChange={handleMonthChange} onChange={handleChange} />
        </>;
}`,...(Se=(we=M.parameters)==null?void 0:we.docs)==null?void 0:Se.source}}};var ke,Me,be;I.parameters={...I.parameters,docs:{...(ke=I.parameters)==null?void 0:ke.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(defaultMonth);
  const handleChange = value => {
    setValue(value);
  };
  const modifiers = {
    thursdays: {
      daysOfWeek: [4]
    },
    waitlist: [new Date(defaultMonth.setDate(18)), dayjs().set("day", 4).toDate()]
  };
  const modifiersStyles = {
    outside: {
      backgroundColor: colors.white
    }
  };
  const upcomingDates = [new Date(2022, 6, 20), new Date(2022, 4, 4), new Date(2022, 5, 5), new Date(2022, 2, 2), new Date(2022, 7, 7), new Date(2022, 6, 6)];
  return <DatePicker value={value} upcomingDates={upcomingDates} modifiersStyles={modifiersStyles} modifiers={modifiers} onChange={handleChange} />;
}`,...(be=(Me=I.parameters)==null?void 0:Me.docs)==null?void 0:be.source}}};const Re=["Default","DisabledDays","WithFooter","RestrictNavigation","ModifyCellStyle","SelectYearMonth","SelectMonth","MonthPickerPopover","WithCustomContent","PickerWithInput","PickerCustomInput","InputWithCustomContent","DatePickerWithTooltip","EventHandlers","WithUpcomingDates"];export{Y as DatePickerWithTooltip,P as Default,D as DisabledDays,M as EventHandlers,V as InputWithCustomContent,f as ModifyCellStyle,w as MonthPickerPopover,N as PickerCustomInput,k as PickerWithInput,y as RestrictNavigation,C as SelectMonth,v as SelectYearMonth,S as WithCustomContent,g as WithFooter,I as WithUpcomingDates,Re as __namedExportsOrder,He as default};
