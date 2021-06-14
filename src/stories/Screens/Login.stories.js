import React from "react";
import { Login } from "../..";

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

export default LoginStories;
