import{j as e}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{Z as a,B as l}from"./PieOptions-aea04668.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const Q={title:"Screens/Login",component:a,parameters:{docs:{description:{component:"A default login screen specifically for Xola"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/loaaBJLNhy9ipQe3HW5wIn/14---Login?node-id=2%3A12437"}},args:{backgroundType:"default"},argTypes:{backgroundType:{options:["default","x2","admin","scaffold"],control:{type:"select"},table:{defaultValue:{summary:"default"}}},label:{control:{type:"text"}},passwordResetUrl:{type:{required:!0},control:{type:"text"}}}},d=(o,L)=>{alert(`Hello ${o} Password: ${L.slice(0,2)}*** This is a WIP`)},r=o=>e(a,{onSubmit:d,...o}),n=()=>e(a,{backgroundType:"x2",label:e(l,{color:"warning",className:"!rounded",children:"X2"}),onSubmit:d}),s=()=>e(a,{backgroundType:"admin",label:e(l,{color:"danger",size:"medium",className:"!rounded",children:"THIS IS THE ADMIN PANEL!!111"}),onSubmit:d}),t=()=>e(a,{backgroundType:"scaffold",label:e(l,{className:"!rounded",children:"Scaffold"}),onSubmit:d}),c=()=>e(a,{backgroundImage:"http://source.unsplash.com/noOXRT9gfQ8/w=4096",label:e(l,{className:"!rounded",children:"Custom Background for Internal Tools"}),onSubmit:d});r.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"X2"};s.__docgenInfo={description:"",methods:[],displayName:"Admin"};t.__docgenInfo={description:"",methods:[],displayName:"Scaffold"};c.__docgenInfo={description:"",methods:[],displayName:"Custom"};var m,i,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`props => {
  return <Login onSubmit={onSubmit} {...props} />;
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,g,b;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const label = <Badge color="warning" className="!rounded">
            X2
        </Badge>;
  return <Login backgroundType="x2" label={label} onSubmit={onSubmit} />;
}`,...(b=(g=n.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,S,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const label = <Badge color="danger" size="medium" className="!rounded">
            THIS IS THE ADMIN PANEL!!111
        </Badge>;
  return <Login backgroundType="admin" label={label} onSubmit={onSubmit} />;
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var N,T,I;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const label = <Badge className="!rounded">Scaffold</Badge>;
  return <Login backgroundType="scaffold" label={label} onSubmit={onSubmit} />;
}`,...(I=(T=t.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var h,B,k;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const label = <Badge className="!rounded">Custom Background for Internal Tools</Badge>;
  return <Login backgroundImage="http://source.unsplash.com/noOXRT9gfQ8/w=4096" label={label} onSubmit={onSubmit} />;
}`,...(k=(B=c.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};const R=["Default","X2","Admin","Scaffold","Custom"];export{s as Admin,c as Custom,r as Default,t as Scaffold,n as X2,R as __namedExportsOrder,Q as default};
