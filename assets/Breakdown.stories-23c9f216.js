import{j as e,a as i}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{G as n,c as r}from"./PieOptions-727b644f.js";import{p as a}from"./lodash-fd0d49af.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const v={title:"Other/Breakdown",component:n,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/EFmxLREOeGUse5zksD3iT4/%E2%9A%99%EF%B8%8F-02---DS-Application-UI?node-id=236%3A144618&viewport=-3895%2C-275%2C0.33"}}},t=()=>{const o=()=>null;return e("div",{className:"w-80 bg-gray-lighter p-4",children:i(n,{currency:"USD",children:[e(n.Item,{value:100,children:"Line item caption"}),e(n.Item,{value:29,secondary:"($29.00 x 1)",children:"Very long really Children"}),e(n.Item,{value:29,secondary:"($29.00 x 1)",children:"Adults"}),e(n.Item,{value:29,methodIcon:e(o,{}),info:e(o,{}),children:"Null Info"}),e(n.Item,{value:4,secondary:"($2.00 x 2)",children:"VAT"}),e(n.Separator,{}),e(n.SubtotalItem,{info:"Total",value:162,children:e(r,{color:"secondary",variant:"outline",size:"small",children:"Modify"})}),e(n.Item,{value:1230,secondary:"12/18/2019",info:"*0259",methodIcon:e(a,{}),children:"Payment"}),e(n.Item,{color:"primary",info:"*0259",secondary:"07/23/2021",value:-62,methodIcon:e(a,{}),children:"Return Payment"}),e(n.Item,{secondary:"07/23/2021",info:e(o,{}),value:0,methodIcon:e(a,{}),children:"This is a really long message that should wrap somehow more long"}),e(n.Item,{secondary:"07/23/2021",info:e(o,{}),value:0,methodIcon:e(a,{}),children:"LongMessageThat ShouldOnlyBreakAt AWhitespaceLoremIpsum"}),e(n.Item,{secondary:"07/23/2021",info:e(o,{}),value:0,methodIcon:e(a,{}),children:"SmallMessage LongMessageThatShouldOnlyBreakAtAWhitespaceLoremIpsum"}),e(n.Separator,{}),e(n.SubtotalItem,{info:"Paid",value:62,children:e(r,{color:"secondary",variant:"outline",size:"small",children:"Apply Code"})}),e(n.SubtotalItem,{info:"Balance",color:"danger",value:62})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,m,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  // Just for a basic showcase of when info is null
  const EmptyComponent = () => null;
  return <div className="w-80 bg-gray-lighter p-4">
            <Breakdown currency="USD">
                <Breakdown.Item value={100}>Line item caption</Breakdown.Item>
                <Breakdown.Item value={29} secondary="($29.00 x 1)">
                    Very long really Children
                </Breakdown.Item>
                <Breakdown.Item value={29} secondary="($29.00 x 1)">
                    Adults
                </Breakdown.Item>
                <Breakdown.Item value={29} methodIcon={<EmptyComponent />} info={<EmptyComponent />}>
                    Null Info
                </Breakdown.Item>
                <Breakdown.Item value={4} secondary="($2.00 x 2)">
                    VAT
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Total" value={162}>
                    <Button color="secondary" variant="outline" size="small">
                        Modify
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.Item value={1230} secondary="12/18/2019" info="*0259" methodIcon={<CardIcon />}>
                    Payment
                </Breakdown.Item>

                <Breakdown.Item color="primary" info="*0259" secondary="07/23/2021" value={-62} methodIcon={<CardIcon />}>
                    Return Payment
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    This is a really long message that should wrap somehow more long
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    LongMessageThat ShouldOnlyBreakAt AWhitespaceLoremIpsum
                </Breakdown.Item>

                <Breakdown.Item secondary="07/23/2021" info={<EmptyComponent />} value={0} methodIcon={<CardIcon />}>
                    SmallMessage LongMessageThatShouldOnlyBreakAtAWhitespaceLoremIpsum
                </Breakdown.Item>

                <Breakdown.Separator />

                <Breakdown.SubtotalItem info="Paid" value={62}>
                    <Button color="secondary" variant="outline" size="small">
                        Apply Code
                    </Button>
                </Breakdown.SubtotalItem>

                <Breakdown.SubtotalItem info="Balance" color="danger" value={62} />
            </Breakdown>
        </div>;
}`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,v as default};
