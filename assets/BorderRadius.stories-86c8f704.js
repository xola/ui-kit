import{j as m,a as s}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{t as c}from"./theme-869fe131.js";const y={title:"Configuration/Border Radius"},{borderRadius:a}=c,r=()=>{const o=Object.keys(a);return m("div",{className:"space-y-4",children:o.map(e=>{const i=e==="DEFAULT"?"":`-${e}`;return s("div",{className:"flex flex-row items-center font-mono text-sm",children:[s("span",{className:"mr-1 min-w-24 shrink-0 text-gray-darker",children:["rounded",i]}),s("div",{className:"ml-2 flex h-10 w-72 items-center bg-blue-lighter pl-3",style:{borderRadius:a[e]},children:['border-radius: "',a[e],'"']},e)]},e)})})};r.__docgenInfo={description:"",methods:[],displayName:"BorderRadius"};var n,t,d;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const keys = Object.keys(borderRadius);
  return <div className="space-y-4">
            {keys.map(key => {
      const name = key === "DEFAULT" ? "" : \`-\${key}\`;
      return <div key={key} className="flex flex-row items-center font-mono text-sm">
                        <span className="mr-1 min-w-24 shrink-0 text-gray-darker">
                            rounded
                            {name}
                        </span>
                        <div key={key} className="ml-2 flex h-10 w-72 items-center bg-blue-lighter pl-3" style={{
          borderRadius: borderRadius[key]
        }}>
                            border-radius: &quot;{borderRadius[key]}&quot;
                        </div>
                    </div>;
    })}
        </div>;
}`,...(d=(t=r.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const b=["BorderRadius"];export{r as BorderRadius,b as __namedExportsOrder,y as default};
