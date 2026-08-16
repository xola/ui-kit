import{j as i,a as S}from"./jsx-runtime-5e7b5774.js";import{r as n}from"./index-e6e5af86.js";import{S as a}from"./PieOptions-00f89f27.js";import"./lodash-e9238610.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const W={primary:!0,title:"Forms & Fields/Switch",parameters:{docs:{description:{component:"This is a toggle for situations where you require a better looking boolean form component"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A483033&viewport=7074%2C-1137%2C0.4"}},args:{size:"medium"},argTypes:{size:{description:"Switch Size",table:{type:{summary:null},defaultValue:{summary:"medium"}},options:["small","medium","large"],control:{type:"radio"}}}},t=({size:e})=>{const[s,c]=n.useState(!1);return i(a,{isChecked:s,size:e,onChange:c})},r=()=>{const[e,s]=n.useState(!1);return S(a.Group,{children:[i(a.Label,{direction:"left",children:"Hello World"}),i(a,{isChecked:e,size:"small",onChange:s})]})},o=({size:e})=>{const[s,c]=n.useState(!1);return i(a,{disabled:!0,isChecked:s,size:e,onChange:c})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};o.__docgenInfo={description:"",methods:[],displayName:"Disabled"};var d,l,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  size
}) => {
  const [checked, setChecked] = useState(false);
  return <Switch isChecked={checked} size={size} onChange={setChecked} />;
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var h,p,u;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Switch.Group>
            <Switch.Label direction="left">Hello World</Switch.Label>
            <Switch isChecked={checked} size="small" onChange={setChecked} />
        </Switch.Group>;
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var k,f,C;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`({
  size
}) => {
  const [checked, setChecked] = useState(false);
  return <Switch disabled isChecked={checked} size={size} onChange={setChecked} />;
}`,...(C=(f=o.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};const E=["Default","WithLabel","Disabled"];export{t as Default,o as Disabled,r as WithLabel,E as __namedExportsOrder,W as default};
