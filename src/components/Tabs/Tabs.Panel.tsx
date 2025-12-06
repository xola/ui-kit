import clsx from "clsx";
import React from "react";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    readonly children?: React.ReactNode;
    readonly className?: string;
}

export const Panel = ({ className, ...rest }: PanelProps) => {
    return <div className={clsx("ui-tabs-panel", className)} {...rest} />;
};

Panel.displayName = "Tabs.Panel";
