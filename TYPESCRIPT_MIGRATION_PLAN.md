# TypeScript Migration Plan for Xola UI Kit

## Executive Summary

This document outlines a comprehensive, phased approach to migrate the Xola UI Kit from PropTypes to TypeScript. The migration will convert ~370 JavaScript/JSX files to TypeScript while ensuring Storybook continues to function properly.

---

## Current State Analysis

### Codebase Overview
- **Total Files**: ~370 JS/JSX files in src/
- **Components**: 67 component files (.jsx)
- **Icons**: 229 icon files (.jsx)
- **Stories**: ~52 Storybook story files (.stories.js)
- **PropTypes Usage**: 381 lines with PropTypes declarations
- **defaultProps Usage**: 8 instances
- **React Version**: 17.0.2
- **Build Tool**: Vite 3.0.8
- **Storybook Version**: 6.5.10
- **TypeScript**: Already in devDependencies (v4.9.5) but not configured

### Key Patterns Identified
1. **Component Patterns**:
   - Functional components with PropTypes
   - forwardRef usage for input components
   - Compound components (Modal.Header, Tabs.Tab, Sidebar.Menu, etc.)
   - Higher-order component pattern (createIcon helper)
   - Custom prop validators

2. **PropTypes Patterns**:
   - Basic types: string, bool, func, node, number
   - oneOf for enums
   - oneOfType for union types
   - Custom validators (e.g., Button icon validator)
   - Spread PropTypes from parent components
   - isRequired flags

3. **File Types**:
   - Components: PropTypes needed → TypeScript interfaces
   - Helpers: No PropTypes → Type annotations only
   - Hooks: No PropTypes → TypeScript generics
   - Icons: Simple PropTypes → Generic icon props interface

### Build & Deployment Considerations
- CI/CD with GitHub Actions (ESLint checks)
- Published as two packages: @xola/ui-kit and @xola/icons
- Builds to UMD and ESM formats via Vite
- Type definitions file (index.d.ts) exists but needs regeneration
- Storybook needs TypeScript support

---

## Migration Strategy

### Approach: Incremental, Bottom-Up Migration

We'll use an incremental migration strategy starting from the most fundamental pieces (helpers, hooks, utilities) and working up to complex components. This approach:
- Minimizes risk by keeping the codebase functional at all times
- Allows testing at each phase
- Provides immediate value as types are added
- Enables team members to learn TypeScript gradually

---

## Phase 1: Foundation Setup

### 1.1 Configure TypeScript

**Files to Create/Modify:**
- `tsconfig.json` (new)
- `tsconfig.build.json` (new, for build-specific settings)
- `package.json` (update scripts)

**TypeScript Configuration Strategy:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": false,  // Start lenient, tighten later
    "noUnusedParameters": false,  // Start lenient, tighten later
    "allowJs": true,  // Critical for incremental migration
    "checkJs": false,  // Don't check JS files initially
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "dist", "storybook-static"]
}
```

**Key Configuration Decisions:**
- `allowJs: true` - Essential for incremental migration
- `checkJs: false` - Avoid errors in unmigrated JS files
- `strict: true` - Enforce best practices from the start
- `jsx: "react"` - Match current React 17 usage
- `declaration: true` - Auto-generate .d.ts files

### 1.2 Update Build Configuration

**Vite Configuration (`vite.config.js` → `vite.config.ts`):**
```typescript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const devDependencies = Object.keys(pkg.devDependencies);

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ["src/**/*"],
            exclude: ["src/**/*.stories.*", "src/**/*.test.*"],
        }),
    ],
    build: {
        outDir: "build",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "XolaUIKit",
        },
        rollupOptions: {
            external: [...dependencies, ...devDependencies],
        },
    },
});
```

**Required Vite Plugins:**
- `@vitejs/plugin-react` - React support
- `vite-plugin-dts` - Auto-generate TypeScript declarations

### 1.3 Configure Storybook for TypeScript

**Files to Update:**
- `.storybook/main.js` → `.storybook/main.ts`
- `.storybook/preview.js` → `.storybook/preview.tsx`

**Storybook Main Config:**
```typescript
import type { StorybookConfig } from "@storybook/react/types";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    core: {
        disableTelemetry: true,
    },
    addons: [
        "@storybook/addon-postcss",
        "@storybook/addon-links",
        "storybook-css-modules-preset",
        "storybook-addon-designs",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
    ],
    typescript: {
        check: false, // Use tsc separately for type checking
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
                if (prop.parent) {
                    return !prop.parent.fileName.includes("node_modules");
                }
                return true;
            },
        },
    },
};

export default config;
```

### 1.4 Update ESLint Configuration

**Install TypeScript ESLint packages:**
```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**Update ESLint to support TypeScript:**
- Work with @xola/jslint to add TypeScript support OR
- Create local ESLint override for .ts/.tsx files

