import{j as s,a as c}from"./jsx-runtime-5e7b5774.js";import{c as m}from"./clsx-0839fdbe.js";import{r as d}from"./index-e6e5af86.js";import{J as b}from"./PieOptions-b170d78a.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const E={title:"Other/Search",parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7839%3A479666&viewport=6893%2C-4568%2C0.71"}}},x=async o=>(await(await fetch("https://xola.com/api/sellers",{headers:{"X-API-KEY":""}})).json()).data.filter(r=>JSON.stringify(r).toLowerCase().includes(o.toLowerCase())),a=()=>{const[o,t]=d.useState(!1),[l,r]=d.useState([]);return s(b,{className:"!border !border-gray-lighter",items:l,isLoading:o,onChange:async e=>{t(!0),r([]);const i=await x(e);r(i),t(!1)},onSubmit:e=>{console.log(`You submitted "${e}"`)},onSelect:e=>{console.log(`You selected "${e.name}"`)},children:(e,i)=>c("div",{className:m("group flex cursor-pointer p-2",i?"bg-blue-light p-2 text-white":"text-black"),children:[s("img",{className:"h-12 w-12 rounded-full",src:e.picture}),c("div",{className:"pl-3",children:[s("div",{children:e.name}),s("div",{className:m("text-sm",i?"text-white":"text-gray-dark","group-hover:text-white"),children:e.email})]})]})})},n=()=>s(b,{onSubmit:t=>{console.log(`You submitted "${t}"`)}});a.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"Simple"};var u,p,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const handleSelect = item => {
    console.log(\`You selected "\${item.name}"\`);
  };
  const handleSubmit = inputValue => {
    console.log(\`You submitted "\${inputValue}"\`);
  };
  const handleType = async inputValue => {
    setLoading(true);
    setItems([]);
    const items = await fetchUsers(inputValue);
    setItems(items);
    setLoading(false);
  };
  return <Search className="!border !border-gray-lighter" items={items} isLoading={loading} onChange={handleType} onSubmit={handleSubmit} onSelect={handleSelect}>
            {(item, active) => <div className={clsx("group flex cursor-pointer p-2", active ? "bg-blue-light p-2 text-white" : "text-black")}>
                    <img className="h-12 w-12 rounded-full" src={item.picture} />

                    <div className="pl-3">
                        <div>{item.name}</div>

                        <div className={clsx("text-sm", active ? "text-white" : "text-gray-dark", "group-hover:text-white")}>
                            {item.email}
                        </div>
                    </div>
                </div>}
        </Search>;
}`,...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var g,S,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const handleSubmit = inputValue => {
    console.log(\`You submitted "\${inputValue}"\`);
  };
  return <Search onSubmit={handleSubmit} />;
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};const T=["Default","Simple"];export{a as Default,n as Simple,T as __namedExportsOrder,E as default};
