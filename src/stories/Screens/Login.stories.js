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
    },
};

const onSubmit = (email, password) => {
    // eslint-disable-next-line no-alert
    alert(`Hello ${email} Password: ${password.slice(0, 2)}*** This is a WIP`);
};

export const Default = () => {
    return <Login onSubmit={onSubmit} />;
};

export const X2 = () => {
    const label = (
        <Badge color="warning" className="!rounded">
            X2
        </Badge>
    );
    return <Login onSubmit={onSubmit} backgroundType="x2" label={label} />;
};

export const Admin = () => {
    const label = (
        <Badge color="secondary" className="!rounded">
            Admin
        </Badge>
    );
    return <Login onSubmit={onSubmit} backgroundType="admin" label={label} />;
};

export const Scaffold = () => {
    const label = <Badge className="!rounded">Scaffold</Badge>;
    return <Login onSubmit={onSubmit} backgroundType="scaffold" label={label} />;
};

export default LoginStories;
