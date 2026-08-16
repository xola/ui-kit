import{a as d,j as o}from"./jsx-runtime-5e7b5774.js";import{r as m}from"./index-e6e5af86.js";import{Q as i,c as u}from"./PieOptions-00f89f27.js";import"./lodash-e9238610.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const z={title:"Overlay/Drawers",component:i,parameters:{docs:{description:{component:"The Drawer component is a dynamic sidebar that is used to show data on the right side"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/YCbs6YcoYUNYGq9VhrEFQ0/13-Admin?node-id=960%3A27700&viewport=1028%2C673%2C0.38"}},argTypes:{isOpen:{description:"Open or close the sidebar",type:{required:!0},control:{type:"boolean"}},title:{description:"The title of the Drawer",type:{required:!0},control:{type:"text"}},content:{description:"The body of the Drawer",control:{type:"text"}},size:{description:"The width of the drawer when it opens",options:["small","medium","large"],control:{type:"select"}},onClose:{description:"Function to callback to close the Drawer",control:{type:"function"}}}},e=({title:a="Hello World",size:l,content:p="Lorem Ipsum. Click the X to close"})=>{const[c,t]=m.useState(!1);return d("div",{children:[o(u,{size:"large",onClick:()=>t(!0),children:"Click Me to open the Drawer"}),o(i,{title:a,content:p,size:l,isOpen:c,onClose:()=>t(!1)})]})};e.__docgenInfo={description:"",methods:[],displayName:"Drawers",props:{title:{defaultValue:{value:'"Hello World"',computed:!1},required:!1},content:{defaultValue:{value:'"Lorem Ipsum. Click the X to close"',computed:!1},required:!1}}};var r,s,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
  title = "Hello World",
  size,
  content = "Lorem Ipsum. Click the X to close"
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Click Me to open the Drawer
            </Button>
            <Drawer title={title} content={content} size={size} isOpen={open} onClose={onClose} />
        </div>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Drawers"];export{e as Drawers,q as __namedExportsOrder,z as default};
