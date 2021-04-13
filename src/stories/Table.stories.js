import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "..";

export default {
    title: "Table",
    component: Table,
};

export const Default = () => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                    <TableHeader>Edit</TableHeader>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow>
                    <TableCell>Jane Cooper</TableCell>
                    <TableCell>Regional Paradigm Technician</TableCell>
                    <TableCell>jane.cooper@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Edit</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Jane Cooper</TableCell>
                    <TableCell>Regional Paradigm Technician</TableCell>
                    <TableCell>jane.cooper@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Edit</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Jane Cooper</TableCell>
                    <TableCell>Regional Paradigm Technician</TableCell>
                    <TableCell>jane.cooper@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Edit</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
