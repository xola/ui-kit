import { Breadcrumb, Search, Switch, Button, HeaderToolbar } from "..";
import React, { useState, useEffect } from "react";

export default {
    title: "Components/Header Toolbar",
    component: HeaderToolbar,
};

export const Default = () => {
    const ToolbarBreadcrumb = (
        <Breadcrumb>
            <Breadcrumb.Item>Seller</Breadcrumb.Item>
            <Breadcrumb.Item>Lasting Adventures with a long name</Breadcrumb.Item>
        </Breadcrumb>
    );

    const ToolbarSearch = (
        <Search
            previewEnabled={false}
            className="asdf"
            onSelect={() => {
                alert("Search bar not implemented");
            }}
        />
    );

    return (
        <HeaderToolbar breadcrumb={ToolbarBreadcrumb} search={ToolbarSearch}>
            <Switch.Group>
                <Switch.Label direction="left" className="text-base">
                    Enable
                </Switch.Label>
                <Switch size="small" />
            </Switch.Group>
            <Button size="small">Impersonate</Button>
        </HeaderToolbar>
    );
};