### 1.5 Update Package Scripts

**package.json script updates:**
```json
{
  "scripts": {
    "prepare": "node scripts/prepare && vite build",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "build": "npm run type-check && npm run prepare && vite build",
    "lint": "xola-lint src --ext .js,.jsx,.ts,.tsx --ignore src/stories",
    "lint:fix": "xola-lint src --ext .js,.jsx,.ts,.tsx --fix --ignore src/stories"
  }
}
```

**Estimated Time**: 1-2 days
**Risk Level**: Medium (configuration issues may arise)
**Testing**: Ensure build and Storybook still work with empty TypeScript support

---

## Phase 2: Create Type Definitions Foundation

### 2.1 Define Common Types and Interfaces

**Create `src/types/index.ts`:**
```typescript
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// Common size types used across components
export type Size = "tiny" | "small" | "medium" | "large" | "huge";

// Common color types used across components
export type Color = "primary" | "secondary" | "success" | "warning" | "caution" | "danger";

// Common variant types
export type Variant = "standard" | "outline" | "link";

// Polymorphic component props helper
export type PolymorphicComponentProps<T extends ElementType, P = {}> = P &
    Omit<ComponentPropsWithoutRef<T>, keyof P> & {
        as?: T;
    };

// Common props shared across components
export interface CommonComponentProps {
    className?: string;
    children?: ReactNode;
}

// Icon props
export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: "tiny" | "small" | "medium" | "large";
    className?: string;
}
```

### 2.2 Create Migration Utility Types

**Create `src/types/migration.ts`:**
```typescript
// Utility type for components still being migrated
export type TODO_MIGRATE = any;

// Use this for complex types during migration
export type FIXME = any;
```

**Estimated Time**: 1 day
**Risk Level**: Low
**Testing**: Types should compile without errors

---

## Phase 3: Migrate Helpers and Utilities (No Components)

### Priority: High | Complexity: Low | Impact: Foundation for other files

### 3.1 Migrate Helper Files

**Files to Migrate** (in order):
1. `src/helpers/avatar.ts` (+ update test file)
2. `src/helpers/browser.ts`
3. `src/helpers/children.ts`
4. `src/helpers/currency.ts`
5. `src/helpers/date.ts`
6. `src/helpers/numbers.ts`
7. `src/helpers/phone.ts`

**Example Migration - numbers.js → numbers.ts:**

Before:
```javascript
export const almostZero = (number) => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};
```

After:
```typescript
export const almostZero = (number: number): boolean => {
    const absAmount = Math.abs(number);
    return absAmount >= 0 && absAmount <= 0.001;
};

export const numberFormat = (
    amount: number,
    currency: string | null = null,
    locale: string = getUserLocale(),
    maximumFractionDigits: number = 2,
    isCompact: boolean = false,
    isNarrowSymbolForm: boolean = false,
): string => {
    // ... implementation
};

export const roundNumber = (currency: string, amount: number): number => {
    // ... implementation
};

export const compactNumber = (value: number, locale: string = getUserLocale()): string => {
    // ... implementation
};
```

**Migration Pattern for Helpers:**
1. Rename `.js` → `.ts`
2. Add parameter types
3. Add return types
4. Update any imports in test files
5. Run `npm run type-check` to verify

**Estimated Time**: 2-3 days
**Risk Level**: Low
**Testing**: Run existing Jest tests, verify type checking passes

### 3.2 Migrate Hook Files

**Files to Migrate:**
1. `src/hooks/useId.ts`
2. `src/hooks/useIsClient.ts`
3. `src/hooks/useViewportHeight.ts`

**Example Migration - useId.js → useId.ts:**

Before:
```javascript
export const useId = (prefix) => {
    const { generateId } = useContext(Context);
    const [id] = useState(() => `${prefix}-${generateId()}`);
    return id;
};
```

After:
```typescript
export const useId = (prefix: string): string => {
    const { generateId } = useContext(Context);
    const [id] = useState(() => `${prefix}-${generateId()}`);
    return id;
};
```

**Estimated Time**: 1 day
**Risk Level**: Low
**Testing**: Type checking + existing usage in components

---

## Phase 4: Migrate Icon Components

### Priority: High | Complexity: Low | Impact: Used everywhere

### 4.1 Migrate Icon Helper

**File: `src/icons/src/helpers/icon.jsx` → `icon.tsx`**

Before:
```javascript
export const createIcon = (Icon) => {
    const IconContainer = ({ size = "small", className, ...rest }) => {
        return <Icon className={clsx(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    IconContainer.propTypes = {
        size: PropTypes.oneOf(Object.keys(iconSizes)),
        className: PropTypes.string,
    };

    return IconContainer;
};
```

