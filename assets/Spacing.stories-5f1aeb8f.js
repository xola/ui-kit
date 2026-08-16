import{a as i,j as t}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{t as d}from"./theme-869fe131.js";const g={title:"Configuration/Spacing",parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=4308%3A146977"}}},{spacing:a}=d,s=()=>{const o=Object.keys(a).map(e=>Number.parseFloat(e)).sort((e,n)=>e-n);return i("div",{className:"space-y-4",children:[t("div",{children:"This spacing is used for width, height, min-width and min-height. The spacing is in multiples of 4."}),o.map(e=>{const n={width:a[e]};return i("div",{className:"flex flex-row items-center font-mono",children:[i("span",{className:"mr-1 min-w-14 shrink-0 text-sm text-gray-darker",children:["w-",e]}),t("div",{className:"flex h-6 items-center rounded border border-blue-lighter bg-blue-lighter text-sm",style:n,children:t("span",{className:"pl-0.5",children:a[e]})},e)]},e)})]})};s.__docgenInfo={description:"",methods:[],displayName:"Spacing"};var r,m,c;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const keys = Object.keys(spacing).map(n => Number.parseFloat(n)).sort((a, b) => a - b);
  return <div className="space-y-4">
            <div>
                This spacing is used for width, height, min-width and min-height. The spacing is in multiples of 4.
            </div>
            {keys.map(key => {
      const styles = {
        width: spacing[key]
      };
      return <div key={key} className="flex flex-row items-center font-mono">
                        <span className="mr-1 min-w-14 shrink-0 text-sm text-gray-darker">w-{key}</span>
                        <div key={key} className="flex h-6 items-center rounded border border-blue-lighter bg-blue-lighter text-sm" style={styles}>
                            <span className="pl-0.5">{spacing[key]}</span>
                        </div>
                    </div>;
    })}
        </div>;
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const u=["Spacing"];export{s as Spacing,u as __namedExportsOrder,g as default};
