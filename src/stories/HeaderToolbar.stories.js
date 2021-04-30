import React from "react";
import { Breadcrumb, Button, HeaderToolbar, Search, Switch } from "..";

export default {
    title: "Components/Header Toolbar",
    component: HeaderToolbar,
};

export const Default = () => {
    return (
        <HeaderToolbar>
            <HeaderToolbar.Breadcrumb>
                <Breadcrumb.Item>Seller</Breadcrumb.Item>
                <Breadcrumb.Item>Lasting Adventures</Breadcrumb.Item>
            </HeaderToolbar.Breadcrumb>
            <HeaderToolbar.Search
                placeholder="Search for seller"
                onSubmit={() => {
                    alert("Search bar not implemented");
                }}
            />
            <Switch.Group>
                <Switch.Label direction="left" className="text-base">
                    Enable
                </Switch.Label>

                <Switch size="medium" />
            </Switch.Group>

            <Button size="medium" color="success">
                Impersonate
            </Button>
        </HeaderToolbar>
    );
};
