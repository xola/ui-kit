import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children, useState } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import { getChildrenByType } from "../../helpers/children";
import styles from "./Popover.module.css";
import scrollFix from "./PopoverScroll.module.css";

export const Popover = ({ lazy = true, skidding = 0, distance = 10, className, children, ...rest }) => {
    const content = getChildrenByType(children, Popover.Content);
    const target = Children.toArray(children).filter((child) => child.type !== Popover.Content);

    // See the explanation below for why we need to use lazy mounting
    const TippyComponent = lazy ? LazyTippy : Tippy;

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

Popover.propTypes = {
    lazy: PropTypes.bool,
    className: PropTypes.string,
    skidding: PropTypes.number,
    distance: PropTypes.number,
    children: PropTypes.node.isRequired,
};

const Content = ({ className, children }) => {
    return <div className={clsx("ui-popover-content", className)}>{children}</div>;
};

Content.displayName = "Popover.Content";
Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Popover.Content = Content;


/**
 * This is to ensure lazy mounting which will not mount the content until the tippy is shown.
 *
 * By default, Tippy mounts your content or render elements into a container element once created,
 * even if the tippy isn't mounted on the DOM. In most cases, this is fine, but in performance-sensitive scenarios
 * or cases where mounting the component should fire effects only when the tippy mounted, you can lazify the component.
 *
 * WHY?
 * In React, a component gets mounted even if the JSX is not immediately rendered on screen due to React's
 * virtual DOM reconciliation process. When a component is rendered but not displayed, it still goes through
 * the mounting phase where the component instance is created and its lifecycle methods are called.
 * This allows React to manage the component's state, props, and perform any necessary setup tasks.
 *
 * This behavior is need for maintaining component state and lifecycle methods, ensuring consistency in component behavior.
 */
const LazyTippy = React.forwardRef((props, ref) => {
    const [mounted, setMounted] = useState(false);

    const lazyPlugin = {
        fn: () => ({
            onMount: () => setMounted(true),
            onHidden: () => setMounted(false),
        }),
    };

    const computedProps = { ...props };
    computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

    if (props.render) {
        computedProps.render = (...args) => (mounted ? props.render(...args) : '');
    } else {
        computedProps.content = mounted ? props.content : '';
    }

    return <Tippy {...computedProps} ref={ref} />;
});