After:
```typescript
import { IconProps } from "../../../types";

export const createIcon = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
    const IconContainer = ({ size = "small", className, ...rest }: IconProps) => {
        return <Icon className={clsx(iconSizes[size], "relative -top-0.25 inline-block", className)} {...rest} />;
    };

    return IconContainer;
};
```

### 4.2 Migrate Icon Components (229 files)

**Strategy**: Use a script or find-replace pattern since icons follow the same pattern

**Files**: `src/icons/src/*.jsx` → `*.tsx`

**Migration Pattern:**
1. Rename `.jsx` → `.tsx`
2. Remove PropTypes import
3. Add IconProps type from createIcon helper
4. Verify no custom PropTypes exist

**Script Approach:**
```bash
# Find all icon files
find src/icons/src -name "*.jsx" -type f | while read file; do
    # Rename to .tsx
    mv "$file" "${file%.jsx}.tsx"
done
```

Then manually:
- Remove `import PropTypes from "prop-types";`
- Update createIcon to provide types automatically

**Estimated Time**: 2-3 days (mostly automated)
**Risk Level**: Low (highly repetitive pattern)
**Testing**: Storybook icons page, visual regression with Chromatic

---

## Phase 5: Migrate Simple Components

### Priority: High | Complexity: Low-Medium | Impact: Foundation for complex components

### 5.1 Migrate Atomic Components (No Dependencies)

**Migration Order:**
1. `src/components/Avatar.jsx` → `Avatar.tsx`
2. `src/components/Badge.jsx` → `Badge.tsx`
3. `src/components/Tag.jsx` → `Tag.tsx`
4. `src/components/Logo.jsx` → `Logo.tsx`
5. `src/components/Key.jsx` → `Key.tsx`
6. `src/components/Spinner.jsx` → `Spinner.tsx`
7. `src/components/Skeleton.jsx` → `Skeleton.tsx`
8. `src/components/Counter.jsx` → `Counter.tsx`
9. `src/components/Breadcrumb.jsx` → `Breadcrumb.tsx`
10. `src/components/Breakdown.jsx` → `Breakdown.tsx`

**Example Migration - Avatar.jsx → Avatar.tsx:**

Before:
```javascript
export const Avatar = ({ className, name, color = "bg-primary-lighter", size = "large", ...rest }) => {
    // ... implementation
};

Avatar.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
};
```

After:
```typescript
const sizes = {
    tiny: "h-7 w-7 text-base",
    small: "h-10 w-10 text-base",
    medium: "h-12 w-12 text-md",
    large: "h-15 w-15 text-xl",
} as const;

type AvatarSize = keyof typeof sizes;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    name?: string;
    color?: string;
    size?: AvatarSize;
}

export const Avatar = ({ className, name, color = "bg-primary-lighter", size = "large", ...rest }: AvatarProps) => {
    // ... implementation
};
```

**Migration Checklist per Component:**
- [ ] Create interface for props
- [ ] Define const objects with `as const` for type inference
- [ ] Extract union types from const objects (e.g., `keyof typeof sizes`)
- [ ] Replace PropTypes with TypeScript interface
- [ ] Remove PropTypes import
- [ ] Remove defaultProps (use default parameters instead)
- [ ] Update any JSDoc comments to TSDoc format
- [ ] Test component in Storybook

**Estimated Time**: 5-7 days
**Risk Level**: Medium
**Testing**: Each component's Storybook story

---

## Phase 6: Migrate Form Components

### Priority: High | Complexity: Medium | Impact: Critical UI components

### 6.1 Migrate Base Form Components

**Migration Order:**
1. `src/components/Forms/Label.jsx` → `Label.tsx`
2. `src/components/Forms/BaseInput.jsx` → `BaseInput.tsx` (uses forwardRef)
3. `src/components/Forms/Input.jsx` → `Input.tsx` (depends on BaseInput)
4. `src/components/Forms/Textarea.jsx` → `Textarea.tsx` (depends on BaseInput)
5. `src/components/Forms/FormGroup.jsx` → `FormGroup.tsx`

**Example Migration - BaseInput with forwardRef:**

Before:
```javascript
export const BaseInput = forwardRef(
    ({ as: Tag, size = "medium", isError, className, isRequired, value, prefix, suffix, ...rest }, ref) => {
        // ... implementation
    }
);

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
    isRequired: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
};

BaseInput.defaultProps = {
    as: "input",
    size: "medium",
    className: "",
    isError: false,
    isRequired: false,
};
```

