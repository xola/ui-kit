import{j as e,a as i,F as H}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{X as s,c as l}from"./PieOptions-b170d78a.js";import{U as v}from"./UserIcon-60ec8c67.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const M="https://atomiks.github.io/tippyjs/v6/all-props/",O={title:"Overlay/Tooltip",component:s,args:{content:"Hey there!",trigger:"mouseenter",placement:"right",allowHTML:!1,delay:0,maxWidth:350,duration:[300,250],offset:[0,10],zIndex:9999},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A478826&viewport=7035%2C-4414%2C0.57"}},argTypes:{content:t("My tooltip text","text",null,"The text of the tooltip"),trigger:t("mouseenter","select",["mouseenter","click","focus","focusin","manual"],"One or multiple values to indicate what causes the tooltip to show up"),placement:t("right","inline-radio",["top","bottom","left","right","auto"],`Where to place the tooltip. [More in the docs](${M})`),allowHTML:t(!1,"boolean",!1,"Allow HTML content in tooltip"),delay:t(0,"number",null,"Delay in ms once a trigger event is fired before a tooltip shows or hides"),maxWidth:t(350,"number",null,"Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read"),duration:t([300,250],"array",null,"Duration in ms of the transition animation"),offset:t([0,10],"array",null,"Displaces the tooltip from its reference element in pixels _(skidding and distance)_"),zIndex:t(9999,"number",null,"Specifies the `z-index` CSS on the root popper node")}};function t(o,T,b,w,x=null){return{type:{required:!1},description:w,options:b,control:{type:T},table:{type:{summary:x},defaultValue:{summary:o}}}}const n=o=>e(s,{...o,children:e(l,{children:"Hello World"})}),r=()=>i(H,{children:[i("p",{className:"mb-3",children:["Since React escapes all HTML passed into props, pass a React element to the"," ",e("code",{className:"bg-gray-lighter px-1",children:"content"})," prop to show HTML content."]}),e(s,{placement:"right",content:i("span",{className:"grid grid-cols-2 gap-1",children:[i("span",{children:["This is ",e("b",{children:"bold"})]}),e("span",{children:"in a grid"}),e("span",{children:"in two rows"}),e("span",{children:"you now have a table!"})]}),children:e(l,{children:"Hello World"})})]}),a=o=>e(s,{...o,children:e(l,{color:"secondary",variant:"outline",size:"medium",children:e(v,{size:"medium"})})});n.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"WithHTMLContent"};a.__docgenInfo={description:"",methods:[],displayName:"OnAnIcon"};var p,c,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`config => {
  return <Tooltip {...config}>
            <Button>Hello World</Button>
        </Tooltip>;
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,u,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <>
            <p className="mb-3">
                Since React escapes all HTML passed into props, pass a React element to the{" "}
                <code className="bg-gray-lighter px-1">content</code> prop to show HTML content.
            </p>
            <Tooltip placement="right" content={<span className="grid grid-cols-2 gap-1">
                        <span>
                            This is <b>bold</b>
                        </span>
                        <span>in a grid</span>
                        <span>in two rows</span>
                        <span>you now have a table!</span>
                    </span>}>
                <Button>Hello World</Button>
            </Tooltip>
        </>;
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,f,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`config => {
  return <Tooltip {...config}>
            <Button color="secondary" variant="outline" size="medium">
                <UserIcon size="medium" />
            </Button>
        </Tooltip>;
}`,...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const U=["Default","WithHTMLContent","OnAnIcon"];export{n as Default,a as OnAnIcon,r as WithHTMLContent,U as __namedExportsOrder,O as default};
