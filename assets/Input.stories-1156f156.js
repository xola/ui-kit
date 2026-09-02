import{a as r,j as e}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{l as o,L as a,o as s}from"./PieOptions-b170d78a.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const H={primary:!0,title:"Forms & Fields/Input",parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=196%3A113261&viewport=-3655%2C339%2C0.3"}}},i=()=>r(o,{children:[e(a,{children:"Text"}),e(s,{defaultValue:"Hello, World"})]}),t=()=>r("div",{children:[r(o,{children:[e(a,{children:"Small"}),e(s,{size:"small"})]}),r(o,{children:[e(a,{children:"Medium"}),e(s,{size:"medium"})]}),r(o,{children:[e(a,{children:"Large"}),e(s,{size:"large"})]})]}),n=()=>r(o,{children:[e(a,{isDisabled:!0,children:"ID"}),e(s,{disabled:!0,defaultValue:"f003e8a95139cd7b70999070838561e0"})]}),d=()=>r(o,{children:[e(a,{isError:!0,children:"Text is invalid"}),e(s,{isError:!0,defaultValue:"ui@@@xola.com"})]}),l=()=>r(o,{children:[e(a,{children:"Text"}),e(s,{isRequired:!0})]}),u=()=>r(o,{children:[e(a,{children:"Text"}),e(s,{className:"!w-60"})]});i.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"Sizes"};n.__docgenInfo={description:"",methods:[],displayName:"Disabled"};d.__docgenInfo={description:"",methods:[],displayName:"WithError"};l.__docgenInfo={description:"",methods:[],displayName:"WithRequired"};u.__docgenInfo={description:"",methods:[],displayName:"CustomWidth"};var m,p,c;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Input defaultValue="Hello, World" />
        </FormGroup>;
}`,...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var h,b,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <div>
            <FormGroup>
                <Label>Small</Label>
                <Input size="small" />
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>
                <Input size="medium" />
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>
                <Input size="large" />
            </FormGroup>
        </div>;
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var F,L,g;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label isDisabled>ID</Label>
            <Input disabled defaultValue="f003e8a95139cd7b70999070838561e0" />
        </FormGroup>;
}`,...(g=(L=n.parameters)==null?void 0:L.docs)==null?void 0:g.source}}};var I,G,x;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label isError>Text is invalid</Label>
            <Input isError defaultValue="ui@@@xola.com" />
        </FormGroup>;
}`,...(x=(G=d.parameters)==null?void 0:G.docs)==null?void 0:x.source}}};var _,S,D;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Input isRequired />
        </FormGroup>;
}`,...(D=(S=l.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var E,W,z;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Input className="!w-60" />
        </FormGroup>;
}`,...(z=(W=u.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};const M=["Default","Sizes","Disabled","WithError","WithRequired","CustomWidth"];export{u as CustomWidth,i as Default,n as Disabled,t as Sizes,d as WithError,l as WithRequired,M as __namedExportsOrder,H as default};
