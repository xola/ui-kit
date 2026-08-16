import{a,j as l}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{T as e}from"./PieOptions-00f89f27.js";import"./lodash-e9238610.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const R={title:"Data Display/Table",component:e,parameters:{docs:{description:{component:"Your standard Table with a few bells and whistles"}},design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7839%3A479698&viewport=5709%2C-1661%2C0.26"}},argTypes:{"Table.Header":{description:"The header for this table, equivalent to a `<th>` HTML tag. This should contain instances of `<Table.Row>`",type:{required:!0},control:!1},"Table.Head":{description:"The header for this table, equivalent to a `<th>` HTML tag. This should contain instances of `<Table.Row>`",type:{required:!0},control:!1},"Table.Body":{description:"The body for this table, equivalent to a `<tbody>` HTML tag. This should contain instances of `<Table.Row>`",type:{required:!0},control:!1},"Table.Row":{description:"Each row for this table, equivalent to a `<tr>` HTML tag. This should be nested with a `<Table.Head>` or `<Table.Body>`",type:{required:!0},control:!1},"Table.Cell":{description:"Each cell for this table, equivalent to a `<td>` HTML tag. This should be nested with a `<Table.Row>`",type:{required:!0},control:{type:"string"}}}},n=()=>a(e,{children:[l(e.Head,{children:a(e.Row,{children:[l(e.Header,{children:"Name"}),l(e.Header,{children:"Title"}),l(e.Header,{children:"Email"}),l(e.Header,{children:"Role"}),l(e.Header,{children:"Edit"})]})}),a(e.Body,{isStriped:!1,children:[a(e.Row,{children:[l(e.Cell,{children:"Michael Scott"}),l(e.Cell,{children:"Regional Manager"}),l(e.Cell,{children:"michael.scott@dundermifflin.com"}),l(e.Cell,{children:"Super Admin"}),l(e.Cell,{children:"Edit"})]}),a(e.Row,{children:[l(e.Cell,{children:"Dwight Schrute"}),l(e.Cell,{children:"Assistant to the Regisional Manager"}),l(e.Cell,{children:"dwight.schrute@dundermifflin.com"}),l(e.Cell,{children:"Admin"}),l(e.Cell,{children:"Edit"})]}),a(e.Row,{children:[l(e.Cell,{children:"Jim"}),l(e.Cell,{children:"Sales Manager"}),l(e.Cell,{children:"jim@dundermifflin.com"}),l(e.Cell,{children:"Manager"}),l(e.Cell,{children:"Edit"})]})]})]}),i=()=>a(e,{children:[l(e.Head,{children:a(e.Row,{children:[l(e.Header,{children:"Name"}),l(e.Header,{children:"Title"}),l(e.Header,{children:"Email"}),l(e.Header,{children:"Role"}),l(e.Header,{children:"Edit"})]})}),a(e.Body,{isStriped:!0,children:[a(e.Row,{children:[l(e.Cell,{children:"Michael Scott"}),l(e.Cell,{children:"Regional Manager"}),l(e.Cell,{children:"michael.scott@dundermifflin.com"}),l(e.Cell,{children:"Super Admin"}),l(e.Cell,{children:"Edit"})]}),a(e.Row,{children:[l(e.Cell,{children:"Dwight Schrute"}),l(e.Cell,{children:"Assistant to the Regisional Manager"}),l(e.Cell,{children:"dwight.schrute@dundermifflin.com"}),l(e.Cell,{children:"Admin"}),l(e.Cell,{children:"Edit"})]}),a(e.Row,{children:[l(e.Cell,{children:"Jim Halpert"}),l(e.Cell,{children:"Sales Manager"}),l(e.Cell,{children:"jim.halpert@dundermifflin.com"}),l(e.Cell,{children:"Manager"}),l(e.Cell,{children:"Edit"})]}),a(e.Row,{children:[l(e.Cell,{children:"Pam Beesly"}),l(e.Cell,{children:"Office Manager"}),l(e.Cell,{children:"pam.beesly@dundermifflin.com"}),l(e.Cell,{children:"None"}),l(e.Cell,{children:"Edit"})]})]})]});n.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"StripedTable"};var r,d,t;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  return <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Title</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>Role</Table.Header>
                    <Table.Header>Edit</Table.Header>
                </Table.Row>
            </Table.Head>

            <Table.Body isStriped={false}>
                <Table.Row>
                    <Table.Cell>Michael Scott</Table.Cell>
                    <Table.Cell>Regional Manager</Table.Cell>
                    <Table.Cell>michael.scott@dundermifflin.com</Table.Cell>
                    <Table.Cell>Super Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Dwight Schrute</Table.Cell>
                    <Table.Cell>Assistant to the Regisional Manager</Table.Cell>
                    <Table.Cell>dwight.schrute@dundermifflin.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Jim</Table.Cell>
                    <Table.Cell>Sales Manager</Table.Cell>
                    <Table.Cell>jim@dundermifflin.com</Table.Cell>
                    <Table.Cell>Manager</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>;
}`,...(t=(d=n.parameters)==null?void 0:d.docs)==null?void 0:t.source}}};var o,T,b;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  return <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Title</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>Role</Table.Header>
                    <Table.Header>Edit</Table.Header>
                </Table.Row>
            </Table.Head>

            <Table.Body isStriped>
                <Table.Row>
                    <Table.Cell>Michael Scott</Table.Cell>
                    <Table.Cell>Regional Manager</Table.Cell>
                    <Table.Cell>michael.scott@dundermifflin.com</Table.Cell>
                    <Table.Cell>Super Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Dwight Schrute</Table.Cell>
                    <Table.Cell>Assistant to the Regisional Manager</Table.Cell>
                    <Table.Cell>dwight.schrute@dundermifflin.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Jim Halpert</Table.Cell>
                    <Table.Cell>Sales Manager</Table.Cell>
                    <Table.Cell>jim.halpert@dundermifflin.com</Table.Cell>
                    <Table.Cell>Manager</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Pam Beesly</Table.Cell>
                    <Table.Cell>Office Manager</Table.Cell>
                    <Table.Cell>pam.beesly@dundermifflin.com</Table.Cell>
                    <Table.Cell>None</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>;
}`,...(b=(T=i.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};const E=["Default","StripedTable"];export{n as Default,i as StripedTable,E as __namedExportsOrder,R as default};
