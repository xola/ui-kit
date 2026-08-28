import{a as d,j as t}from"./jsx-runtime-5e7b5774.js";import{r as p}from"./index-e6e5af86.js";import{j as e}from"./PieOptions-9a77d11f.js";import{E as B,M as m,C as S}from"./MixedChecklistIcon-341e9dce.js";import{W as v}from"./WaitlistIcon-2523e8de.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const N={title:"Forms & Fields/Buttons/ButtonGroup",component:e,args:{size:"medium"},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7456%3A467977"}},argTypes:{size:{options:["small","medium","large"],control:{type:"radio"},table:{defaultValue:{summary:"medium"}}},value:{description:"An integer from 0 onwards to indicate which button is active. Defaults to `null`",control:{type:"number"},table:{defaultValue:{summary:null}}}}},c=({size:o="medium",value:n=-1})=>{const[i,u]=p.useState(n);return d(e,{size:o,value:i,onChange:s=>u(s),children:[t(e.Button,{children:"First"}),t(e.Button,{children:"Second"}),t(e.Button,{children:"Third"})]})},r=({size:o,value:n=-1})=>{const[i,u]=p.useState(n);return d(e,{size:o,value:i,onChange:s=>u(s),children:[t(e.Button,{children:"Reserved"}),t(e.Button,{icon:t(v,{}),children:"Waitlist"}),t(e.Button,{isHidden:!0,icon:t(B,{}),children:"Available"}),t(e.Button,{icon:t(m,{}),children:"All"})]})};r.parameters={docs:{description:{story:"Use `icon` and `iconPlacement` attributes to show an icon with the text and control it's positioning"}}};const a=({size:o,value:n=0})=>{const[i,u]=p.useState(n);return d(e,{isCollapsed:!0,size:o,value:i,onChange:s=>u(s),children:[t(e.Button,{icon:t(S,{}),children:"Reserved"}),t(e.Button,{icon:t(v,{}),children:"Waitlist"}),t(e.Button,{icon:t(B,{}),children:"Available"}),t(e.Button,{icon:t(m,{}),children:"All"})]})};a.parameters={docs:{description:{story:"Pass `isCollapsed` to only show the active button's text in the ButtonGroup"}}};const l=({size:o,value:n=0})=>{const[i,u]=p.useState(n);return d(e,{isCollapsed:!0,size:o,value:i,onChange:s=>u(s),children:[t(e.Button,{children:"Reserved"}),t(e.Button,{icon:t(v,{}),children:"Waitlist"}),t(e.Button,{isHidden:!0,icon:t(B,{}),children:"Available"}),t(e.Button,{icon:t(m,{}),children:"All"})]})};l.parameters={docs:{description:{story:"If icon isn't specified the text will be displayed in the collapsed state instead. Use `isHidden` to hide a button."}}};c.__docgenInfo={description:"",methods:[],displayName:"Default",props:{size:{defaultValue:{value:'"medium"',computed:!1},required:!1},value:{defaultValue:{value:"-1",computed:!1},required:!1}}};r.__docgenInfo={description:"",methods:[],displayName:"WithIcons",props:{value:{defaultValue:{value:"-1",computed:!1},required:!1}}};a.__docgenInfo={description:"",methods:[],displayName:"Collapsible",props:{value:{defaultValue:{value:"0",computed:!1},required:!1}}};l.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWithTextFallback",props:{value:{defaultValue:{value:"0",computed:!1},required:!1}}};var h,G,f;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`({
  size = "medium",
  value = -1
}) => {
  const [active, setActive] = useState(value);
  return <ButtonGroup size={size} value={active} onChange={index => setActive(index)}>
            <ButtonGroup.Button>First</ButtonGroup.Button>
            <ButtonGroup.Button>Second</ButtonGroup.Button>
            <ButtonGroup.Button>Third</ButtonGroup.Button>
        </ButtonGroup>;
}`,...(f=(G=c.parameters)==null?void 0:G.docs)==null?void 0:f.source}}};var C,A,g;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`({
  size,
  value = -1
}) => {
  const [active, setActive] = useState(value);
  return <ButtonGroup size={size} value={active} onChange={index => setActive(index)}>
            <ButtonGroup.Button>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button isHidden icon={<EmptyChecklistIcon />}>
                Available
            </ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>;
}`,...(g=(A=r.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};var x,b,I;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`({
  size,
  value = 0
}) => {
  const [active, setActive] = useState(value);
  return <ButtonGroup isCollapsed size={size} value={active} onChange={index => setActive(index)}>
            <ButtonGroup.Button icon={<ChecklistIcon />}>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button icon={<EmptyChecklistIcon />}>Available</ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>;
}`,...(I=(b=a.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var y,W,z;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`({
  size,
  value = 0
}) => {
  const [active, setActive] = useState(value);
  return <ButtonGroup isCollapsed size={size} value={active} onChange={index => setActive(index)}>
            <ButtonGroup.Button>Reserved</ButtonGroup.Button>
            <ButtonGroup.Button icon={<WaitlistIcon />}>Waitlist</ButtonGroup.Button>
            <ButtonGroup.Button isHidden icon={<EmptyChecklistIcon />}>
                Available
            </ButtonGroup.Button>
            <ButtonGroup.Button icon={<MixedChecklistIcon />}>All</ButtonGroup.Button>
        </ButtonGroup>;
}`,...(z=(W=l.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};const U=["Default","WithIcons","Collapsible","CollapsibleWithTextFallback"];export{a as Collapsible,l as CollapsibleWithTextFallback,c as Default,r as WithIcons,U as __namedExportsOrder,N as default};
