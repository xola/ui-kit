import{j as o}from"./jsx-runtime-5e7b5774.js";import{r as D}from"./index-e6e5af86.js";import{u as t}from"./PieOptions-89d97896.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const x=["bg-primary-lighter","bg-warning-lighter","bg-success-lighter","bg-secondary","bg-caution-lighter","bg-danger-lighter"],L={title:"Media/Avatar",component:t,parameters:{docs:{description:{component:"The avatar component is used to represent a user or seller. If the seller has a profile image that should be used instead"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=1848%3A51732"}},args:{size:"large",color:"bg-primary-lighter"},argTypes:{name:{description:"A user's full name",type:{required:!0},control:{type:"text"},table:{type:{summary:"example: John Doe"}}},size:{description:"Avatar Size",table:{type:{summary:"one of the options"},defaultValue:{summary:"large"}},options:["small","medium","large"],control:{type:"radio"}},color:{description:"Colors",table:{type:{summary:"one of the options"},defaultValue:{summary:"bg-primary-lighter"}},options:x,control:{type:"select"}}}},m=({className:r,name:s="John Doe",size:e,color:a})=>o(t,{className:r,name:s,size:e,color:a}),n=({className:r,name:s="Cher",size:e,color:a})=>o(t,{className:r,name:s,size:e,color:a}),l=({className:r,name:s="James Scott Zimmerman",size:e,color:a})=>o(t,{className:r,name:s,size:e,color:a}),i=({className:r,name:s="Rushi (Xola)",size:e,color:a})=>o(t,{className:r,name:s,size:e,color:a}),c=({className:r,name:s="Barthélémy Chalvet"})=>o("div",{className:"grid grid-cols-6 gap-2",children:["large","medium","small"].map(e=>o(D.Fragment,{children:x.map(a=>o("div",{className:"text-center",children:o(t,{className:r,name:s,size:e,color:a})},a))},e))});m.__docgenInfo={description:"",methods:[],displayName:"Default",props:{name:{defaultValue:{value:'"John Doe"',computed:!1},required:!1}}};n.__docgenInfo={description:"",methods:[],displayName:"OneNameLikeCher",props:{name:{defaultValue:{value:'"Cher"',computed:!1},required:!1}}};l.__docgenInfo={description:"",methods:[],displayName:"ThreeNames",props:{name:{defaultValue:{value:'"James Scott Zimmerman"',computed:!1},required:!1}}};i.__docgenInfo={description:"",methods:[],displayName:"SpecialChars",props:{name:{defaultValue:{value:'"Rushi (Xola)"',computed:!1},required:!1}}};c.__docgenInfo={description:"",methods:[],displayName:"AllColorsAndSizes",props:{name:{defaultValue:{value:'"Barthélémy Chalvet"',computed:!1},required:!1}}};var p,d,u;m.parameters={...m.parameters,docs:{...(p=m.parameters)==null?void 0:p.docs,source:{originalSource:`({
  className,
  name = "John Doe",
  size,
  color
}) => {
  return <Avatar className={className} name={name} size={size} color={color} />;
}`,...(u=(d=m.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var h,g,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`({
  className,
  name = "Cher",
  size,
  color
}) => {
  return <Avatar className={className} name={name} size={size} color={color} />;
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var N,v,y;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`({
  className,
  name = "James Scott Zimmerman",
  size,
  color
}) => {
  return <Avatar className={className} name={name} size={size} color={color} />;
}`,...(y=(v=l.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var z,C,A;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`({
  className,
  name = "Rushi (Xola)",
  size,
  color
}) => {
  return <Avatar className={className} name={name} size={size} color={color} />;
}`,...(A=(C=i.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var S,b,_;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`({
  className,
  name = "Barthélémy Chalvet"
}) => {
  return <div className="grid grid-cols-6 gap-2">
            {["large", "medium", "small"].map(size => <Fragment key={size}>
                    {avatarColors.map(color => <div key={color} className="text-center">
                            <Avatar className={className} name={name} size={size} color={color} />
                        </div>)}
                </Fragment>)}
        </div>;
}`,...(_=(b=c.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};const O=["Default","OneNameLikeCher","ThreeNames","SpecialChars","AllColorsAndSizes"];export{c as AllColorsAndSizes,m as Default,n as OneNameLikeCher,i as SpecialChars,l as ThreeNames,O as __namedExportsOrder,L as default};
