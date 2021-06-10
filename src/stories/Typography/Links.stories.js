import React from "react";

export default {
    title: "Typography/Links",
};

export const Default = () => {
    return (
        <div className="space-y-4">
            <a href="https://xola.com" target="_blank" className="font-semibold text-md text-primary" rel="noreferrer">
                Link with Colors
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="font-semibold text-md" rel="noreferrer">
                Link L1
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="text-base font-semibold" rel="noreferrer">
                Link L2
            </a>
            <br />
            <a href="https://xola.com" target="_blank" className="text-sm font-semibold" rel="noreferrer">
                Link L3
            </a>
        </div>
    );
};
