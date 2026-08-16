import React from "react";
import { theme } from "../../theme";

const SpacingStories = {
    title: "Configuration/Spacing",
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=4308%3A146977",
        },
    },
};

const { spacing } = theme;

export const Spacing = () => {
    const keys = Object.keys(spacing)
        .map((n) => Number.parseFloat(n))
        .sort((a, b) => a - b);

    return (
        <div className="space-y-4">
            <div>
                This spacing is used for width, height, min-width and min-height. The spacing is in multiples of 4.
            </div>
            {keys.map((key) => {
                const styles = { width: spacing[key] };
                return (
                    <div key={key} className="flex flex-row items-center font-mono">
                        <span className="mr-1 min-w-14 shrink-0 text-sm text-gray-darker">w-{key}</span>
                        <div
                            key={key}
                            className="flex h-6 items-center rounded border border-blue-lighter bg-blue-lighter text-sm"
                            style={styles}
                        >
                            <span className="pl-0.5">{spacing[key]}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SpacingStories;