After:
```typescript
import { forwardRef, ElementType, ComponentPropsWithoutRef } from "react";
import { PolymorphicComponentProps } from "../../types";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm",
    medium: "px-3 py-2.5 text-base leading-base",
    large: "px-5 py-3.5 text-md leading-md",
} as const;

type BaseInputSize = keyof typeof sizes;

interface BaseInputOwnProps {
    size?: BaseInputSize;
    isError?: boolean;
    isRequired?: boolean;
    value?: string | number;
    prefix?: string;
    suffix?: string;
}

export type BaseInputProps<T extends ElementType = "input"> = PolymorphicComponentProps<T, BaseInputOwnProps>;

export const BaseInput = forwardRef(
    <T extends ElementType = "input">(
        {
            as,
            size = "medium",
            isError = false,
            className,
            isRequired = false,
            value,
            prefix,
            suffix,
            ...rest
        }: BaseInputProps<T>,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const Tag = as || "input";
        // ... implementation
    }
) as <T extends ElementType = "input">(
    props: BaseInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
```

### 6.2 Migrate Complex Form Components

**Files:**
1. `src/components/Forms/Checkbox.jsx` → `Checkbox.tsx`
2. `src/components/Forms/Switch.jsx` → `Switch.tsx`
3. `src/components/Forms/Select.jsx` → `Select.tsx`
4. `src/components/Forms/ComboBox.jsx` → `ComboBox.tsx`
5. `src/components/Forms/RangeSlider.jsx` → `RangeSlider.tsx`
6. `src/components/Forms/InlineValuePopover.jsx` → `InlineValuePopover.tsx`
7. `src/components/Forms/ValuePopoverText.jsx` → `ValuePopoverText.tsx`

**Special Considerations:**
- ComboBox uses Downshift library - ensure types are imported
- Select uses react-select - import types from '@types/react-select'
- RangeSlider uses nouislider-react - may need custom type declarations

**Estimated Time**: 7-10 days
**Risk Level**: Medium-High (complex components with third-party dependencies)
**Testing**: Full form testing in Storybook, manual interaction testing

---

## Phase 7: Migrate Button Components

### Priority: High | Complexity: Medium | Impact: Most used component

**Files:**
1. `src/components/Buttons/Button.jsx` → `Button.tsx`
2. `src/components/Buttons/SubmitButton.jsx` → `SubmitButton.tsx`
3. `src/components/Buttons/ToggleButton.jsx` → `ToggleButton.tsx`
4. `src/components/Buttons/ButtonGroup.jsx` → `ButtonGroup.tsx`

**Example Migration - Button with Custom Validator:**

Before:
```javascript
Button.propTypes = {
    color: PropTypes.oneOf(Object.keys(colors.outline)),
    variant: PropTypes.oneOf(Object.keys(colors)),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    icon(props, ...rest) {
        if (props.icon && !props.children) {
            return new Error("You are using an icon without specifying children...");
        }
        return PropTypes.element(props, ...rest);
    },
    iconPlacement: PropTypes.string,
};
```

After:
```typescript
const colors = {
    standard: { /* ... */ },
    outline: { /* ... */ },
    link: { /* ... */ },
} as const;

const sizes = {
    tiny: "px-2 py-0.5 text-xs leading-xs",
    small: "px-3 py-2 h-7.5 text-sm leading-sm",
    medium: "px-4.5 py-3 h-10 text-base leading-base",
    large: "px-6 py-4 h-[50px] text-md leading-md",
} as const;

type ButtonVariant = keyof typeof colors;
type ButtonColor = keyof typeof colors.outline;
type ButtonSize = keyof typeof sizes;

export interface ButtonProps<T extends ElementType = "button"> {
    as?: T;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    icon?: React.ReactElement;
    iconPlacement?: "left" | "right";
    className?: string;
    children: React.ReactNode; // Required - enforced by TypeScript
}

export const Button = <T extends ElementType = "button">({
    as,
    variant = "standard",
    color = "primary",
    size = "medium",
    icon,
    iconPlacement = "left",
    className,
    children,
    ...rest
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
    const Tag = (as || "button") as ElementType;

    // Runtime validation if icon is present without children
    if (process.env.NODE_ENV !== "production") {
        if (icon && !children) {
            console.error("UI Kit: You are using an icon without specifying children...");
        }
    }

    return (
        <Tag
            className={clsx(
                "ui-button",
                // ... classes
            )}
            {...rest}
        >
            {/* ... */}
        </Tag>
    );
};
```

**Estimated Time**: 3-4 days
**Risk Level**: Medium
**Testing**: Extensive Storybook stories testing all variants

---

## Phase 8: Migrate Complex Components with Compound Patterns

### Priority: Medium | Complexity: High | Impact: Complex but isolated

### 8.1 Migrate Modal Component

**Files:**
- `src/components/Modal.jsx` → `Modal.tsx`

**Compound Component Pattern in TypeScript:**

