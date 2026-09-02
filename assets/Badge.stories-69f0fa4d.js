import{j as e,a as s}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{B as r}from"./PieOptions-ef3152f6.js";import{S as i,E as I,B as D,C as N,a as _}from"./StackIcon-82582b74.js";import{B as A}from"./lodash-ab783b60.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const V={title:"Data Display/Badges",component:r,args:{text:"Default",color:"primary",size:"small"},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60"}},argTypes:{text:{type:{required:!0},control:{type:"text"}},color:{options:["primary","secondary","success","warning","caution","danger","problem","critical"],control:{type:"select"}},size:{options:["small","medium","large"],control:{type:"inline-radio"}}}},a=({text:x="Default",color:C,size:v,className:z})=>e("div",{className:"space-x-4",children:e(r,{className:z,color:C,size:v,children:x})}),o=()=>s("div",{className:"grid grid-cols-5 gap-4",children:[e(r,{color:"primary",icon:e(i,{}),children:"Primary"}),e(r,{color:"secondary",icon:e(I,{}),children:"Secondary"}),e(r,{color:"success",icon:e(D,{}),children:"Success"}),e(r,{color:"warning",icon:e(A,{}),children:"Warning"}),e(r,{color:"caution",icon:e(N,{}),children:"Caution"}),e(r,{color:"danger",icon:e(_,{}),children:"Danger"}),e(r,{color:"critical",icon:e(i,{}),children:"Critical"})]}),n=()=>s("div",{className:"space-x-4",children:[e(r,{color:"primary",children:"Primary"}),e(r,{color:"secondary",children:"Secondary"}),e(r,{color:"success",children:"Success"}),e(r,{color:"warning",children:"Warning"}),e(r,{color:"caution",children:"Caution"}),e(r,{color:"danger",children:"Danger"}),e(r,{color:"problem",children:"Problem"}),e(r,{color:"critical",children:"Critical"})]}),c=()=>s("div",{className:"space-x-4",children:[e(r,{size:"small",children:"Small"}),e(r,{size:"medium",icon:e(i,{}),children:"A Medium One"}),e(r,{size:"large",icon:e(I,{}),children:"A Large One"})]});a.__docgenInfo={description:"",methods:[],displayName:"Default",props:{text:{defaultValue:{value:'"Default"',computed:!1},required:!1}}};o.__docgenInfo={description:"",methods:[],displayName:"WithIcons"};n.__docgenInfo={description:"",methods:[],displayName:"Colors"};c.__docgenInfo={description:"",methods:[],displayName:"AllSizes"};var l,d,t;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`({
  text = "Default",
  color,
  size,
  className
}) => {
  return <div className="space-x-4">
            <Badge className={className} color={color} size={size}>
                {text}
            </Badge>
        </div>;
}`,...(t=(d=a.parameters)==null?void 0:d.docs)==null?void 0:t.source}}};var m,g,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <div className="grid grid-cols-5 gap-4">
            <Badge color="primary" icon={<StackIcon />}>
                Primary
            </Badge>
            <Badge color="secondary" icon={<EditIcon />}>
                Secondary
            </Badge>
            <Badge color="success" icon={<BoxIcon />}>
                Success
            </Badge>
            <Badge color="warning" icon={<BellIcon />}>
                Warning
            </Badge>
            <Badge color="caution" icon={<CashIcon />}>
                Caution
            </Badge>
            <Badge color="danger" icon={<CakeIcon />}>
                Danger
            </Badge>
            <Badge color="critical" icon={<StackIcon />}>
                Critical
            </Badge>
        </div>;
}`,...(p=(g=o.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var u,B,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="caution">Caution</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="problem">Problem</Badge>
            <Badge color="critical">Critical</Badge>
        </div>;
}`,...(h=(B=n.parameters)==null?void 0:B.docs)==null?void 0:h.source}}};var y,S,f;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <Badge size="small">Small</Badge>

            <Badge size="medium" icon={<StackIcon />}>
                A Medium One
            </Badge>

            <Badge size="large" icon={<EditIcon />}>
                A Large One
            </Badge>
        </div>;
}`,...(f=(S=c.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};const T=["Default","WithIcons","Colors","AllSizes"];export{c as AllSizes,n as Colors,a as Default,o as WithIcons,T as __namedExportsOrder,V as default};
