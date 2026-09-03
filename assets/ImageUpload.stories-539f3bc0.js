import{j as D}from"./jsx-runtime-5e7b5774.js";import{R as s}from"./index-e6e5af86.js";import{v as m}from"./PieOptions-aea04668.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const w={title:"Media/Image Upload",component:m,parameters:{docs:{description:{component:"Use to upload images"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=6460%3A394875"}},args:{size:"medium",maxSize:5,hasDelete:!0,caption:"",requirements:""},argTypes:{src:{type:{required:!0},description:"The URL to the image",control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"none"}}},size:{description:"The size of the image",options:["small","medium","large"],control:{type:"radio"},table:{type:{summary:null},defaultValue:{summary:"medium"}}},caption:{description:"The caption to show on the upload button",control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"Upload New Photo"}}},isLoading:{control:{type:"boolean"},table:{defaultValue:{summary:!1}}},maxSize:{description:"Max file size",control:{type:"number"}},hasDelete:{control:{type:"boolean"},table:{defaultValue:{summary:!0}}},requirements:{description:"The requirements for this image upload",control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"Check that image is in PNG or JPG format and does not exceed 5MB"}}},csvAcceptFormats:{description:"CSV list of accepted file mime-types",control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"image/png,image/jpeg"}}}}},e=({src:o,size:c="small",maxSize:u,caption:p,csvAcceptFormats:d,hasDelete:f,requirements:g,isLoading:y})=>{const[h,t]=s.useState(o);return s.useEffect(()=>{t(o)},[t,o]),D(m,{src:h,size:c,isLoading:y,maxSize:u,caption:p,hasDelete:f,requirements:g,onChange:a=>{const r=new FileReader;r.onloadend=()=>{t(r.result)},r.readAsDataURL(a)},onDelete:()=>{t(void 0)},csvAcceptFormats:d,onError:a=>console.log(a)})};e.__docgenInfo={description:"",methods:[],displayName:"Default",props:{size:{defaultValue:{value:'"small"',computed:!1},required:!1}}};var n,i,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
  src: source,
  size = "small",
  maxSize,
  caption,
  csvAcceptFormats,
  hasDelete,
  requirements,
  isLoading
}) => {
  const [source_, setSource] = React.useState(source);
  React.useEffect(() => {
    setSource(source);
  }, [setSource, source]);
  const onChange = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSource(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const onDelete = () => {
    setSource(undefined);
  };
  return <ImageUpload src={source_} size={size} isLoading={isLoading} maxSize={maxSize} caption={caption} hasDelete={hasDelete} requirements={requirements} onChange={onChange} onDelete={onDelete} csvAcceptFormats={csvAcceptFormats} onError={error => console.log(error)} />;
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,w as default};
