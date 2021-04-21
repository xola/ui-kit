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

export const Default = () => {
    return <Login />;
}