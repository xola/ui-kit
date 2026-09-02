import{j as e,a as s}from"./jsx-runtime-5e7b5774.js";import{c as V}from"./clsx-0839fdbe.js";import"./index-e6e5af86.js";import{m as c,L as p,o as m,a as _}from"./PieOptions-ef3152f6.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const q={primary:!0,title:"Forms & Fields/ComboBox",args:{isCreatable:"boolean",isMulti:"boolean",closeMenuOnSelect:"boolean"},argTypes:{isCreatable:{control:{type:"boolean"},table:{defaultValue:{summary:!1}}},isMulti:{control:{type:"boolean"},table:{defaultValue:{summary:!1}}},closeMenuOnSelect:{control:{type:"boolean"},table:{defaultValue:{summary:!1}}}},parameters:{docs:{description:{component:"Re-export of React Select library with Xola styles applied. Check React Select documentation for more info: https://react-select.com"}}}},t=({isCreatable:o=!1,isMulti:n=!1})=>e("div",{className:"h-40",children:s(c,{children:[e(p,{children:"Apply Coupon"}),e(m,{isCreatable:o,isMulti:n,options:[{value:1,label:"5% OFF"},{value:2,label:"10% OFF"}]})]})}),r=()=>{const o=[{value:1,label:"5% OFF"},{value:2,label:"10% OFF"}];return e("div",{className:"h-40",children:s(c,{children:[e(p,{children:"Booking Tags"}),e(m,{isCreatable:!0,isMulti:!0,closeMenuOnSelect:!0,options:o,defaultValue:o,placeholder:"Add tag"})]})})},i=()=>e("div",{className:"h-40",children:s(c,{children:[e(p,{children:"Select Experience"}),e(m,{options:[{id:1,name:"Experience 1"},{id:2,name:"Experience 2"}],getOptionValue:n=>n.id,getOptionLabel:n=>n.name})]})}),l=()=>e("div",{className:"h-60",children:s(c,{children:[e(p,{children:"Select Experience"}),e(m,{options:[{id:1,name:"Experience 1",description:"Lorem ipsum",price:123.45},{id:2,name:"Experience 2",description:"Dolor sit amet",price:456.78}],getOptionValue:a=>a.id,getOptionLabel:a=>a.name,components:{Option:({innerProps:a,innerRef:L,label:E,data:d,isSelected:u,isFocused:M})=>s("div",{ref:L,className:V("flex items-center border-b border-gray-light p-4",u&&"bg-success-dark text-white",!u&&M&&"bg-success-lighter"),...a,children:[s("div",{className:"mr-auto",children:[e("p",{className:"font-bold",children:E}),e("span",{className:"text-sm text-gray",children:d.description})]}),e(_,{currency:d.currency,children:d.price})]})}})]})});t.__docgenInfo={description:"",methods:[],displayName:"Default",props:{isCreatable:{defaultValue:{value:"false",computed:!1},required:!1},isMulti:{defaultValue:{value:"false",computed:!1},required:!1}}};r.__docgenInfo={description:"",methods:[],displayName:"TagsCreator"};i.__docgenInfo={description:"",methods:[],displayName:"UseCustomSchemaAsOptions"};l.__docgenInfo={description:"",methods:[],displayName:"RenderCustomOptionItems"};var b,g,h;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`({
  isCreatable = false,
  isMulti = false
}) => {
  const options = [{
    value: 1,
    label: "5% OFF"
  }, {
    value: 2,
    label: "10% OFF"
  }];
  return <div className="h-40">
            <FormGroup>
                <Label>Apply Coupon</Label>
                <ComboBox isCreatable={isCreatable} isMulti={isMulti} options={options} />
            </FormGroup>
        </div>;
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,x,O;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const tags = [{
    value: 1,
    label: "5% OFF"
  }, {
    value: 2,
    label: "10% OFF"
  }];
  return <div className="h-40">
            <FormGroup>
                <Label>Booking Tags</Label>
                <ComboBox isCreatable isMulti closeMenuOnSelect options={tags} defaultValue={tags} placeholder="Add tag" />
            </FormGroup>
        </div>;
}`,...(O=(x=r.parameters)==null?void 0:x.docs)==null?void 0:O.source}}};var C,F,v;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const options = [{
    id: 1,
    name: "Experience 1"
  }, {
    id: 2,
    name: "Experience 2"
  }];
  return <div className="h-40">
            <FormGroup>
                <Label>Select Experience</Label>

                <ComboBox options={options} getOptionValue={option => option.id} getOptionLabel={option => option.name} />
            </FormGroup>
        </div>;
}`,...(v=(F=i.parameters)==null?void 0:F.docs)==null?void 0:v.source}}};var y,N,S;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const options = [{
    id: 1,
    name: "Experience 1",
    description: "Lorem ipsum",
    price: 123.45
  }, {
    id: 2,
    name: "Experience 2",
    description: "Dolor sit amet",
    price: 456.78
  }];
  const Option = ({
    innerProps,
    innerRef,
    label,
    data,
    isSelected,
    isFocused
  }) => <div ref={innerRef} className={clsx("flex items-center border-b border-gray-light p-4", isSelected && "bg-success-dark text-white", !isSelected && isFocused && "bg-success-lighter")} {...innerProps}>
            <div className="mr-auto">
                <p className="font-bold">{label}</p>
                <span className="text-sm text-gray">{data.description}</span>
            </div>

            <Currency currency={data.currency}>{data.price}</Currency>
        </div>;
  return <div className="h-60">
            <FormGroup>
                <Label>Select Experience</Label>

                <ComboBox options={options} getOptionValue={option => option.id} getOptionLabel={option => option.name} components={{
        Option
      }} />
            </FormGroup>
        </div>;
}`,...(S=(N=l.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};const P=["Default","TagsCreator","UseCustomSchemaAsOptions","RenderCustomOptionItems"];export{t as Default,l as RenderCustomOptionItems,r as TagsCreator,i as UseCustomSchemaAsOptions,P as __namedExportsOrder,q as default};
