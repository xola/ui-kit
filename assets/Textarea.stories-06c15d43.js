import{a as r,j as e}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{m as a,L as o,s}from"./PieOptions-89d97896.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const O={primary:!0,title:"Forms & Fields/Textarea",parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A479202&viewport=8855%2C-1452%2C0.44"}}},i=()=>r(a,{children:[e(o,{children:"Text"}),e(s,{rows:5})]}),n=()=>r("div",{children:[r(a,{children:[e(o,{children:"Small"}),e(s,{size:"small"})]}),r(a,{children:[e(o,{children:"Medium"}),e(s,{size:"medium"})]}),r(a,{children:[e(o,{children:"Large"}),e(s,{size:"large"})]})]}),m=()=>r(a,{children:[e(o,{children:"ID"}),e(s,{disabled:!0,value:"f003e8a95139cd7b70999070838561e0"})]}),d=()=>r(a,{children:[e(o,{isError:!0,children:"Text is invalid"}),e(s,{isError:!0})]}),c=()=>r(a,{children:[e(o,{children:"Text"}),e(s,{className:"!w-60"})]}),t=()=>r(a,{children:[e(o,{children:"Text"}),e(s,{shouldAutoSize:!0,rows:6})]});t.parameters={docs:{description:{story:"Automatically resize the textarea as the data increases."}}};i.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"Sizes"};m.__docgenInfo={description:"",methods:[],displayName:"Disabled"};d.__docgenInfo={description:"",methods:[],displayName:"WithError"};c.__docgenInfo={description:"",methods:[],displayName:"CustomWidth"};t.__docgenInfo={description:"",methods:[],displayName:"AutoSize"};var l,u,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Textarea rows={5} />
        </FormGroup>;
}`,...(p=(u=i.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,x,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <div>
            <FormGroup>
                <Label>Small</Label>
                <Textarea size="small" />
            </FormGroup>

            <FormGroup>
                <Label>Medium</Label>
                <Textarea size="medium" />
            </FormGroup>

            <FormGroup>
                <Label>Large</Label>
                <Textarea size="large" />
            </FormGroup>
        </div>;
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var F,L,g;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>ID</Label>
            <Textarea disabled value="f003e8a95139cd7b70999070838561e0" />
        </FormGroup>;
}`,...(g=(L=m.parameters)==null?void 0:L.docs)==null?void 0:g.source}}};var T,f,S;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label isError>Text is invalid</Label>
            <Textarea isError />
        </FormGroup>;
}`,...(S=(f=d.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var G,z,_;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Textarea className="!w-60" />
        </FormGroup>;
}`,...(_=(z=c.parameters)==null?void 0:z.docs)==null?void 0:_.source}}};var v,w,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  return <FormGroup>
            <Label>Text</Label>
            <Textarea shouldAutoSize={true} rows={6} />
        </FormGroup>;
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};const U=["Default","Sizes","Disabled","WithError","CustomWidth","AutoSize"];export{t as AutoSize,c as CustomWidth,i as Default,m as Disabled,n as Sizes,d as WithError,U as __namedExportsOrder,O as default};
