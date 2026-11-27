import { useMemoizedFn, useUpdateEffect } from "ahooks";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import cn from "../../helpers/classnames";

const NEXT_STAGE = { enterFrom: "enterTo", leaveFrom: "leaveTo" };

const getLongestTransition = (element) => {
    if (!element) {
        return 0;
    }

    const { transitionDuration, transitionDelay } = getComputedStyle(element);
    const toMilliseconds = (value) => Number.parseFloat(value) * (value.endsWith("ms") ? 1 : 1000) || 0;
    const delays = transitionDelay.split(",").map(toMilliseconds);

    return Math.max(
        ...transitionDuration.split(",").map((duration, index) => toMilliseconds(duration) + (delays[index] ?? 0)),
    );
};

/**
 * Applies the `enter*` / `leave*` class props in stages and calls the `before*` / `after*` callbacks
 * around them, because callers pass their own classes, which a CSS-only `starting:` fade could not
 * apply. The `*From` classes stay for two frames so the browser paints them before the `*To`
 * classes start the transition, and the stage ends after the element's longest transition.
 *
 * The `entered` stage drops the `enter` and `enterTo` classes (unlike Headless UI, which kept them),
 * so put styles that must persist at rest in `entered`.
 */
export const FadeIn = ({
    shouldShow = true,
    shouldAppear = true,
    tag: Tag = "div",
    enter = "transition-opacity duration-700",
    enterFrom = "opacity-0",
    enterTo = "opacity-100",
    entered,
    leave,
    leaveFrom,
    leaveTo,
    className,
    children,
    beforeEnter,
    afterEnter,
    beforeLeave,
    afterLeave,
    ...rest
}) => {
    const elementRef = useRef(null);
    const [stage, setStage] = useState(() => {
        if (!shouldShow) {
            return "hidden";
        }

        return shouldAppear ? "enterFrom" : "entered";
    });

    useUpdateEffect(() => {
        if (shouldShow) {
            setStage("enterFrom");
            return;
        }

        setStage((current) => (current === "hidden" ? current : "leaveFrom"));
    }, [shouldShow]);

    const handleStageStart = useMemoizedFn((startedStage) => {
        if (startedStage === "enterFrom") {
            beforeEnter?.();
        }

        if (startedStage === "leaveFrom") {
            beforeLeave?.();
        }
    });

    const handleTransitionEnd = useMemoizedFn((isEntering) => {
        setStage(isEntering ? "entered" : "hidden");
        (isEntering ? afterEnter : afterLeave)?.();
    });

    useEffect(() => {
        handleStageStart(stage);

        const nextStage = NEXT_STAGE[stage];
        if (nextStage) {
            let frame = requestAnimationFrame(() => {
                frame = requestAnimationFrame(() => setStage(nextStage));
            });

            return () => cancelAnimationFrame(frame);
        }

        if (stage === "enterTo" || stage === "leaveTo") {
            const isEntering = stage === "enterTo";
            const duration = getLongestTransition(elementRef.current);
            const timer = setTimeout(() => handleTransitionEnd(isEntering), duration);

            return () => clearTimeout(timer);
        }

        return undefined;
    }, [stage, handleStageStart, handleTransitionEnd]);

    if (stage === "hidden") {
        return null;
    }

    const stageClasses = {
        enterFrom: cn(enter, enterFrom),
        enterTo: cn(enter, enterTo),
        entered,
        leaveFrom: cn(leave, leaveFrom),
        leaveTo: cn(leave, leaveTo),
    };

    return (
        <Tag ref={elementRef} className={cn(className, stageClasses[stage])} {...rest}>
            {children}
        </Tag>
    );
};

FadeIn.propTypes = {
    shouldShow: PropTypes.bool,
    shouldAppear: PropTypes.bool,
    tag: PropTypes.string,
    enter: PropTypes.string,
    enterFrom: PropTypes.string,
    enterTo: PropTypes.string,
    entered: PropTypes.string,
    leave: PropTypes.string,
    leaveFrom: PropTypes.string,
    leaveTo: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    beforeEnter: PropTypes.func,
    afterEnter: PropTypes.func,
    beforeLeave: PropTypes.func,
    afterLeave: PropTypes.func,
};
