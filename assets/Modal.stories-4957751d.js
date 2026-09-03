import{a as t,j as e}from"./jsx-runtime-5e7b5774.js";import{r as O}from"./index-e6e5af86.js";import{V as n,c as l,p as y}from"./PieOptions-aea04668.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const N={title:"Overlay/Modal",component:n,args:{size:"medium",position:"center",shouldCloseOnOutsideClick:!0,isOpen:!1},parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7751%3A525089&viewport=6332%2C-1512%2C0.29"}},argTypes:{size:{type:{required:!1},options:["small","medium","large","huge"],control:{type:"select"},table:{defaultValue:{summary:"medium"}}},position:{type:{required:!1},options:["topLeft","topRight","center","bottomLeft","bottomRight"],control:{type:"select"},table:{defaultValue:{summary:"center"}}},shouldCloseOnOutsideClick:{type:{required:!1},description:"Close the modal if user clicks outside it",control:{type:"boolean"}},isOpen:{type:{required:!1},description:"Control the modal open state",control:{type:"boolean"}}}},i=({size:r,position:d,shouldCloseOnOutsideClick:c})=>{const[s,p]=O.useState(!1),o=()=>{p(!s)};return t("div",{children:[e(l,{onClick:o,children:"Click me to launch a modal"}),t(n,{size:r,position:d,isOpen:s,shouldCloseOnOutsideClick:c,onClose:o,children:[e(n.Header,{description:"Enter the code bellow to apply the code",children:"Apply Code"}),e(n.Body,{children:e(y,{placeholder:"Coupon of Affiliate"})}),t(n.Footer,{className:"space-x-4",children:[e(l,{color:"secondary",variant:"outline",onClick:o,children:"Cancel"}),e(l,{color:"danger",onClick:o,children:"Confirm"})]})]})]})},a=({size:r,position:d,shouldCloseOnOutsideClick:c})=>{const[s,p]=O.useState(!1),o=()=>{p(!s)};return t("div",{children:[e(l,{onClick:o,children:"Click me to launch a modal"}),t(n,{className:"!max-w-200",size:r,position:d,isOpen:s,shouldCloseOnOutsideClick:c,onClose:o,children:[e(n.Header,{children:"Apply Code"}),e(n.Body,{children:e(y,{placeholder:"Coupon of Affiliate"})}),t(n.Footer,{className:"space-x-4",children:[e(l,{color:"secondary",variant:"outline",onClick:o,children:"Cancel"}),e(l,{color:"danger",onClick:o,children:"Confirm"})]})]})]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"CustomWidth"};var u,m,C;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`({
  size,
  position,
  shouldCloseOnOutsideClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal size={size} position={position} isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <Modal.Header description="Enter the code bellow to apply the code">Apply Code</Modal.Header>

                <Modal.Body>
                    <Input placeholder="Coupon of Affiliate" />
                </Modal.Body>

                <Modal.Footer className="space-x-4">
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="danger" onClick={toggle}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>;
}`,...(C=(m=i.parameters)==null?void 0:m.docs)==null?void 0:C.source}}};var h,f,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`({
  size,
  position,
  shouldCloseOnOutsideClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <div>
            <Button onClick={toggle}>Click me to launch a modal</Button>

            <Modal className="!max-w-200" size={size} position={position} isOpen={isOpen} shouldCloseOnOutsideClick={shouldCloseOnOutsideClick} onClose={toggle}>
                <Modal.Header>Apply Code</Modal.Header>

                <Modal.Body>
                    <Input placeholder="Coupon of Affiliate" />
                </Modal.Body>

                <Modal.Footer className="space-x-4">
                    <Button color="secondary" variant="outline" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="danger" onClick={toggle}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>;
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const S=["Default","CustomWidth"];export{a as CustomWidth,i as Default,S as __namedExportsOrder,N as default};
