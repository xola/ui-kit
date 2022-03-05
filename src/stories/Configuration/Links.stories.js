import React from "react";

const LinksStories = {
    title: "Configuration/Links",
};

export const Links = () => {
    return (
        <div>
            <div className="font-mono text-sm text-gray-dark">
                CODE REVIEW: This should really be a &lt;a&gt; or &lt;Link&gt; component?
            </div>
            <a
                href="https://xola.com"
                target="_blank"
                className="block text-md font-semibold text-primary hover:underline"
                rel="noreferrer"
            >
                Link with Colors
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="block text-md font-semibold" rel="noreferrer">
                Link L1
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="block text-base font-semibold" rel="noreferrer">
                Link L2
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="block text-sm font-semibold" rel="noreferrer">
                Link L3
            </a>
        </div>
    );
};

export default LinksStories;
