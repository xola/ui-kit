// @ts-nocheck
import React from "react";
import { Badge, Login } from "../..";

const LoginStories = {
    title: "Screens/Login",
    component: Login,
    parameters: {
        docs: {
            description: {
                component: "A default login screen specifically for Xola",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/loaaBJLNhy9ipQe3HW5wIn/14---Login?node-id=2%3A12437",
        },
    },
    args: {
        backgroundType: "default",
    },
    argTypes: {
        backgroundType: {
            options: ["default", "x2", "admin", "scaffold"],
            control: { type: "select" },
            table: {
                defaultValue: { summary: "default" },
            },
        },
        label: {
            control: { type: "text" },
        },
        passwordResetUrl: {
            type: { required: true },
            control: { type: "text" },
        },
    },
};

const onSubmit = (email, password) => {
    // eslint-disable-next-line no-alert
    alert(`Hello ${email} Password: ${password.slice(0, 2)}*** This is a WIP`);
};

export const Default = (props) => {
    return <Login onSubmit={onSubmit} {...props} />;
};

export const X2 = () => {
    const label = (
        <Badge color="warning" className="!rounded">
            X2
        </Badge>
    );
    return <Login backgroundType="x2" label={label} onSubmit={onSubmit} />;
};

export const Admin = () => {
    const label = (
        <Badge color="danger" size="medium" className="!rounded">
            THIS IS THE ADMIN PANEL!!111
        </Badge>
    );
    return <Login backgroundType="admin" label={label} onSubmit={onSubmit} />;
};

export const Scaffold = () => {
    const label = <Badge className="!rounded">Scaffold</Badge>;
    return <Login backgroundType="scaffold" label={label} onSubmit={onSubmit} />;
};

export const Custom = () => {
    const label = <Badge className="!rounded">Custom Background for Internal Tools</Badge>;
    return <Login backgroundImage="http://source.unsplash.com/noOXRT9gfQ8/w=4096" label={label} onSubmit={onSubmit} />;
};

export default LoginStories;