```typescript
const sizes = { /* ... */ } as const;
const positions = { /* ... */ } as const;

type ModalSize = keyof typeof sizes;
type ModalPosition = keyof typeof positions;

export interface ModalProps {
    size?: ModalSize;
    position?: ModalPosition;
    isOpen: boolean;
    shouldCloseOnOutsideClick?: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Modal = ({ /* ... */ }: ModalProps) => {
    // ... implementation
};

// Subcomponents
interface ModalHeaderProps {
    children: React.ReactNode;
    description?: string;
    className?: string;
}

const Header = ({ children, description, className, ...rest }: ModalHeaderProps) => {
    // ... implementation
};

Header.displayName = "Modal.Header";

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const Body = ({ className, ...rest }: ModalBodyProps) => {
    // ... implementation
};

Body.displayName = "Modal.Body";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = ({ className, ...rest }: ModalFooterProps) => {
    // ... implementation
};

Footer.displayName = "Modal.Footer";

// Attach subcomponents
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

// Export with proper typing
export type { ModalHeaderProps, ModalBodyProps, ModalFooterProps };
```

### 8.2 Migrate Tab Components

**Files:**
- `src/components/Tabs/Tabs.jsx` → `Tabs.tsx`
- `src/components/Tabs/Tabs.Tab.jsx` → `Tabs.Tab.tsx`
- `src/components/Tabs/Tabs.Panel.jsx` → `Tabs.Panel.tsx`
- `src/components/Tabs/index.js` → `index.ts`

### 8.3 Migrate Sidebar Components

**Files:**
- `src/components/Sidebar/Sidebar.jsx` → `Sidebar.tsx`
- `src/components/Sidebar/Sidebar.Account.jsx` → `Sidebar.Account.tsx`
- `src/components/Sidebar/Sidebar.Button.jsx` → `Sidebar.Button.tsx`
- `src/components/Sidebar/Sidebar.Footer.jsx` → `Sidebar.Footer.tsx`
- `src/components/Sidebar/Sidebar.Heading.jsx` → `Sidebar.Heading.tsx`
- `src/components/Sidebar/Sidebar.Link.jsx` → `Sidebar.Link.tsx`
- `src/components/Sidebar/Sidebar.Menu.jsx` → `Sidebar.Menu.tsx`
- `src/components/Sidebar/index.js` → `index.ts`

### 8.4 Migrate Other Complex Components

**Files:**
1. `src/components/Popover/` (directory)
2. `src/components/DatePicker/` (directory)
3. `src/components/Dot/` (directory)
4. `src/components/Table.jsx` → `Table.tsx`
5. `src/components/Tooltip.jsx` → `Tooltip.tsx`
6. `src/components/Drawer.jsx` → `Drawer.tsx`
7. `src/components/Alert.jsx` → `Alert.tsx`

**Estimated Time**: 10-14 days
**Risk Level**: High (complex component logic)
**Testing**: Comprehensive Storybook testing, interaction testing, visual regression

---

## Phase 9: Migrate Remaining Components

### Priority: Medium | Complexity: Medium | Impact: Completion

**Files:**
1. `src/components/Animation/` (FadeIn, SlideDown)
2. `src/components/Charts/` (Chart options)
3. `src/components/Search.jsx` → `Search.tsx`
4. `src/components/HeaderToolbar.jsx` → `HeaderToolbar.tsx`
5. `src/components/GooglePlacesAutocomplete.jsx` → `GooglePlacesAutocomplete.tsx`
6. `src/components/ImageUpload.jsx` → `ImageUpload.tsx`
7. `src/components/Screens/Login.jsx` → `Login.tsx`
8. `src/components/Utilities/` (Currency, Phone, Number)

**Estimated Time**: 5-7 days
**Risk Level**: Medium
**Testing**: Individual Storybook stories

---

## Phase 10: Migrate Stories to TypeScript

### Priority: Low | Complexity: Low | Impact: Better dev experience

**Strategy:**
- Migrate stories incrementally as components are migrated
- Use TypeScript story format with typed args

**Example Migration:**

Before (Button.stories.js):
```javascript
const ButtonStories = {
    title: "Forms & Fields/Buttons/Button",
    component: Button,
    args: {
        as: "button",
        size: "medium",
    },
    argTypes: {
        size: {
            options: ["tiny", "small", "medium", "large"],
            control: { type: "select" },
        },
    },
};

export default ButtonStories;

export const Default = (props) => <Button {...props}>Default</Button>;
```

After (Button.stories.tsx):
```typescript
import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "../..";

const meta: Meta<typeof Button> = {
    title: "Forms & Fields/Buttons/Button",
    component: Button,
    args: {
        as: "button",
        size: "medium",
    },
    argTypes: {
        size: {
            options: ["tiny", "small", "medium", "large"],
            control: { type: "select" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Default",
    },
};

export const Colors: Story = {
    render: () => (
        <div className="space-x-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            {/* ... */}
        </div>
    ),
};
```

