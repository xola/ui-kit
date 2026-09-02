import{a as o,j as a}from"./jsx-runtime-5e7b5774.js";import{r as p}from"./index-e6e5af86.js";import{t as n}from"./PieOptions-ef3152f6.js";import{a as d}from"./lodash-ab783b60.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const b={title:"Forms & Fields/Buttons/ToggleButton",component:n,args:{color:"success",size:"medium",isActive:!1},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7505%3A475117"}},argTypes:{size:{options:["small","medium","large"],control:{type:"radio"},table:{defaultValue:{summary:"medium"}}},color:{options:["primary","secondary","success","warning","caution","danger"],control:{type:"select"},table:{defaultValue:{summary:"primary"}}},isActive:{control:{type:"boolean"},table:{defaultValue:{summary:"false"}}}}},e=({size:l,isActive:m})=>{const[t,u]=p.useState(m);return o("div",{className:"space-y-2",children:[o("div",{children:["Is Active: ",t?"Yes":"No",". Click button to toggle"]}),a("div",{className:"flex gap-x-4",children:["primary","secondary","success","warning","caution","danger"].map(s=>a(n,{color:s,size:l,isActive:t,className:"space-x-2",onClick:()=>u(!t),children:a(d,{className:`text-${s}`})},s))})]})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,i,c;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
  size,
  isActive
}) => {
  const [active, setActive] = useState(isActive);
  return <div className="space-y-2">
            <div>Is Active: {active ? "Yes" : "No"}. Click button to toggle</div>
            <div className="flex gap-x-4">
                {["primary", "secondary", "success", "warning", "caution", "danger"].map(color => {
        return <ToggleButton key={color} color={color} size={size} isActive={active} className="space-x-2" onClick={() => setActive(!active)}>
                            <CheckIcon className={\`text-\${color}\`} />
                        </ToggleButton>;
      })}
            </div>
        </div>;
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,b as default};
