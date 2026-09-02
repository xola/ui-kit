import{a as y,j as o}from"./jsx-runtime-5e7b5774.js";import{r as f}from"./index-e6e5af86.js";import{c as l,F as g}from"./PieOptions-b170d78a.js";import{f as n}from"./flash-32af0bf2.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const v={title:"Data Display/Flash",parameters:{docs:{description:{component:"Show a notification"}}},args:{text:"Your booking was successfully created",size:"medium",color:"success",duration:3e3,canClose:!0},argTypes:{text:{type:{required:!1},description:"The text in the component. For **demo** only",control:{type:"text"}},size:{options:["small","medium","large"],control:{type:"inline-radio"},table:{defaultValue:{summary:"medium"}}},color:{options:["primary","secondary","success","warning","danger","caution"],control:{type:"inline-radio"},table:{defaultValue:{summary:"primary"}}},duration:{type:{required:!1},description:"Time in `ms`",control:{type:"number"}},canClose:{control:{type:"boolean"},table:{defaultValue:{summary:!0}}}}},x=e=>{e.onClose=(a,s)=>n.dismiss(s.id),n.show(e)},t=e=>y("div",{className:"space-y-6",children:[o("div",{children:"Click below to show a flash"}),o(l,{onClick:()=>x(e),children:e.text}),o("pre",{children:o("code",{children:`flash.show({ text: "${e.text}", color: "${e.color??"primary"}", duration: ${e.duration} })`})}),o("div",{children:o(l,{size:"small",color:"warning",onClick:()=>n.dismiss(),children:"Dismiss All"})}),o(g,{})]}),r=e=>{const a=()=>{console.log("Closed")};return o("div",{className:"w-96 space-y-8",children:v.argTypes.color.options.map(s=>{const h=n.getStyles(s,e.size,"relative",!0);return o(f.Fragment,{children:n.container(`[${s}] ${e.text}`,h,e.canClose?a:null,{id:`flash-${s}`,visible:!0})},s)})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"AllStyles"};var i,c,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`props => {
  return <div className="space-y-6">
            <div>Click below to show a flash</div>
            <Button onClick={() => toastMe(props)}>{props.text}</Button>

            <pre>
                <code>{\`flash.show({ text: "\${props.text}", color: "\${props.color ?? "primary"}", duration: \${props.duration} })\`}</code>
            </pre>

            <div>
                <Button size="small" color="warning" onClick={() => flash.dismiss()}>
                    Dismiss All
                </Button>
            </div>

            {/* Make sure Toaster is added to a root component */}
            <Toaster />
        </div>;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,p,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`props => {
  const handleClose = () => {
    console.log("Closed");
  };
  return <div className="w-96 space-y-8">
            {FlashStories.argTypes.color.options.map(color => {
      const classes = flash.getStyles(color, props.size, "relative", true);
      // flash.container returns a bare element; normally react-hot-toast keys it, so the
      // key has to come from here when the story renders the list itself.
      return <Fragment key={color}>
                        {flash.container(\`[\${color}] \${props.text}\`, classes, props.canClose ? handleClose : null, {
          id: \`flash-\${color}\`,
          visible: true
        })}
                    </Fragment>;
    })}
        </div>;
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const A=["Default","AllStyles"];export{r as AllStyles,t as Default,A as __namedExportsOrder,v as default};
