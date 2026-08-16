import{a as o,j as r}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{H as a,v as t,c as d}from"./PieOptions-93b770c0.js";import"./lodash-d0bc2bc7.js";import"./clsx.m-de421188.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./_commonjs-dynamic-modules-0e9d5d94.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const T={title:"Other/Header Toolbars",component:a,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7839%3A479666&viewport=5274%2C-3037%2C0.55"}}},e=()=>o(a,{children:[o(a.Breadcrumb,{children:[r(t.Item,{children:"Seller"}),r(t.Item,{children:"Lasting Adventures"})]}),r(a.Search,{placeholder:"Search for seller",className:"border border-gray-lighter",onSubmit:()=>{alert("Search bar not implemented")}}),r(d,{size:"medium",color:"success",children:"Impersonate"})]});e.__docgenInfo={description:"",methods:[],displayName:"HeaderToolbars"};var s,m,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  return <HeaderToolbar>
            <HeaderToolbar.Breadcrumb>
                <Breadcrumb.Item>Seller</Breadcrumb.Item>
                <Breadcrumb.Item>Lasting Adventures</Breadcrumb.Item>
            </HeaderToolbar.Breadcrumb>
            <HeaderToolbar.Search placeholder="Search for seller" className="border border-gray-lighter" onSubmit={() => {
      // eslint-disable-next-line no-alert
      alert("Search bar not implemented");
    }} />

            <Button size="medium" color="success">
                Impersonate
            </Button>
        </HeaderToolbar>;
}`,...(n=(m=e.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};const f=["HeaderToolbars"];export{e as HeaderToolbars,f as __namedExportsOrder,T as default};
