import React from "react";
import { Badge } from "..";

export default {
    title: "Badge",
    component: Badge,
};

export const Default = () => {
    return (
        <div className="space-x-4">
            <Badge>Default</Badge>
        </div>
    );
};

export const Colors = () => {
    return (
        <div className="space-x-4">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="danger">Danger</Badge>
        </div>
    );
};