**Estimated Time**: 5-7 days (can be done in parallel with components)
**Risk Level**: Low
**Testing**: Storybook should render correctly

---

## Phase 11: Update Entry Points and Exports

### Priority: High | Complexity: Medium | Impact: Package consumers

### 11.1 Update Main Entry Point

**File: `src/index.js` → `src/index.ts`**

Before:
```javascript
// Components
export { FadeIn } from "./components/Animation/FadeIn";
export { SlideDown } from "./components/Animation/SlideDown";
export { Button } from "./components/Buttons/Button";
// ... 70+ more exports
```

After:
```typescript
// Components
export { FadeIn } from "./components/Animation/FadeIn";
export { SlideDown } from "./components/Animation/SlideDown";
export { Button } from "./components/Buttons/Button";
export type { ButtonProps } from "./components/Buttons/Button";
// ... export types for all components

// Export common types
export type { Size, Color, Variant } from "./types";
```

### 11.2 Update Package Exports

**File: `package.json`**

Before:
```json
{
  "main": "build/ui-kit.umd.js",
  "module": "build/ui-kit.mjs",
  "types": "index.d.ts"
}
```

After:
```json
{
  "main": "build/ui-kit.umd.js",
  "module": "build/ui-kit.mjs",
  "types": "build/index.d.ts",
  "exports": {
    ".": {
      "import": "./build/ui-kit.mjs",
      "require": "./build/ui-kit.umd.js",
      "types": "./build/index.d.ts"
    },
    "./package.json": "./package.json"
  }
}
```

### 11.3 Remove PropTypes Dependency

**After all components are migrated:**

```bash
npm uninstall prop-types
```

Update package.json to remove prop-types from dependencies.

**Estimated Time**: 2-3 days
**Risk Level**: High (breaks if types are incorrect)
**Testing**: Build package, test in consuming applications

---

## Phase 12: Cleanup and Optimization

### Priority: Medium | Complexity: Low | Impact: Code quality

### 12.1 Enable Stricter TypeScript Settings

**Update tsconfig.json:**
```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": false,  // No more JS files
  }
}
```

### 12.2 Add Type Documentation

**Create `docs/TYPESCRIPT.md`:**
- Document common type patterns
- Explain polymorphic component pattern
- Provide migration examples for consumers

### 12.3 Update CI/CD Pipeline

**Update `.github/workflows/` files:**
```yaml
- name: Type Check
  run: npm run type-check

- name: Build
  run: npm run build
```

### 12.4 Audit and Fix Type Issues

- Run `npm run type-check` to find any remaining `any` types
- Replace TODO_MIGRATE and FIXME types with proper types
- Add JSDoc/TSDoc comments for complex types

**Estimated Time**: 3-5 days
**Risk Level**: Low
**Testing**: Full CI/CD pipeline run

---

## Testing Strategy

### Per-Phase Testing

After each phase:
1. **Type Checking**: Run `npm run type-check` - must pass with no errors
2. **Build**: Run `npm run build` - must successfully build
3. **Storybook**: Run `npm run storybook` - all stories must render
4. **Visual Regression**: Run Chromatic to detect visual changes
5. **Unit Tests**: Run `npm test` - all tests must pass
6. **Integration**: Test in a consuming application

### Final Testing Checklist

Before considering migration complete:
- [ ] All TypeScript errors resolved
- [ ] Build produces valid UMD and ESM bundles
- [ ] Type declarations (.d.ts) are generated correctly
- [ ] Storybook renders all components
- [ ] All Jest tests pass
- [ ] Chromatic visual regression tests pass
- [ ] Package installs correctly in test project
- [ ] Type inference works in consuming applications
- [ ] No PropTypes references remain in codebase
- [ ] Documentation updated
- [ ] CI/CD pipeline passes

---

## Risk Mitigation

### High-Risk Areas

1. **forwardRef Components**
   - **Risk**: Complex TypeScript patterns for forwardRef with generic types
   - **Mitigation**: Test thoroughly, use proven patterns from @types/react examples

2. **Third-Party Library Types**
   - **Risk**: Missing or incompatible type definitions
   - **Mitigation**: Install @types packages, create custom declarations if needed

3. **Polymorphic Components (as prop)**
   - **Risk**: Complex generic types that are hard to get right
   - **Mitigation**: Use proven utility types, test with multiple element types

4. **Breaking Changes for Consumers**
   - **Risk**: Type changes break existing consumer code
   - **Mitigation**: Semantic versioning, deprecation warnings, migration guide

5. **Build Configuration**
   - **Risk**: Vite or Storybook config issues with TypeScript
   - **Mitigation**: Test early, follow official docs, use community plugins

### Rollback Strategy

