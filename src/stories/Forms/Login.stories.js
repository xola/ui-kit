import React from "react";
import { Login } from "../..";

export default {
    title: "Components/Forms/Login",
    component: Login,
    parameters: {
        docs: {
            description: {
                component:
                    "A default login screen specifically for Xola",
            },
        },
    }
}

const onSubmit = (email, password) => {
    console.log('arguments', arguments);
    alert(`Hello ${email} Password: ${password.slice(0, 2)}*** This is a WIP`)
}

export const Default = () => {
    return <Login onSubmit={onSubmit} />;
}