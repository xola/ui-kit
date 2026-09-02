import{j as e,a as o}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{V as d,c as h}from"./PieOptions-b170d78a.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const N="https://atomiks.github.io/tippyjs/v6/all-props/",A={id:"Popover",title:"Overlay/Popover",component:d,args:{trigger:"mouseenter",placement:"right",delay:0,maxWidth:350,skidding:0,distance:10,duration:[300,250]},argTypes:{demoText:t("Default","text",null,"The value for the button","for this demo only"),trigger:t("mouseenter","select",["mouseenter","click","focus","focusin","manual"],"One or multiple values to indicate what causes the tooltip to show up"),placement:t("right","select",["top","bottom","left","right","auto"],`Where to place the tooltip. [More in the docs](${N})`),delay:t(0,"number",null,"Delay in ms once a trigger event is fired before a tippy shows or hides"),maxWidth:t(350,"number",null,"Specifies the maximum width of the tippy. Useful to prevent it from being too horizontally wide to read"),duration:t([300,250],"array",null,"Duration in ms of the transition animation"),skidding:t(0,"number",null,"The amount in pixels to offset along the reference. See: https://popper.js.org/docs/v2/modifiers/offset/#skidding-1"),distance:t(10,"number",null,"The amount in pixels to to displace the popover from, or toward the reference element in direction of it's placement. Positive means further away, negative lets it overlap the reference. See: https://popper.js.org/docs/v2/modifiers/offset/#distance-1"),zIndex:t(9999,"number",null,"Specifies the `z-index` CSS on the root popper node")}};function t(n,r,g,f,v=null){return{type:{required:!1},description:f,options:g,control:{type:r},table:{type:{summary:v},defaultValue:{summary:n}}}}const s=({demoText:n="Hello World",...r})=>e("div",{className:"mt-10 h-20",children:o(d,{...r,children:[e(h,{children:n}),o(d.Content,{className:"space-y-2 p-4",children:[e("p",{className:"p1 font-bold",children:"Popover Title"}),e("p",{className:"p2",children:"And here is some amazing content and it is very engaging. Right?"}),e("p",{className:"p2",children:"Here is some more because I am crazy"})]})]})}),a=({demoText:n="Detailed",...r})=>e("div",{className:"mt-10 h-20",children:o(d,{...r,children:[e(h,{children:n}),e(d.Content,{className:"p-4",children:o("dl",{className:"space-y-2 text-sm",children:[o("div",{className:"grid grid-cols-2 gap-4",children:[e("dt",{className:"font-bold",children:"Demo Request"}),e("dd",{children:"Dec 21, 2020"})]}),o("div",{className:"grid grid-cols-2 gap-4",children:[e("dt",{className:"font-bold",children:"Join Request"}),e("dd",{children:"Dec 24, 2020"})]}),o("div",{className:"grid grid-cols-2 gap-4",children:[e("dt",{className:"font-bold",children:"Account Created"}),e("dd",{children:"Dec 31, 2020"})]}),o("div",{className:"grid grid-cols-2 gap-4",children:[e("dt",{className:"font-bold",children:"Account Verified"}),e("dd",{children:"Jan 5, 2021"})]})]})})]})});s.__docgenInfo={description:"",methods:[],displayName:"Default",props:{demoText:{defaultValue:{value:'"Hello World"',computed:!1},required:!1}}};a.__docgenInfo={description:"",methods:[],displayName:"NoTitle",props:{demoText:{defaultValue:{value:'"Detailed"',computed:!1},required:!1}}};var i,l,c;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`({
  demoText = "Hello World",
  ...rest
}) => {
  return <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="space-y-2 p-4">
                    <p className="p1 font-bold">Popover Title</p>
                    <p className="p2">And here is some amazing content and it is very engaging. Right?</p>
                    <p className="p2">Here is some more because I am crazy</p>
                </Popover.Content>
            </Popover>
        </div>;
}`,...(c=(l=s.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,p,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`({
  demoText = "Detailed",
  ...rest
}) => {
  return <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="p-4">
                    <dl className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Demo Request</dt>
                            <dd>Dec 21, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Join Request</dt>
                            <dd>Dec 24, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Account Created</dt>
                            <dd>Dec 31, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Account Verified</dt>
                            <dd>Jan 5, 2021</dd>
                        </div>
                    </dl>
                </Popover.Content>
            </Popover>
        </div>;
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const j=["Default","NoTitle"];export{s as Default,a as NoTitle,j as __namedExportsOrder,A as default};
