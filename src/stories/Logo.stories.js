import React from "react";
import { Logo } from "..";

export default {
    title: "Components/Logo",
    component: Logo,
    parameters: {
        docs: {
            description: {
                component:
                    "Use to show a seller's logo when an image URL is present. This is *not* a generic image component",
            },
        },
    },
    argTypes: {
        src: {
            type: { required: true },
            defaultValue: "http://placekitten.com/300/300",
            description: "The URL to the logo",
            control: {
                type: "text",
            },
            table: {
                type: { summary: null },
                defaultValue: { summary: "none" },
            },
        },
        size: {
            description: "The size of the image",
            defaultValue: "medium",
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
        },
    },
};

export const Default = ({ src = "http://placekitten.com/300/300", size = "small" }) => {
    return <Logo src={src} size={size} />;
};

export const AllSizes = () => {
    return (
        <div className="space-x-4">
            <Logo src="https://xola.com/api/users/52fc61323e269e5b08000007/picture?size=small" size="small" />
            <Logo src="https://xola.com/api/users/52fc61323e269e5b08000007/picture?size=medium" size="medium" />
            <Logo src="https://xola.com/api/users/52fc61323e269e5b08000007/picture?size=large" size="large" />
        </div>
    );
};
