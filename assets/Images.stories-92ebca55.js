import{j as e,a as t}from"./jsx-runtime-5e7b5774.js";import{l as f,cO as x,cN as h,cP as N}from"./lodash-e9238610.js";import{R as y}from"./index-e6e5af86.js";import{a as L}from"./index-c68cc01a.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";const X=f.omitBy(L,(o,a)=>!a.endsWith("Image")),b=f.map(X,(o,a)=>({Image:o,name:a})),w=["text-black","text-gray-dark","text-white","text-primary","text-secondary","text-success","text-warning","text-danger"],A={title:"Media/Images",args:{color:"text-black"},parameters:{design:[{name:"Original Logos",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2391%3A70526"},{name:"New Logos",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7869%3A616543"}]},argTypes:{color:{description:"Colors",table:{type:{summary:null},defaultValue:{summary:"text-black"}},options:w,control:{type:"select"}}}},I=({color:o})=>{let a="";return e("div",{className:"flex flex-row flex-wrap gap-3",children:b.map(({Image:u,name:l})=>{const i=l.slice(0,1),c=i!==a;return c&&(a=i),t(y.Fragment,{children:[c&&e("div",{className:"mt-3 w-full flex-grow text-lg font-bold",children:i}),t("div",{className:"space-y-2 rounded border border-gray-lighter p-2 text-center",children:[e("div",{className:"flex justify-center",children:e(u,{className:o})}),e("div",{className:"w-40 text-gray-dark",children:l})]})]},l)})})},s=({color:o})=>e(I,{color:o,size:"large"}),r=()=>t("div",{className:"space-y-8 divide-y divide-gray-light",children:[e("h3",{children:"Available Xola logos"}),t("div",{className:"pt-8",children:[e("div",{className:"mb-4 font-mono text-md",children:"<XolaLogoCircle />"}),e(x,{})]}),t("div",{className:"pt-8",children:[e("div",{className:"mb-4 font-mono text-md",children:"<XolaLogo />"}),e(h,{})]}),t("div",{className:"pt-8",children:[e("div",{className:"mb-4 font-mono text-md",children:"<XolaLogoSimple />"}),e(N,{size:"large"})]})]});s.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"XolaLogos"};var m,d,n;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`({
  color
}) => {
  return <ImageList color={color} size="large" />;
}`,...(n=(d=s.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};var g,p,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <div className="space-y-8 divide-y divide-gray-light">
            <h3>Available Xola logos</h3>
            <div className="pt-8">
                <div className="mb-4 font-mono text-md">&lt;XolaLogoCircle /&gt;</div>
                <XolaLogoCircle />
            </div>
            <div className="pt-8">
                <div className="mb-4 font-mono text-md">&lt;XolaLogo /&gt;</div>
                <XolaLogo />
            </div>
            <div className="pt-8">
                <div className="mb-4 font-mono text-md">&lt;XolaLogoSimple /&gt;</div>
                <XolaLogoSimple size="large" />
            </div>
        </div>;
}`,...(v=(p=r.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};const E=["Default","XolaLogos"];export{s as Default,r as XolaLogos,E as __namedExportsOrder,A as default};
