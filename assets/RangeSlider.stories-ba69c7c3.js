import{a as u,j as o}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{F as m,L as p,R as d}from"./PieOptions-93b770c0.js";import"./lodash-d0bc2bc7.js";import"./clsx.m-de421188.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./_commonjs-dynamic-modules-0e9d5d94.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const _={primary:!0,title:"Forms & Fields/RangeSlider"},e=()=>u(m,{children:[o(p,{children:"Default"}),o(d,{shouldConnectHandles:!0,values:[10,30],min:0,max:50,tooltipSuffix:"%"})]}),r=()=>u(m,{children:[o(p,{children:"Select Days"}),o(d,{values:[3,10,15],min:0,max:31,tooltipSuffix:" days"})]});e.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"MultipleInput"};var a,t,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const values = [10, 30];
  return <FormGroup>
            <Label>Default</Label>
            <RangeSlider shouldConnectHandles values={values} min={0} max={50} tooltipSuffix="%" />
        </FormGroup>;
}`,...(s=(t=e.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};var n,l,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const values = [3, 10, 15];
  return <FormGroup>
            <Label>Select Days</Label>

            <RangeSlider values={values} min={0} max={31} tooltipSuffix=" days" />
        </FormGroup>;
}`,...(i=(l=r.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const b=["Default","MultipleInput"];export{e as Default,r as MultipleInput,b as __namedExportsOrder,_ as default};
