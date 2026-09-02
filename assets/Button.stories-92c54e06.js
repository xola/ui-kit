import{a as e,j as n}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{c as o}from"./PieOptions-ef3152f6.js";import{U as p}from"./UserIcon-60ec8c67.js";import{E as X,P as G,W as R,K as H}from"./WarningIcon-9c1367a9.js";import{W as J}from"./WaitlistIcon-2523e8de.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const dn={title:"Forms & Fields/Buttons/Button",component:o,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=196%3A103411&viewport=-3086%2C515%2C0.36"}},args:{as:"button",size:"medium",color:"primary",variant:"standard"},argTypes:{size:{options:["tiny","small","medium","large"],control:{type:"select"},table:{defaultValue:{summary:"medium"}}},color:{options:["primary","secondary","success","warning","caution","danger"],control:{type:"select"},table:{defaultValue:{summary:"primary"}}},variant:{options:["standard","outline","link"],control:{type:"radio"},table:{defaultValue:{summary:"standard"}}}}},r=v=>e("div",{className:"flex w-20 flex-col space-y-4",children:[n(o,{...v,children:"Default"}),n(o,{disabled:!0,color:"primary",...v,children:"Default"})]}),a=()=>e("div",{className:"space-x-4",children:[n(o,{color:"primary",children:"Primary"}),n(o,{color:"secondary",children:"Secondary"}),n(o,{color:"success",children:"Success"}),n(o,{color:"warning",children:"Warning"}),n(o,{color:"caution",children:"Caution"}),n(o,{color:"danger",children:"Danger"})]}),t=()=>e("div",{className:"space-x-4",children:[n("code",{className:"mb-5 block font-mono",children:'Use variant="outline"'}),n(o,{variant:"outline",color:"primary",children:"Primary"}),n(o,{variant:"outline",color:"secondary",children:"Secondary"}),n(o,{variant:"outline",color:"success",children:"Success"}),n(o,{variant:"outline",color:"warning",children:"Warning"}),n(o,{variant:"outline",color:"caution",children:"Caution"}),n(o,{variant:"outline",color:"danger",children:"Danger"})]}),i=()=>e("div",{className:"space-x-4",children:[n("code",{className:"mb-5 block font-mono",children:'Use variant="link"'}),n(o,{variant:"link",color:"primary",children:"Primary"}),n(o,{variant:"link",color:"secondary",children:"Secondary"}),n(o,{variant:"link",color:"success",children:"Success"}),n(o,{variant:"link",color:"warning",children:"Warning"}),n(o,{variant:"link",color:"caution",children:"Caution"}),n(o,{variant:"link",color:"danger",children:"Danger"})]}),s=()=>n("div",{className:"space-x-4",children:"TODO: Disabled & Selected state"}),c=()=>e("div",{className:"space-x-4",children:[n(o,{icon:n(p,{}),size:"medium",children:"Medium"}),n(o,{icon:n(p,{}),iconPlacement:"right",color:"success",size:"large",children:"Large"})]}),l=()=>n(o,{as:"a",href:"https://xola.com",target:"_blank",rel:"noopener",size:"small",children:"Xola Website"}),u=()=>e("div",{className:"w-full space-y-4",children:[n(o,{className:"w-full",children:"Default"}),n(o,{icon:n(p,{}),className:"w-full",children:"Icon"})]}),d=()=>e("div",{className:"space-x-6",children:[n("div",{className:"py-3 font-mono",children:'Most of our icon only buttons use the "variant=outline" prop'}),n(o,{variant:"outline",color:"secondary",size:"tiny",children:n(X,{})}),n(o,{variant:"outline",color:"primary",size:"small",children:n(J,{})}),n(o,{variant:"outline",color:"success",size:"small",children:n(G,{})}),n(o,{variant:"outline",color:"warning",size:"medium",children:n(R,{})}),n(o,{variant:"outline",color:"caution",size:"medium",children:n(H,{})})]}),m=()=>e("div",{className:"space-x-4",children:[n("div",{className:"py-3 font-mono",children:"Tiny is only used with icons"}),n(o,{size:"tiny",children:n(X,{})}),n(o,{size:"small",children:"Small"}),n(o,{size:"medium",children:"Medium"}),n(o,{size:"large",children:"Large"})]});r.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"Colors"};t.__docgenInfo={description:"",methods:[],displayName:"OutlineVariant"};i.__docgenInfo={description:"",methods:[],displayName:"LinkVariant"};s.__docgenInfo={description:"",methods:[],displayName:"States"};c.__docgenInfo={description:"",methods:[],displayName:"TextWithIcons"};l.__docgenInfo={description:"",methods:[],displayName:"AsLink"};u.__docgenInfo={description:"",methods:[],displayName:"FullWidth"};d.__docgenInfo={description:"",methods:[],displayName:"IconOnly"};m.__docgenInfo={description:"",methods:[],displayName:"Sizes"};var y,h,B;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`props => {
  return <div className="flex w-20 flex-col space-y-4">
            <Button {...props}>Default</Button>
            <Button disabled color="primary" {...props}>
                Default
            </Button>
        </div>;
}`,...(B=(h=r.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var g,f,N;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="caution">Caution</Button>
            <Button color="danger">Danger</Button>
        </div>;
}`,...(N=(f=a.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var I,S,z;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <code className="mb-5 block font-mono">Use variant=&quot;outline&quot;</code>
            <Button variant="outline" color="primary">
                Primary
            </Button>
            <Button variant="outline" color="secondary">
                Secondary
            </Button>
            <Button variant="outline" color="success">
                Success
            </Button>
            <Button variant="outline" color="warning">
                Warning
            </Button>
            <Button variant="outline" color="caution">
                Caution
            </Button>
            <Button variant="outline" color="danger">
                Danger
            </Button>
        </div>;
}`,...(z=(S=t.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var k,x,_;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <code className="mb-5 block font-mono">Use variant=&quot;link&quot;</code>
            <Button variant="link" color="primary">
                Primary
            </Button>
            <Button variant="link" color="secondary">
                Secondary
            </Button>
            <Button variant="link" color="success">
                Success
            </Button>
            <Button variant="link" color="warning">
                Warning
            </Button>
            <Button variant="link" color="caution">
                Caution
            </Button>
            <Button variant="link" color="danger">
                Danger
            </Button>
        </div>;
}`,...(_=(x=i.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var w,b,D;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  return <div className="space-x-4">TODO: Disabled &amp; Selected state</div>;
}`,...(D=(b=s.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var W,O,C;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <Button icon={<UserIcon />} size="medium">
                Medium
            </Button>

            <Button icon={<UserIcon />} iconPlacement="right" color="success" size="large">
                Large
            </Button>
        </div>;
}`,...(C=(O=c.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var L,P,U;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  return <Button as="a" href="https://xola.com" target="_blank" rel="noopener" size="small">
            Xola Website
        </Button>;
}`,...(U=(P=l.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var E,F,T;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  return <div className="w-full space-y-4">
            <Button className="w-full">Default</Button>

            <Button icon={<UserIcon />} className="w-full">
                Icon
            </Button>
        </div>;
}`,...(T=(F=u.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var V,q,A;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  return <div className="space-x-6">
            <div className="py-3 font-mono">Most of our icon only buttons use the &quot;variant=outline&quot; prop</div>
            <Button variant="outline" color="secondary" size="tiny">
                <EllipsisIcon />
            </Button>

            <Button variant="outline" color="primary" size="small">
                <WaitlistIcon />
            </Button>

            <Button variant="outline" color="success" size="small">
                <PlusIcon />
            </Button>

            <Button variant="outline" color="warning" size="medium">
                <WarningIcon />
            </Button>

            <Button variant="outline" color="caution" size="medium">
                <KeyIcon />
            </Button>
        </div>;
}`,...(A=(q=d.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var M,j,K;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  return <div className="space-x-4">
            <div className="py-3 font-mono">Tiny is only used with icons</div>
            <Button size="tiny">
                <EllipsisIcon />
            </Button>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
        </div>;
}`,...(K=(j=m.parameters)==null?void 0:j.docs)==null?void 0:K.source}}};const mn=["Default","Colors","OutlineVariant","LinkVariant","States","TextWithIcons","AsLink","FullWidth","IconOnly","Sizes"];export{l as AsLink,a as Colors,r as Default,u as FullWidth,d as IconOnly,i as LinkVariant,t as OutlineVariant,m as Sizes,s as States,c as TextWithIcons,mn as __namedExportsOrder,dn as default};
