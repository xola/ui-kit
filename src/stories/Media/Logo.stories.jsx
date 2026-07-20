import React from "react";
import { expect } from "storybook/test";
import { Logo } from "../..";

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
        size: {
            description: "The size of the image",
            options: ["small", "medium", "large"],
            control: { type: "radio" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "medium" },
            },
        },
    },
};

export const Default = ({ src: source = "http://seller.staging.xola.app/favicon.svg", size = "small" }) => {
    return <Logo src={source} size={size} />;
};

Default.play = async ({ canvasElement }) => {
    const logo = canvasElement.querySelector("img.ui-logo");
    await expect(logo).toBeInTheDocument();
    await expect(logo).toHaveAttribute("src");
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

AllSizes.play = async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll("img.ui-logo")).toHaveLength(3);
};

export default LogoStories;
