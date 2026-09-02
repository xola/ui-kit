import{j as e,a}from"./jsx-runtime-5e7b5774.js";import{l as V}from"./lodash-ab783b60.js";import{r as l}from"./index-e6e5af86.js";import{I as m,m as O,p as I,q as g,c as y}from"./PieOptions-ef3152f6.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const G={title:"Forms & Fields/Inline Value Popover",component:m,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=1481%3A53710"}}},o=()=>{const[t,n]=l.useState(!1),[u,p]=l.useState("8 hours"),[s,i]=l.useState(8);return e("div",{className:"h-20",children:e(m,{text:u,isOpen:t,onClick:()=>n(!t),onClickOutside:()=>{console.log("Setting",s),n(!t),i(s)},children:e("form",{onSubmit:c=>{c.preventDefault(),p(`${s} hours with a very large string in here`),n(!1)},children:a(O,{className:"!m-0 flex flex-row space-x-2",children:[e(I,{value:s,onChange:c=>i(c.target.value)}),a(g,{children:[e("option",{value:"hours",children:"hours"}),e("option",{value:"minutes",children:"minutes"})]}),e(y,{children:"Apply"})]})})})})},r=()=>{const[t,n]=l.useState(!1),[u,p]=l.useState("8 hours");return a("div",{children:[e("div",{className:"mb-5",children:"Values are randomly set just for story purposes. Use your form library to fetch form values and set them properly"}),e(m,{showArrow:!1,text:u,isOpen:t,onClick:()=>n(!t),onClickOutside:()=>n(!t),children:e("form",{onSubmit:i=>{i.preventDefault(),p(`${V.random(1,10)} hours`),n(!1)},children:a(O,{className:"!m-0 flex flex-row space-x-2",children:[e(I,{}),a(g,{children:[e("option",{value:"hours",children:"hours"}),e("option",{value:"minutes",children:"minutes"})]}),e(y,{children:"Apply"})]})})})]})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"WithoutArrow"};var d,h,f;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("8 hours");
  const [value, setValue] = useState(8);
  const handleSubmit = e => {
    e.preventDefault();
    setText(\`\${value} hours with a very large string in here\`);
    setIsOpen(false);
  };
  const updateValue = e => setValue(e.target.value);
  const handleClickOutside = () => {
    console.log("Setting", value);
    setIsOpen(!isOpen);
    setValue(value);
  };
  return <div className="h-20">
            <InlineValuePopover text={text} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} onClickOutside={handleClickOutside}>
                <form onSubmit={handleSubmit}>
                    <FormGroup className="!m-0 flex flex-row space-x-2">
                        <Input value={value} onChange={updateValue} />
                        <Select>
                            <option value="hours">hours</option>
                            <option value="minutes">minutes</option>
                        </Select>
                        <Button>Apply</Button>
                    </FormGroup>
                </form>
            </InlineValuePopover>
        </div>;
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,x,S;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("8 hours");
  const handleSubmit = e => {
    e.preventDefault();
    setText(\`\${random(1, 10)} hours\`);
    setIsOpen(false);
  };
  return <div>
            <div className="mb-5">
                Values are randomly set just for story purposes. Use your form library to fetch form values and set them
                properly
            </div>
            <InlineValuePopover showArrow={false} text={text} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} onClickOutside={() => setIsOpen(!isOpen)}>
                <form onSubmit={handleSubmit}>
                    <FormGroup className="!m-0 flex flex-row space-x-2">
                        <Input />
                        <Select>
                            <option value="hours">hours</option>
                            <option value="minutes">minutes</option>
                        </Select>
                        <Button>Apply</Button>
                    </FormGroup>
                </form>
            </InlineValuePopover>
        </div>;
}`,...(S=(x=r.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const $=["Default","WithoutArrow"];export{o as Default,r as WithoutArrow,$ as __namedExportsOrder,G as default};
