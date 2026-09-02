import{j as o,a as m}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{e as r}from"./PieOptions-b170d78a.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const w={title:"Data Display/Dot",component:r,parameters:{docs:{description:{component:"A simple dot component to act as spacers between various elements"}}},args:{color:"primary"},argTypes:{color:{options:["primary","secondary","success","warning","danger","caution"],control:{type:"select"}}}},e=({color:p})=>o("div",{className:"space-x-4",children:o(r,{color:p})}),s=()=>m("div",{className:"space-x-4",children:[o(r,{color:"primary"}),o(r,{color:"secondary"}),o(r,{color:"success"}),o(r,{color:"warning"}),o(r,{color:"caution"}),o(r,{color:"danger"})]});e.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"AllColors"};var a,c,t;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  color
}) => {
  return <div className="space-x-4">
            <Dot color={color} />
        </div>;
}`,...(t=(c=e.parameters)==null?void 0:c.docs)==null?void 0:t.source}}};var n,i,l;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <Dot color="primary" />
            <Dot color="secondary" />
            <Dot color="success" />
            <Dot color="warning" />
            <Dot color="caution" />
            <Dot color="danger" />
        </div>;
}`,...(l=(i=s.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const A=["Default","AllColors"];export{s as AllColors,e as Default,A as __namedExportsOrder,w as default};
