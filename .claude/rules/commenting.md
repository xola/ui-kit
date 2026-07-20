---
paths:
  - "**"
---

# Self-Explanatory Code Commenting Guidelines

## Core Principle

**Write code that speaks for itself. Comment only when necessary to explain WHY, not WHAT.**

Exceptions where comments add value:

- Complex Tailwind class combinations where the reasoning behind a value matters (e.g. a magic
  pixel value chosen to match a design spec).
- Non-obvious `prop-types` validators (custom validation functions): explain what invalid state
  they're guarding against.
- Workarounds for a specific bug or third-party library quirk (`react-day-picker`, `downshift`,
  `tippy.js`, `nouislider-react`).
- Non-obvious invariants or constraints a future reader could easily break.

## Avoid These Comment Types

### Obvious comments

```jsx
let itemCount = 0; // Initialize counter to zero
itemCount++; // Increment counter by one
```

### Redundant comments

```jsx
const getLabel = (item) => {
    return item.label; // Return the item's label
};
```

### Obvious JSX comments

```jsx
return (
    <div>
        {/* Render the button */}
        <button onClick={handleClick}>Submit</button>
    </div>
);
```

### Dead code comments

```jsx
// Don't comment out code; use git history instead
// const oldRenderIcon = () => { ... };
```

### Changelog / caller / ticket comments

```jsx
// Don't maintain history or reference the current task in comments; use git history and the PR
// description instead
// Added for X2-1234
```

### Divider comments

```jsx
//=====================================
// UTILITY FUNCTIONS
//=====================================
```

## Write These Comment Types

### Non-obvious prop-types validation

```jsx
icon(props, ...rest) {
    // Icon without children silently renders a button with no visible label, so fail loudly
    // instead of shipping an inaccessible control.
    if (props.icon && !props.children) {
        return new Error("UI Kit: icon requires children");
    }

    return PropTypes.element(props, ...rest);
},
```

### Third-party library gotchas

```jsx
// react-day-picker fires onDayClick even for disabled days, so guard explicitly
if (modifiers.disabled) {
    return;
}
```

### Non-obvious hook dependencies

```jsx
// Include seller.id: the same experienceId can resolve to different data per seller
useEffect(() => {
    fetchExperience(experienceId, seller.id);
}, [experienceId, seller.id]);
```

### Performance trade-offs

```jsx
// Memoized: this list re-renders on every keystroke in the parent search input
const filteredOptions = useMemo(() => filterOptions(options, query), [options, query]);
```

## Annotation Format

Use these prefixes for work-in-progress notes:

```
// TODO: Replace with the shared Popover primitive once it supports controlled mode
// FIXME: Focus trap doesn't restore focus on close in Safari
// HACK: Workaround for a tippy.js v6 positioning bug; remove after upgrade
// NOTE: This assumes a single scrollable ancestor
// PERF: Consider virtualizing this list if item counts grow beyond ~200
```

## Public APIs and Shared Utilities

JSDoc is appropriate for shared helpers used across many components:

```jsx
/**
 * Get initials from a full name for avatar fallbacks.
 *
 * @param {string} name - Full display name
 * @returns {string} Up to two uppercase initials, or "N/A" if name is empty
 */
export const getInitials = (name) => {
    // ... implementation
};
```

## Decision Framework

Before writing a comment, ask:

1. Is the code self-explanatory? → No comment needed
2. Would a better variable/function name eliminate the need? → Refactor instead
3. Does this explain WHY, not WHAT? → Good comment
4. Will this help future maintainers? → Good comment

**The best comment is the one you don't need to write because the code is self-documenting.**
