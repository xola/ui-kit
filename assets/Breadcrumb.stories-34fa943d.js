import{j as r,a as l}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{x as e}from"./PieOptions-9a77d11f.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const S={title:"Navigation/Breadcrumb",component:e,parameters:{docs:{description:{component:"Breadcrumbs are generally used by Xola in the header"}}},args:{spacing:2,separator:"/"},argTypes:{spacing:{description:"Spacing between elements",control:{type:"number"},table:{defaultValue:{summary:2},type:{summary:null}}},separator:{description:"The string that separates the items",control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"/"}}}}},a=({spacing:p,separator:d})=>r("div",{className:"space-x-6",children:l(e,{spacing:p,separator:d,children:[r(e.Item,{children:"Settings"}),r(e.Item,{children:"Preferences"})]})}),t=()=>r("div",{className:"space-x-6",children:l(e,{spacing:3,separator:"/",children:[r(e.Item,{className:"text-2xl",children:"Settings"}),r(e.Item,{className:"text-2xl",children:"Preferences"}),r(e.Item,{className:"text-2xl",children:"Gifts"})]})});a.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"MultipleLevels"};var s,m,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`({
  spacing,
  separator
}) => {
  return <div className="space-x-6">
            <Breadcrumb spacing={spacing} separator={separator}>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>Preferences</Breadcrumb.Item>
            </Breadcrumb>
        </div>;
}`,...(c=(m=a.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var n,i,o;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <div className="space-x-6">
            <Breadcrumb spacing={3} separator="/">
                <Breadcrumb.Item className="text-2xl">Settings</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Preferences</Breadcrumb.Item>
                <Breadcrumb.Item className="text-2xl">Gifts</Breadcrumb.Item>
            </Breadcrumb>
        </div>;
}`,...(o=(i=t.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const _=["Default","MultipleLevels"];export{a as Default,t as MultipleLevels,_ as __namedExportsOrder,S as default};
