import React from "react";
import { Table } from "..";

export default {
    title: "Components/Table",
    component: Table,
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

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Jane Cooper</Table.Cell>
                    <Table.Cell>Regional Paradigm Technician</Table.Cell>
                    <Table.Cell>jane.cooper@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Jane Cooper</Table.Cell>
                    <Table.Cell>Regional Paradigm Technician</Table.Cell>
                    <Table.Cell>jane.cooper@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>Jane Cooper</Table.Cell>
                    <Table.Cell>Regional Paradigm Technician</Table.Cell>
                    <Table.Cell>jane.cooper@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};
