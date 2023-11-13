import React from "react";
import { Logo } from "../..";
import { sizeParams } from "../helpers";

const LogoStories = {
    title: "Media/Logo",
    component: Logo,
    parameters: {
        docs: {
            description: {
                component:
                    "Use to show a seller's logo when an image URL is present. This is *not* a generic image component",
            },
        },
    },
    args: {
        size: "medium",
    },
    argTypes: {
        src: {
            type: { required: true },
            description: "The URL to the logo",
            control: {
                type: "text",
            },
            table: {
                type: { summary: null },
                defaultValue: { summary: "none" },
            },
        },
        size: sizeParams,
    },
};

export const Default = ({ src: source = "http://seller.staging.xola.app/favicon.svg", size = "small" }) => {
    return <Logo src={source} size={size} />;
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

export default LogoStories;
