import{j as e,a as g}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{A as r}from"./PieOptions-9a77d11f.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const I={title:"Data Display/Alerts & Banners",component:r,parameters:{docs:{description:{component:"Alerts are short one line components whereas banners are multi-line versions of banners"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=198%3A110085&viewport=-5176%2C179%2C0.57"}},args:{text:"Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before!",color:"primary"},argTypes:{text:{type:{required:!1},description:"The text in the component",control:{type:"text"},table:{type:{summary:"For demo only"}}},color:{options:["primary","success","warning","danger"],control:{type:"select"},table:{type:{summary:null},defaultValue:{summary:"primary"}}}}},o=({className:n,color:f,text:y="Default"})=>e("div",{className:"space-x-4",children:e(r,{className:n,color:f,children:y})}),s=()=>g("div",{className:"space-y-4",children:[e(r,{color:"primary",children:"Primary"}),e(r,{color:"success",children:"Success"}),e(r,{color:"warning",children:"Warning"}),e(r,{color:"danger",children:"Danger"})]}),t=()=>e(r,{color:"primary",onClose:()=>{alert("You clicked on the close button.")},children:"Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before!"});o.__docgenInfo={description:"",methods:[],displayName:"Default",props:{text:{defaultValue:{value:'"Default"',computed:!1},required:!1}}};s.__docgenInfo={description:"",methods:[],displayName:"Colors"};t.__docgenInfo={description:"",methods:[],displayName:"Dismissible"};var a,l,i;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`({
  className,
  color,
  text = "Default"
}) => {
  return <div className="space-x-4">
            <Alert className={className} color={color}>
                {text}
            </Alert>
        </div>;
}`,...(i=(l=o.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,m,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <div className="space-y-4">
            <Alert color="primary">Primary</Alert>
            <Alert color="success">Success</Alert>
            <Alert color="warning">Warning</Alert>
            <Alert color="danger">Danger</Alert>
        </div>;
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var d,u,h;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const handleClose = () => {
    // eslint-disable-next-line no-alert
    alert("You clicked on the close button.");
  };
  return <Alert color="primary" onClose={handleClose}>
            Space, the final frontier. These are the voyages of the starship Enterprise. Its five year mission: to
            explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone
            before!
        </Alert>;
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const k=["Default","Colors","Dismissible"];export{s as Colors,o as Default,t as Dismissible,k as __namedExportsOrder,I as default};
