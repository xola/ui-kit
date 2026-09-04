import{a as n,j as a}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{N as m,n as b}from"./PieOptions-89d97896.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const A={title:"Data Display/Number",component:m,parameters:{docs:{description:{component:"Number formatter"}}},args:{amount:109482.84,locale:"en-US",removeTrailingZeroes:!0},argTypes:{amount:{description:"A number",type:{required:!0},control:{type:"number"},table:{type:{summary:"For demo only"}}},locale:{description:"A locale string",type:{required:!0},control:{type:"select"},options:["en-IN","en-US","fr-FR","ja-JP","de-DE","ar-AE"],table:{type:{summary:null},defaultValue:{summary:"Auto-detected based on browser settings"}}}}},e=({locale:r,amount:s})=>n("div",{children:[n("div",{className:"mb-2",children:["Using the native"," ",a("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",children:"Intl.NumberFormat"})," ","API"]}),a(m,{locale:r,children:s})]}),t=({locale:r})=>[123,1234,123456,123456789,123456789123].map(o=>n("div",{className:"my-2 font-mono tracking-tighter",children:[b(o,null,r,0),":"," ",a("span",{className:"font-semibold",children:a(m,{isCompact:!0,locale:r,children:o})})]},o));e.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,c,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`({
  locale,
  amount
}) => {
  return <div>
            <div className="mb-2">
                Using the native{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat">
                    Intl.NumberFormat
                </a>{" "}
                API
            </div>
            <Number locale={locale}>{amount}</Number>
        </div>;
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,p,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
  locale
}) => {
  const amounts = [123, 1234, 123_456, 123_456_789, 123_456_789_123];
  return amounts.map(amount => <div key={amount} className="my-2 font-mono tracking-tighter">
            {numberFormat(amount, null, locale, 0)}:{" "}
            <span className="font-semibold">
                <Number isCompact locale={locale}>
                    {amount}
                </Number>
            </span>
        </div>);
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const D=["Default","CompactValues"];export{t as CompactValues,e as Default,D as __namedExportsOrder,A as default};
