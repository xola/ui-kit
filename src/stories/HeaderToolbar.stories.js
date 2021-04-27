import React from "react";
import { Breadcrumb, Button, HeaderToolbar, Search, Switch } from "..";

export default {
    title: "Components/Header Toolbar",
    component: HeaderToolbar,
};

export const Default = () => {
    return (
        <HeaderToolbar>
            <Breadcrumb className="text-xl border-r pr-8 border-gray-light">
                <Breadcrumb.Item>Seller</Breadcrumb.Item>
                <Breadcrumb.Item>Lasting Adventures with a long name</Breadcrumb.Item>
            </Breadcrumb>

            <Search
                previewEnabled={false}
                className="border-none"
                onSelect={() => {
                    alert("Search bar not implemented");
                }}
            />

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
