import{j as r,a as h}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{K as e}from"./PieOptions-9a77d11f.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const I={title:"Data Display/Key",component:e,parameters:{docs:{description:{component:"Display a character as a keyboard key"}}},argTypes:{char:{description:"Character t show",type:{required:!0},control:{type:"text"},table:{type:{summary:"example: K"}}}}},a=({char:y="K"})=>r(e,{char:y}),s=()=>r(e,{char:"cmd"}),t=()=>h("div",{className:"space-x-3",children:[r(e,{char:"shift"}),r(e,{char:"esc"}),r(e,{char:"alt"}),r(e,{char:"enter"})]});a.__docgenInfo={description:"",methods:[],displayName:"Default",props:{char:{defaultValue:{value:'"K"',computed:!1},required:!1}}};s.__docgenInfo={description:"",methods:[],displayName:"MacCommandKey"};t.__docgenInfo={description:"",methods:[],displayName:"SpecialKeys"};var o,c,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`({
  char = "K"
}) => {
  return <Key char={char} />;
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var n,m,i;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <Key char="cmd" />;
}`,...(i=(m=s.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var d,l,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <div className="space-x-3">
            <Key char="shift" />
            <Key char="esc" />
            <Key char="alt" />
            <Key char="enter" />
        </div>;
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const M=["Default","MacCommandKey","SpecialKeys"];export{a as Default,s as MacCommandKey,t as SpecialKeys,M as __namedExportsOrder,I as default};
