import{a,j as i}from"./jsx-runtime-5e7b5774.js";import{r as u}from"./index-e6e5af86.js";import{p as o}from"./PieOptions-93b770c0.js";import"./lodash-d0bc2bc7.js";import"./clsx.m-de421188.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./_commonjs-dynamic-modules-0e9d5d94.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const v={title:"Forms & Fields/Buttons/Submit Button",component:o,args:{isLoading:!1,size:"medium",color:"primary"},argTypes:{isLoading:{control:{type:"boolean"},table:{defaultValue:{summary:!1}}},size:{options:["small","medium","large"],control:{type:"radio"},table:{defaultValue:{summary:"medium"}}},color:{options:["primary","secondary","success","warning","danger"],control:{type:"select"},table:{defaultValue:{summary:"primary"}}}}},c=({isLoading:S,...e})=>{const[s,l]=u.useState(S),[n,h]=u.useState(!1),t=()=>{l(!s),setTimeout(()=>{h(!0),l(!1)},2e3)};return a("div",{className:"space-y-4",children:[a("div",{className:"space-x-4",children:[i(o,{isLoading:s,isSuccess:n,...e,onClick:t,children:"Submit"}),i(o,{isLoading:s,isSuccess:n,...e,onClick:t,children:"Button with really long text"})]}),a("div",{className:"space-x-4",children:[i(o,{...e,color:"success",isLoading:s,isSuccess:n,onClick:t,children:"Submit"}),i(o,{...e,color:"success",isSuccess:n,isLoading:s,onClick:t,children:"Button with really long text"})]}),a("div",{className:"space-x-4",children:[i(o,{...e,isSuccess:n,color:"danger",isLoading:s,onClick:t,children:"Submit"}),i(o,{...e,isSuccess:n,color:"danger",isLoading:s,onClick:t,children:"Button with really long text"})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,d,m;c.parameters={...c.parameters,docs:{...(r=c.parameters)==null?void 0:r.docs,source:{originalSource:`({
  isLoading,
  ...rest
}) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClick = () => {
    setShowLoading(!showLoading);
    setTimeout(() => {
      setShowSuccess(true);
      setShowLoading(false);
    }, 2000);
  };
  return <div className="space-y-4">
            <div className="space-x-4">
                <SubmitButton isLoading={showLoading} isSuccess={showSuccess} {...rest} onClick={handleClick}>
                    Submit
                </SubmitButton>

                <SubmitButton isLoading={showLoading} isSuccess={showSuccess} {...rest} onClick={handleClick}>
                    Button with really long text
                </SubmitButton>
            </div>
            <div className="space-x-4">
                <SubmitButton {...rest} color="success" isLoading={showLoading} isSuccess={showSuccess} onClick={handleClick}>
                    Submit
                </SubmitButton>

                <SubmitButton {...rest} color="success" isSuccess={showSuccess} isLoading={showLoading} onClick={handleClick}>
                    Button with really long text
                </SubmitButton>
            </div>
            <div className="space-x-4">
                <SubmitButton {...rest} isSuccess={showSuccess} color="danger" isLoading={showLoading} onClick={handleClick}>
                    Submit
                </SubmitButton>

                <SubmitButton {...rest} isSuccess={showSuccess} color="danger" isLoading={showLoading} onClick={handleClick}>
                    Button with really long text
                </SubmitButton>
            </div>
        </div>;
}`,...(m=(d=c.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const N=["Default"];export{c as Default,N as __namedExportsOrder,v as default};
