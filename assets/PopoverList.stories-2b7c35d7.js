import{j as e,a as o}from"./jsx-runtime-5e7b5774.js";import{r as _}from"./index-e6e5af86.js";import{W as t,c as d}from"./PieOptions-9a77d11f.js";import{M as v,C as h,a as k,b as C}from"./MenuIcon-22e8aac8.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const j={id:"PopoverList",title:"Overlay/Popover List",component:t,args:{placement:"bottom",trigger:"mouseenter"},argTypes:{placement:{type:{required:!1},description:"The direction to show the popover",control:{type:"select"},options:["top","bottom","left","right","auto"],table:{type:"string",defaultValue:{summary:"bottom"}}},trigger:{type:{required:!1},description:"One or multiple values to indicate what causes the tooltip to show up",control:{type:"select"},options:["mouseenter","click","focus","focusin","manual"],table:{type:"select",defaultValue:{summary:"hover"}}}},parameters:{docs:{description:{component:"Render a list of items with icons in the Popover. All other arguments are not documented here because they are same as **Popover**"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=220%3A189753"}}},l=()=>{const[s,i]=_.useState(!1),r=()=>i(!0),m=()=>i(!1),n=(I,p)=>{console.log("Clicked on",I,p),i(!1)};return e("div",{className:"h-64",children:o(t,{offset:[0,18],visible:s,onClickOutside:m,children:[e(d,{onClick:s?m:r,children:"Hover over me"}),o(t.Item,{name:"list",onClickItem:n,children:[e(v,{}),e("span",{children:"List"})]}),o(t.Item,{isActive:!0,name:"day",onClickItem:n,children:[e(h,{}),e("span",{children:"Day"})]}),o(t.Item,{name:"week",onClickItem:n,children:[e(k,{}),e("span",{children:"Week"})]}),o(t.Item,{name:"month",onClickItem:n,children:[e(C,{}),e("span",{children:"Month"})]}),o(t.Item,{name:"list",onClickItem:n,children:[e(v,{}),e("span",{children:"List"})]}),o(t.Item,{isActive:!0,name:"day",onClickItem:n,children:[e(h,{}),e("span",{children:"Day"})]}),o(t.Item,{name:"week",onClickItem:n,children:[e(k,{}),e("span",{children:"Week"})]}),o(t.Item,{name:"month",onClickItem:n,children:[e(C,{}),e("span",{children:"Month"})]})]})})},a=s=>{const i=(r,m)=>console.log("Clicked on",r,m);return e("div",{className:"h-32",children:o(t,{offset:[0,18],...s,children:[e(d,{children:"Hover over me"}),e(t.Item,{name:"list",onClickItem:i,children:"Listing"}),e(t.Item,{name:"guides",onClickItem:i,children:"Guides"})]})})},c=()=>{const[s,i]=_.useState(!1),r=()=>i(!0),m=()=>i(!1),n=(I,p)=>{console.log("Clicked on",I,p),i(!1)};return e("div",{className:"h-64",children:o(t,{className:"max-h-96 w-75 overflow-y-auto",offset:[0,18],visible:s,onClickOutside:m,children:[e(d,{onClick:s?m:r,children:"Click here"}),e(t.Item,{name:"item1",onClickItem:n,children:"Item 1"}),e(t.Item,{name:"item2",onClickItem:n,children:"Item 2"}),e(t.Item,{name:"item3",onClickItem:n,children:"Item 3"}),e(t.Item,{name:"item4",onClickItem:n,children:"Item 4"}),e(t.Item,{name:"item5",onClickItem:n,children:"Item 5"}),e(t.Item,{name:"item6",onClickItem:n,children:"Item 6"}),e(t.Item,{name:"item7",onClickItem:n,children:"Item 7"}),e(t.Item,{name:"item8",onClickItem:n,children:"Item 8"}),e(t.Item,{name:"item9",onClickItem:n,children:"Item 9"}),e(t.Item,{name:"item10",onClickItem:n,children:"Item 10"})]})})};l.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"NoIcons"};c.__docgenInfo={description:"",methods:[],displayName:"Scrollable"};var u,L,P;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const onClickItem = (event_, element) => {
    console.log("Clicked on", event_, element);
    setVisible(false);
  };
  return <div className="h-64">
            <PopoverList offset={[0, 18]} visible={visible} onClickOutside={hide}>
                <Button onClick={visible ? hide : show}>Hover over me</Button>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    <MenuIcon />
                    <span>List</span>
                </PopoverList.Item>
                <PopoverList.Item isActive name="day" onClickItem={onClickItem}>
                    <CalendarDayIcon />
                    <span>Day</span>
                </PopoverList.Item>
                <PopoverList.Item name="week" onClickItem={onClickItem}>
                    <CalendarWeekIcon />
                    <span>Week</span>
                </PopoverList.Item>
                <PopoverList.Item name="month" onClickItem={onClickItem}>
                    <CalendarMonthIcon />
                    <span>Month</span>
                </PopoverList.Item>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    <MenuIcon />
                    <span>List</span>
                </PopoverList.Item>
                <PopoverList.Item isActive name="day" onClickItem={onClickItem}>
                    <CalendarDayIcon />
                    <span>Day</span>
                </PopoverList.Item>
                <PopoverList.Item name="week" onClickItem={onClickItem}>
                    <CalendarWeekIcon />
                    <span>Week</span>
                </PopoverList.Item>
                <PopoverList.Item name="month" onClickItem={onClickItem}>
                    <CalendarMonthIcon />
                    <span>Month</span>
                </PopoverList.Item>
            </PopoverList>
        </div>;
}`,...(P=(L=l.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var f,b,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`props => {
  const onClickItem = (event_, element) => console.log("Clicked on", event_, element);
  return <div className="h-32">
            <PopoverList offset={[0, 18]} {...props}>
                <Button>Hover over me</Button>
                <PopoverList.Item name="list" onClickItem={onClickItem}>
                    Listing
                </PopoverList.Item>
                <PopoverList.Item name="guides" onClickItem={onClickItem}>
                    Guides
                </PopoverList.Item>
            </PopoverList>
        </div>;
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var y,w,N;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const onClickItem = (event_, element) => {
    console.log("Clicked on", event_, element);
    setVisible(false);
  };
  return <div className="h-64">
            <PopoverList className="max-h-96 w-75 overflow-y-auto" offset={[0, 18]} visible={visible} onClickOutside={hide}>
                <Button onClick={visible ? hide : show}>Click here</Button>
                <PopoverList.Item name="item1" onClickItem={onClickItem}>
                    Item 1
                </PopoverList.Item>
                <PopoverList.Item name="item2" onClickItem={onClickItem}>
                    Item 2
                </PopoverList.Item>
                <PopoverList.Item name="item3" onClickItem={onClickItem}>
                    Item 3
                </PopoverList.Item>
                <PopoverList.Item name="item4" onClickItem={onClickItem}>
                    Item 4
                </PopoverList.Item>
                <PopoverList.Item name="item5" onClickItem={onClickItem}>
                    Item 5
                </PopoverList.Item>
                <PopoverList.Item name="item6" onClickItem={onClickItem}>
                    Item 6
                </PopoverList.Item>
                <PopoverList.Item name="item7" onClickItem={onClickItem}>
                    Item 7
                </PopoverList.Item>
                <PopoverList.Item name="item8" onClickItem={onClickItem}>
                    Item 8
                </PopoverList.Item>
                <PopoverList.Item name="item9" onClickItem={onClickItem}>
                    Item 9
                </PopoverList.Item>
                <PopoverList.Item name="item10" onClickItem={onClickItem}>
                    Item 10
                </PopoverList.Item>
            </PopoverList>
        </div>;
}`,...(N=(w=c.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const G=["Default","NoIcons","Scrollable"];export{l as Default,a as NoIcons,c as Scrollable,G as __namedExportsOrder,j as default};
