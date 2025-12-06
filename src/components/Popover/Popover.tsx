import Tippy, { type TippyProps } from "@tippyjs/react";
import clsx from "clsx";
import React, { Children, forwardRef, useState } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import { getChildrenByType } from "../../helpers/children";
import styles from "./Popover.module.css";
import scrollFix from "./PopoverScroll.module.css";

export interface PopoverProps extends Omit<Partial<TippyProps>, "children" | "className"> {
    readonly isLazy?: boolean;
    readonly skidding?: number;
    readonly distance?: number;
    children: React.ReactNode;
    readonly className?: string;
}

export const Popover = ({ isLazy = true, skidding = 0, distance = 10, children, className, ...rest }: PopoverProps) => {
    const content = getChildrenByType(children, Content);
    const target = Children.toArray(children).filter((child: any) => child.type !== Content);

    // See the explanation below for why we need to use lazy mounting https://github.com/xola/ui-kit/pull/330
    const TippyComponent = isLazy ? LazyTippy : Tippy;

    return (
        <TippyComponent
            interactive
            zIndex={50}
            content={content}
            className={clsx(
                "ui-popover",
                scrollFix,
                styles.main,
                "!rounded-lg !border-gray-light shadow-xl",
                className,
            )}
            plugins={[followCursor]}
            offset={[skidding ?? 0, distance ?? 10]}
            {...rest}
        >
            <span>{target}</span>
        </TippyComponent>
    );
};

export interface PopoverContentProps {
    children: React.ReactNode;
    readonly className?: string;
}

const Content = ({ children, className }: PopoverContentProps) => {
    return <div className={clsx("ui-popover-content", className)}>{children}</div>;
};

Content.displayName = "Popover.Content";

Popover.Content = Content;

/**
 * This is to ensure lazy mounting which will not mount the content until the tippy is shown.
 *
 * By default, Tippy mounts your content or render elements into a container element once created,
 * even if the tippy isn't mounted on the DOM. In most cases, this is fine, but in performance-sensitive scenarios
 * or cases where mounting the component should fire effects only when the tippy mounted, you can lazify the component.
 */
const LazyTippy = forwardRef<any, TippyProps>((props, ref) => {
    const [mounted, setMounted] = useState(false);

    const lazyPlugin = {
        fn: () => ({
            onMount: () => setMounted(true),
            onHidden: () => setMounted(false),
        }),
    };

    const computedProps: any = { ...props };
    computedProps.plugins = [lazyPlugin, ...(props.plugins ?? [])];

    if (props.render) {
        computedProps.render = (attributes: any, content: any, instance: any) =>
            mounted ? props.render?.(attributes, content, instance) : "";
    } else {
        computedProps.content = mounted ? props.content : "";
    }

    return <Tippy {...computedProps} ref={ref} />;
});

LazyTippy.displayName = "LazyTippy";