If critical issues arise:
1. Each phase is self-contained
2. Git branches for each major phase
3. Can rollback to previous phase
4. Can keep JS files alongside TS during migration (`allowJs: true`)

---

## Timeline Estimate

| Phase | Description | Estimated Time | Dependencies |
|-------|-------------|----------------|--------------|
| 1 | Foundation Setup | 1-2 days | None |
| 2 | Type Definitions | 1 day | Phase 1 |
| 3 | Helpers & Utilities | 2-3 days | Phase 2 |
| 4 | Icon Components | 2-3 days | Phase 2 |
| 5 | Simple Components | 5-7 days | Phase 2, 3 |
| 6 | Form Components | 7-10 days | Phase 5 |
| 7 | Button Components | 3-4 days | Phase 2 |
| 8 | Complex Compound Components | 10-14 days | Phase 5, 6, 7 |
| 9 | Remaining Components | 5-7 days | Phase 8 |
| 10 | Stories Migration | 5-7 days | Parallel with 5-9 |
| 11 | Entry Points & Exports | 2-3 days | All previous |
| 12 | Cleanup & Optimization | 3-5 days | Phase 11 |

**Total Estimated Time: 46-66 days (9-13 weeks)**

**Note**: This is for full-time work on migration. Adjust based on:
- Team size
- Part-time availability
- Learning curve for TypeScript
- Other project priorities

---

## Resource Requirements

### Team Skills Needed
- Strong TypeScript knowledge
- React 17 experience
- Understanding of generic types and utility types
- Experience with Vite and Storybook
- Understanding of npm package publishing

### Tools Required
- Node.js v16
- TypeScript 4.9+
- Vite with TypeScript support
- Storybook 6 with TypeScript support
- ESLint with TypeScript parser

### Documentation Resources
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
- Vite TypeScript Guide: https://vitejs.dev/guide/features.html#typescript
- Storybook TypeScript: https://storybook.js.org/docs/react/configure/typescript

---

## Post-Migration Benefits

### For Developers
- Type safety and autocomplete in IDEs
- Catch errors at compile time
- Better refactoring support
- Self-documenting code through types
- Improved developer experience

### For Consumers
- Full TypeScript support
- Autocomplete for all props
- Type checking in consuming applications
- Better documentation through types
- Reduced runtime errors

### For Maintenance
- Easier to onboard new developers
- Reduced bugs from type mismatches
- Better tooling support
- Safer refactoring
- Living documentation

---

## Success Criteria

The migration will be considered successful when:

1. ✅ All source files migrated from .js/.jsx to .ts/.tsx
2. ✅ Zero TypeScript errors with strict mode enabled
3. ✅ PropTypes package completely removed
4. ✅ All Storybook stories work correctly
5. ✅ Build produces valid type declarations
6. ✅ All tests pass (Jest + Chromatic)
7. ✅ Package successfully consumed in test project with full types
8. ✅ CI/CD pipeline includes type checking
9. ✅ Documentation updated
10. ✅ No breaking changes for consumers (or clearly documented)

---

## Alternative Approaches Considered

### Approach 1: Big Bang Migration
**Description**: Convert everything at once
**Pros**: Faster completion, no mixed codebase
**Cons**: High risk, difficult to test, blocks development
**Decision**: Rejected - too risky for large codebase

### Approach 2: Parallel Codebase
**Description**: Maintain JS and TS versions separately
**Pros**: No disruption to existing code
**Cons**: Double maintenance, confusing for developers
**Decision**: Rejected - not sustainable

### Approach 3: Top-Down (Components First)
**Description**: Start with high-level components
**Pros**: Visible progress quickly
**Cons**: Dependency issues, helpers need migration first
**Decision**: Rejected - creates dependency problems

### Chosen Approach: Bottom-Up Incremental
**Description**: Start with helpers, work up to complex components
**Pros**: Low risk, testable at each step, maintains working codebase
**Cons**: Slower visible progress
**Decision**: Selected - best balance of risk and progress

---

## Appendix A: PropTypes to TypeScript Mapping Reference

| PropTypes | TypeScript | Notes |
|-----------|------------|-------|
| `PropTypes.string` | `string` | Direct mapping |
| `PropTypes.number` | `number` | Direct mapping |
| `PropTypes.bool` | `boolean` | Direct mapping |
| `PropTypes.func` | `() => void` or specific function signature | Be specific |
| `PropTypes.node` | `React.ReactNode` | Includes elements, strings, numbers, etc. |
| `PropTypes.element` | `React.ReactElement` | Only React elements |
| `PropTypes.array` | `any[]` or `T[]` | Use specific array types |
| `PropTypes.object` | `object` or specific interface | Define proper interfaces |
| `PropTypes.oneOf(['a', 'b'])` | `'a' \| 'b'` | Union of literals |
| `PropTypes.oneOfType([...])` | `T \| U` | Union types |
| `PropTypes.arrayOf(PropTypes.string)` | `string[]` | Typed arrays |
| `PropTypes.shape({...})` | `interface {...}` | Define interface |
| `PropTypes.any` | `any` | Avoid when possible |
| `.isRequired` | Remove `?` from property | Required by default |
| Optional prop | `prop?: Type` | Use `?` for optional |

