import React from "react";
import cn from "../../helpers/classnames";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const Panel = ({ className, ...rest }: PanelProps) => {
    return <div className={cn("ui-tabs-panel", className)} {...rest} />;
};

Panel.displayName = "Tabs.Panel";
