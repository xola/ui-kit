import{a as r,j as a}from"./jsx-runtime-5e7b5774.js";import{r as h}from"./index-e6e5af86.js";import{E as e}from"./PieOptions-ef3152f6.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const M={title:"Navigation/Tabs",component:e,parameters:{docs:{description:{component:"Tabbed interface to show different sections on select of a tab"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=3355%3A127055"}},args:{variant:"default",isHidden:!1},argTypes:{className:{description:"Classnames that should be applied to the tab *container*",control:{type:"text"},table:{type:{summary:"e.g. bg-blue-light"}}},variant:{options:["default","simple"],control:{type:"select"}},isHidden:{description:"Show or hide a tab. This is specific to Tabs.Tab only",control:{type:"boolean"}}}},n=({className:s,variant:i,isHidden:o})=>{const[l,v]=h.useState(0);return r(e,{variant:i,value:l,className:s,onChange:u=>v(u),children:[a(e.Tab,{children:"Seller Details"}),a(e.Panel,{children:"Seller Details Content"}),a(e.Tab,{isHidden:o,children:"More Stats"}),a(e.Panel,{children:"More Stats Content"}),a(e.Tab,{children:"Invoices"}),a(e.Panel,{children:"Invoices Content"}),a(e.Tab,{children:"App Store"}),a(e.Panel,{children:"App Store Content"}),a(e.Tab,{isHidden:!0,children:"Admin Tools"}),a(e.Panel,{children:"Admin Tools Content"})]})},t=({className:s})=>{const[i,o]=h.useState(0);return r("div",{children:[a("div",{className:"my-6",children:"This is used in the Admin app"}),r(e,{variant:"simple",value:i,className:s,onChange:l=>o(l),children:[a(e.Tab,{children:"Seller Details"}),a(e.Panel,{children:"Seller Details Content"}),a(e.Tab,{children:"More Stats"}),a(e.Panel,{children:"More Stats Content"}),a(e.Tab,{children:"Invoices"}),a(e.Panel,{children:"Invoices Content"}),a(e.Tab,{children:"App Store"}),a(e.Panel,{children:"App Store Content"}),a(e.Tab,{isHidden:!0,children:"Admin Tools"}),a(e.Panel,{children:"Admin Tools Content"})]})]})};n.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"Simple"};var T,b,c;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`({
  className,
  variant,
  isHidden
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return <Tabs variant={variant} value={activeTab} className={className} onChange={value => setActiveTab(value)}>
            <Tabs.Tab>Seller Details</Tabs.Tab>
            <Tabs.Panel>Seller Details Content</Tabs.Panel>

            <Tabs.Tab isHidden={isHidden}>More Stats</Tabs.Tab>
            <Tabs.Panel>More Stats Content</Tabs.Panel>

            <Tabs.Tab>Invoices</Tabs.Tab>
            <Tabs.Panel>Invoices Content</Tabs.Panel>

            <Tabs.Tab>App Store</Tabs.Tab>
            <Tabs.Panel>App Store Content</Tabs.Panel>

            <Tabs.Tab isHidden>Admin Tools</Tabs.Tab>
            <Tabs.Panel>Admin Tools Content</Tabs.Panel>
        </Tabs>;
}`,...(c=(b=n.parameters)==null?void 0:b.docs)==null?void 0:c.source}}};var d,p,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  className
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return <div>
            <div className="my-6">This is used in the Admin app</div>
            <Tabs variant="simple" value={activeTab} className={className} onChange={value => setActiveTab(value)}>
                <Tabs.Tab>Seller Details</Tabs.Tab>
                <Tabs.Panel>Seller Details Content</Tabs.Panel>

                <Tabs.Tab>More Stats</Tabs.Tab>
                <Tabs.Panel>More Stats Content</Tabs.Panel>

                <Tabs.Tab>Invoices</Tabs.Tab>
                <Tabs.Panel>Invoices Content</Tabs.Panel>

                <Tabs.Tab>App Store</Tabs.Tab>
                <Tabs.Panel>App Store Content</Tabs.Panel>

                <Tabs.Tab isHidden>Admin Tools</Tabs.Tab>
                <Tabs.Panel>Admin Tools Content</Tabs.Panel>
            </Tabs>
        </div>;
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const x=["Default","Simple"];export{n as Default,t as Simple,x as __namedExportsOrder,M as default};