---

## Appendix B: Common TypeScript Patterns for This Codebase

### Pattern 1: Size/Color Enums from Objects
```typescript
const sizes = {
    small: "...",
    medium: "...",
    large: "...",
} as const;

type Size = keyof typeof sizes;
```

### Pattern 2: Extending HTML Element Props
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    // ... other custom props
}
```

### Pattern 3: Polymorphic Components
```typescript
type PolymorphicComponentProps<T extends ElementType, P = {}> = P &
    Omit<ComponentPropsWithoutRef<T>, keyof P> & {
        as?: T;
    };

interface ButtonOwnProps {
    variant?: "primary" | "secondary";
}

type ButtonProps<T extends ElementType = "button"> =
    PolymorphicComponentProps<T, ButtonOwnProps>;
```

### Pattern 4: ForwardRef Components
```typescript
interface InputProps {
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, ...rest }, ref) => {
        return <input ref={ref} value={value} onChange={onChange} {...rest} />;
    }
);
```

### Pattern 5: Compound Components
```typescript
export const Modal = (props: ModalProps) => { /* ... */ };

interface ModalHeaderProps { /* ... */ }
const Header = (props: ModalHeaderProps) => { /* ... */ };
Header.displayName = "Modal.Header";

Modal.Header = Header;

// Export types
export type { ModalProps, ModalHeaderProps };
```

---

## Appendix C: Common Pitfalls and Solutions

### Pitfall 1: defaultProps with TypeScript
**Problem**: defaultProps is deprecated in React with TypeScript
**Solution**: Use default parameter values
```typescript
// ❌ Don't
Component.defaultProps = { size: "medium" };

// ✅ Do
const Component = ({ size = "medium" }: Props) => { /* ... */ };
```

### Pitfall 2: Spreading Props with TypeScript
**Problem**: Type errors when spreading props
**Solution**: Use proper rest/spread with TypeScript
```typescript
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    custom?: string;
}

const Component = ({ custom, ...rest }: Props) => {
    return <div {...rest} />;
};
```

### Pitfall 3: Event Handlers
**Problem**: Event type errors
**Solution**: Use specific React event types
```typescript
// ✅ Correct
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ...
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ...
};
```

### Pitfall 4: Children Type
**Problem**: Children prop type confusion
**Solution**: Use React.ReactNode for most cases
```typescript
interface Props {
    children: React.ReactNode;  // Most flexible
    // or
    children: React.ReactElement;  // Only React elements
    // or
    children: string;  // Only strings
}
```

### Pitfall 5: Generic Components
**Problem**: Losing type inference with generics
**Solution**: Use proper generic constraints
```typescript
// ✅ Maintains type inference
function Component<T extends string | number>(props: { value: T }) {
    return <div>{props.value}</div>;
}
```

---

## Questions for Clarification

Before beginning implementation, please clarify:

1. **Timeline Flexibility**: Is the 9-13 week estimate acceptable, or is there a hard deadline?

2. **Team Resources**: How many developers will work on this migration? Full-time or part-time?

3. **Breaking Changes**: Are we targeting a major version bump (v3.0.0) that allows breaking changes?

4. **Consumer Applications**: Which applications currently consume this package? Can we coordinate migration timing with them?

5. **TypeScript Version**: Should we upgrade from TypeScript 4.9.5 to 5.x during this migration?

6. **React Version**: Will we upgrade to React 18 during or after this migration?

7. **Testing Priority**: How important is maintaining 100% backward compatibility vs. accepting some breaking changes for better types?

8. **Storybook**: Should we also upgrade Storybook from v6 to v7/v8 as part of this effort?

9. **Documentation**: How much TypeScript-specific documentation do you want?

10. **Migration of Consumers**: Should this plan include guidance for applications that consume this package?

---

## Conclusion

This migration plan provides a comprehensive, phased approach to converting the Xola UI Kit from PropTypes to TypeScript. The bottom-up strategy minimizes risk while providing continuous value at each phase. With proper execution and testing, this migration will result in a more maintainable, type-safe, and developer-friendly component library.

The estimated 9-13 weeks accounts for thorough testing and quality assurance at each phase. However, the incremental nature of this plan allows for adjustments based on team capacity and project priorities.

Next steps:
1. Review and approve this plan
2. Answer clarification questions
3. Set up initial TypeScript configuration (Phase 1)
4. Begin migration with helpers and utilities (Phase 3)
