import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// Common size types used across components
export type Size = "tiny" | "small" | "medium" | "large" | "huge";

// Common color types used across components
export type Color = "primary" | "secondary" | "success" | "warning" | "caution" | "danger";

// Common variant types for buttons and similar components
export type Variant = "standard" | "outline" | "link";

// Polymorphic component props helper for components that accept an 'as' prop
// This allows components to be rendered as different HTML elements while maintaining type safety
export type PolymorphicComponentProps<T extends ElementType, P = {}> = P &
    Omit<ComponentPropsWithoutRef<T>, keyof P> & {
        as?: T;
    };

// Common props shared across most UI components
export interface CommonComponentProps {
    className?: string;
    children?: ReactNode;
}

// Icon component props interface
export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: "tiny" | "small" | "medium" | "large";
    className?: string;
}

// Helper type for ref forwarding with polymorphic components
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>["ref"];

// Helper type for components with required children
export interface ComponentWithChildren {
    children: ReactNode;
}

// Helper type for components with optional children
export interface ComponentWithOptionalChildren {
    children?: ReactNode;
}
