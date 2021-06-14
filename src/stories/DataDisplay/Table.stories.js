import React from "react";
import { Table } from "../..";

const TableStories = {
    title: "Data Display/Table",
    component: Table,
    parameters: {
        docs: {
            description: {
                component: "Your standard Table with a few bells and whistles",
            },
        },
    },
    argTypes: {
        "Table.Header": {
            description:
                "The header for this table, equivalent to a `<th>` HTML tag. This should contain instances of `<Table.Row>`",
            type: { required: true },
            control: false,
        },
        "Table.Head": {
            description:
                "The header for this table, equivalent to a `<th>` HTML tag. This should contain instances of `<Table.Row>`",
            type: { required: true },
            control: false,
        },
        "Table.Body": {
            description:
                "The body for this table, equivalent to a `<tbody>` HTML tag. This should contain instances of `<Table.Row>`",
            type: { required: true },
            control: false,
        },
        "Table.Row": {
            description:
                "Each row for this table, equivalent to a `<tr>` HTML tag. This should be nested with a `<Table.Head>` or `<Table.Body>`",
            type: { required: true },
            control: false,
        },
        "Table.Cell": {
            description:
                "Each cell for this table, equivalent to a `<td>` HTML tag. This should be nested with a `<Table.Row>`",
            type: { required: true },
            control: { type: "string" },
        },
    },
};

export const Default = () => {
    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Title</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>Role</Table.Header>
                    <Table.Header>Edit</Table.Header>
                </Table.Row>
            </Table.Head>

            <Table.Body striped={false}>
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
        </Table>
    );
};

export const StripedTabled = () => {
    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Title</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>Role</Table.Header>
                    <Table.Header>Edit</Table.Header>
                </Table.Row>
            </Table.Head>

            <Table.Body striped>
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
        </Table>
    );
};

export default TableStories;
