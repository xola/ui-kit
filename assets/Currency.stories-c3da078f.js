import{a as n,j as r}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{a as s,n as P}from"./PieOptions-89d97896.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const q={title:"Data Display/Currency",component:s,parameters:{docs:{description:{component:"Currency formatter"}}},args:{amount:109482.84,locale:"en-US",removeTrailingZeroes:!0},argTypes:{amount:{description:"A number",type:{required:!0},control:{type:"number"},table:{type:{summary:"For demo only"}}},locale:{description:"A locale string",type:{required:!0},control:{type:"select"},options:["en-IN","en-US","fr-FR","ja-JP","de-DE","ar-AE","en-CA","fr-CA"],table:{type:{summary:null},defaultValue:{summary:"Auto-detected based on browser settings"}}},currency:{description:"Three characater currency code",type:{required:!0},control:{type:"select"},options:["USD","GBP","EUR","JPY","INR","AED"],table:{type:{summary:null},defaultValue:{summary:null}}},removeTrailingZeroes:{description:"Strip trailing `.00`",control:{type:"boolean"},table:{type:{summary:null},defaultValue:{summary:!0}}}}},l=({currency:e,locale:a,removeTrailingZeroes:o,amount:c})=>n("div",{children:[n("div",{className:"mb-2",children:["Using the native"," ",r("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",children:"Intl.NumberFormat"})," ","API"]}),r(s,{currency:e,locale:a,removeTrailingZeroes:o,children:c})]}),t=({amount:e,locale:a})=>n("div",{className:"flex flex-col space-y-2",children:[n("span",{className:"font-semibold",children:["Amount: ",e]}),n("span",{className:"pb-4 font-semibold",children:["Locale: ",a]}),["EUR","GBP","INR","AUD","CAD","NZD","MXN","JPY","AED"].map(c=>n("span",{className:"flex space-x-4",children:[r("span",{children:c}),r(s,{locale:a,currency:c,children:e})]},c))]}),m=()=>n("div",{children:[r("div",{className:"pb-4 text-base",children:"US Dollar amount in a few popular locales using the currency's narrow symbol"}),["en-US","en-GB","en-AU","ar-AE","de-DE","fr-FR","ja-JP","en-IN","es-ES"].map(a=>n("div",{className:"my-2 space-x-4",children:[n("span",{children:["Locale: ",a]}),r("span",{className:"font-mono",children:r(s,{locale:a,currency:"USD",children:109482.84})})]},a))]}),u=()=>{const e=109482.9123123;return n("div",{className:"flex flex-col space-y-2",children:[n("span",{className:"mb-1 font-semibold",children:["Amount: ",e]}),n("span",{children:["Euro: ",r(s.Round,{currency:"EUR",children:e})]}),n("span",{children:["JPY: ",r(s.Round,{currency:"JPY",children:e})," (Zero decimal)"]})]})},i=({amount:e,currency:a="USD",locale:o="en-USD"})=>r(s.Split,{currency:a,locale:o,children:e}),p=({locale:e})=>[123,1234,123456,123456789,123456789123].map(o=>n("div",{className:"my-2 font-mono tracking-tighter",children:[P(o,null,e,0),":"," ",r("span",{className:"font-semibold",children:r(s,{compact:!0,locale:e,children:o})})]},o));l.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"AllCurrencies"};m.__docgenInfo={description:"",methods:[],displayName:"LocalesWithUSDollar"};u.__docgenInfo={description:"",methods:[],displayName:"RoundOnly"};i.__docgenInfo={description:"",methods:[],displayName:"SplitAmountFormatting",props:{currency:{defaultValue:{value:'"USD"',computed:!1},required:!1},locale:{defaultValue:{value:'"en-USD"',computed:!1},required:!1}}};var d,y,f;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`({
  currency,
  locale,
  removeTrailingZeroes,
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
            <Currency currency={currency} locale={locale} removeTrailingZeroes={removeTrailingZeroes}>
                {amount}
            </Currency>
        </div>;
}`,...(f=(y=l.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var h,N,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`({
  amount,
  locale
}) => {
  const currencies = ["EUR", "GBP", "INR", "AUD", "CAD", "NZD", "MXN", "JPY", "AED"];
  return <div className="flex flex-col space-y-2">
            <span className="font-semibold">Amount: {amount}</span>
            <span className="pb-4 font-semibold">Locale: {locale}</span>
            {currencies.map(currency => {
      return <span key={currency} className="flex space-x-4">
                        <span>{currency}</span>
                        <Currency locale={locale} currency={currency}>
                            {amount}
                        </Currency>
                    </span>;
    })}
        </div>;
}`,...(b=(N=t.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var S,v,g;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const locales = ["en-US", "en-GB", "en-AU", "ar-AE", "de-DE", "fr-FR", "ja-JP", "en-IN", "es-ES"];
  return <div>
            <div className="pb-4 text-base">
                US Dollar amount in a few popular locales using the currency's narrow symbol
            </div>
            {locales.map(locale => {
      return <div key={locale} className="my-2 space-x-4">
                        <span>Locale: {locale}</span>
                        <span className="font-mono">
                            <Currency locale={locale} currency="USD">
                                {109_482.84}
                            </Currency>
                        </span>
                    </div>;
    })}
        </div>;
}`,...(g=(v=m.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var D,U,A;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const amount = 109_482.912_312_3;
  return <div className="flex flex-col space-y-2">
            <span className="mb-1 font-semibold">Amount: {amount}</span>
            <span>
                Euro: <Currency.Round currency="EUR">{amount}</Currency.Round>
            </span>
            <span>
                JPY: <Currency.Round currency="JPY">{amount}</Currency.Round> (Zero decimal)
            </span>
        </div>;
}`,...(A=(U=u.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var C,_,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`({
  amount,
  currency = "USD",
  locale = "en-USD"
}) => {
  return <Currency.Split currency={currency} locale={locale}>
            {amount}
        </Currency.Split>;
}`,...(R=(_=i.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var x,E,I;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`({
  locale
}) => {
  const amounts = [123, 1234, 123_456, 123_456_789, 123_456_789_123];
  return amounts.map(amount => <div key={amount} className="my-2 font-mono tracking-tighter">
            {numberFormat(amount, null, locale, 0)}:{" "}
            <span className="font-semibold">
                <Currency compact locale={locale}>
                    {amount}
                </Currency>
            </span>
        </div>);
}`,...(I=(E=p.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const w=["Default","AllCurrencies","LocalesWithUSDollar","RoundOnly","SplitAmountFormatting","CompactValues"];export{t as AllCurrencies,p as CompactValues,l as Default,m as LocalesWithUSDollar,u as RoundOnly,i as SplitAmountFormatting,w as __namedExportsOrder,q as default};
