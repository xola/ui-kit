import React from "react";

const LinksStories = {
    title: "Configuration/Links",
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2855%3A99459",
        },
    },
};

export const Links = {
    render: (args) => {
        return (
            <div className="space-y-4">
                <a href="https://xola.com" target="_blank" className="block text-xs" rel="noreferrer">
                    Link L1 text-xs
                </a>
                <a href="https://xola.com" target="_blank" className="block text-sm" rel="noreferrer">
                    Link L2 text-sm
                </a>
                <a href="https://xola.com" target="_blank" className="block text-base" rel="noreferrer">
                    Link L3 text-base
                </a>
                <a href="https://xola.com" target="_blank" className="block text-md" rel="noreferrer">
                    Link L4 text-md
                </a>
            </div>
        );
    },
};

export default LinksStories;
