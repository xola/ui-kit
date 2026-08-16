import{j as a}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{i as s}from"./PieOptions-727b644f.js";import"./lodash-fd0d49af.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const I={title:"Data Display/Tag",component:s,args:{color:"primary",size:"medium",text:"Listing: Kayaking in the Ganges"},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=384%3A60"}},argTypes:{text:{type:{required:!0},control:{type:"text"}},color:{options:["primary","secondary"],control:{type:"select"}},size:{options:["small","medium","large"],control:{type:"radio"}}}},u=()=>{console.log("Closed")},e=({color:T,size:y,text:f})=>a(s,{color:T,size:y,onClose:u,children:f}),o=()=>a(s,{color:"secondary",size:"small",onClose:u,children:"Testing Tag"}),r=()=>a(s,{color:"secondary",size:"small",children:"You cannot remove this tag"});e.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:"",methods:[],displayName:"BookingTag"};r.__docgenInfo={description:"",methods:[],displayName:"SystemTag"};var t,n,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
  color,
  size,
  text
}) => {
  return <Tag color={color} size={size} onClose={onTagCloseClick}>
            {text}
        </Tag>;
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var c,m,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <Tag color="secondary" size="small" onClose={onTagCloseClick}>
            Testing Tag
        </Tag>;
}`,...(l=(m=o.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  return <Tag color="secondary" size="small">
            You cannot remove this tag
        </Tag>;
}`,...(d=(g=r.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};const w=["Default","BookingTag","SystemTag"];export{o as BookingTag,e as Default,r as SystemTag,w as __namedExportsOrder,I as default};
