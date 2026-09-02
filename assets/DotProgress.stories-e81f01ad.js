import{j as t}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{g as n}from"./PieOptions-b170d78a.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const P={title:"Data Display/DotProgress",component:n,parameters:{docs:{description:{component:"Show the progress of any sequence through dots"}}},args:{current:1,total:6},argTypes:{current:{type:{required:!0},description:"The current position. Starts at 0",control:{type:"number"}},total:{type:{required:!0},description:"The total count in progress",control:{type:"number"}}}},r=({current:a,total:i})=>t("div",{children:t(n,{current:a,total:i})});r.__docgenInfo={description:"",methods:[],displayName:"Default"};var e,o,s;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`({
  current,
  total
}) => {
  return <div>
            <DotProgress current={current} total={total} />
        </div>;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const S=["Default"];export{r as Default,S as __namedExportsOrder,P as default};
