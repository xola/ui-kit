# AGENTS.md

## Project Overview

Xola UI Kit is a React 18-based component library for Xola products, published as `@xola/ui-kit` and `@xola/icons`. It provides a comprehensive set of UI components, icons, and utilities, built with Vite and Storybook. The codebase has been migrated from PropTypes to TypeScript for improved type safety and developer experience.

- **Tech Stack:** React 18, Vite, Storybook, TypeScript, ESLint
- **Build Outputs:** ESM format
- **Testing:** Vitest, Chromatic, Storybook

## Setup Commands

- Install dependencies:
  ```zsh
  npm install
  ```
- Start development server:
  ```zsh
  npm run storybook
  ```
- Type checking:
  ```zsh
  npm run type-check
  ```
- Linting:
  ```zsh
  npm run lint
  ```
- Build:
  ```zsh
  npm run build
  ```
- Hot reload/watch mode is enabled by default in Vite (`npm run dev`).
- Run all tests:
  ```zsh
  npm test
  npm run type-check
  ```
- Visual regression:
  - Use Vitest coverage tools if configured
- Storybook stories are in `src/stories/` and alongside components

  - Hooks: `src/hooks/`
  - Types: `src/types/`
- **Naming conventions:**
  - Components: PascalCase
  - Files: match component name
  - Types: PascalCase
- **Import/export:** Prefer named exports; export types alongside components

## Build and Deployment

- Build command:
  ```zsh
  npm run build
  ```
- Output directory: `build/`
- Type declarations: `build/index.d.ts`
- Package exports configured in `package.json`
- CI/CD: GitHub Actions (type check, lint, build)

## Pull Request Guidelines

- Title format: `[component] Brief description`
- Required checks: `npm run lint`, `npm run type-check`, `npm test`
- Review: At least one approval required
- Commit message: Use clear, descriptive messages

## Security Considerations

- No secrets or sensitive data in repo
- Use npm for dependency management
- Audit dependencies regularly

## Debugging and Troubleshooting

- Common issues:
  - TypeScript errors: run `npm run type-check`
  - Build errors: check Vite config and dependencies
  - Storybook issues: check `.storybook/` config
- Logging: Use browser console for runtime errors

## Monorepo Instructions

- Not a monorepo, but icons are published as a separate package
- If splitting further, add AGENTS.md to subprojects

## Additional Notes

- Follow incremental migration strategy: helpers → hooks → icons → components → stories
- Update documentation in `docs/` as needed

## TypeScript Migration Patterns

### Interface and Type Patterns

1. **Component Props Pattern:**
   ```typescript
   export interface ComponentProps extends Omit<React.HTMLAttributes<HTMLElement>, "conflictingProp"> {
       size?: "small" | "medium" | "large";
       variant?: "primary" | "secondary";
       children: React.ReactNode;
       className?: string;
   }
   ```

2. **Enum-like Types:**
   ```typescript
   const sizes = {
       small: "px-2 py-1",
       medium: "px-4 py-2",
       large: "px-6 py-3",
   } as const;

   type ComponentSize = keyof typeof sizes;
   ```

3. **ForwardRef Components:**
   ```typescript
   export const Component = forwardRef<HTMLInputElement, ComponentProps>(
       ({ prop1, prop2, ...rest }, ref) => {
           // implementation
       }
   );
   ```

4. **Generic Components:**
   ```typescript
   export interface SearchProps<T = any> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
       items?: T[];
       onChange?: (value: string) => void;
       onSelect?: (item: T) => void;
   }

   export const Search = <T = any>({ ... }: SearchProps<T>) => { ... };
   ```

5. **Compound Components:**
   ```typescript
   export const Modal = ({ ... }: ModalProps) => { ... };

   const Header = ({ ... }: ModalHeaderProps) => { ... };
   Header.displayName = "Modal.Header";

   Modal.Header = Header;
   Modal.Body = Body;
   Modal.Footer = Footer;
   ```

### Common Fixes

1. **Prop Conflicts:** When extending HTML element props, use `Omit<>` to exclude conflicting props:
   - `onChange` conflicts with InputHTMLAttributes
   - `onError` conflicts with InputHTMLAttributes
   - `onSubmit` conflicts with FormEventHandler

2. **Nullish Coalescing:** Always use `??` instead of `||` for safer default values (lint rule)

3. **Member Ordering:** Index signatures must come first in interfaces:
   ```typescript
   export interface Props {
       [key: string]: any;  // Must be first
       name?: string;
       value?: number;
   }
   ```

4. **Type Assertions:** Minimize use; when necessary, disable lint rule inline:
   ```typescript
   // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
   const item = { value: inputValue } as T;
   ```

5. **Optional Parameters:** Use optional chaining and nullish coalescing:
   ```typescript
   inputReference.current?.click();
   const value = props.value ?? defaultValue;
   ```

### Helper Function Signatures

- `numberFormat(amount, currency, locale, maxDigits, compact, isNarrowSymbolForm)`
- `getSymbol(currency, locale, amount, isNarrowSymbolForm)`
- `roundNumber(currency, amount)`
- `formatPhoneNumber(number, countryCode)`
- `getRegionCode(number, countryCode)`

### Import Patterns

- Prefer named imports: `import { getUserLocale } from "get-user-locale"`
- Export types alongside components: `export type { ComponentProps }`

## Success Criteria

- All source files migrated to TypeScript
- Zero TypeScript errors with strict mode
- PropTypes removed
- Storybook and build work
- All tests pass
- Type declarations generated
- CI/CD pipeline passes
- Documentation updated

## Code Style Guidelines

- **Language:** TypeScript
- **Linting:** ESLint with @typescript-eslint
- **Formatting:** Prettier
- **File organization:**
  - Components: `src/components/`
  - Helpers: `src/helpers/`
  - Hooks: `src/hooks/`
  - Icons: `src/icons/`
  - Types: `src/types/`
- **Naming conventions:**
  - Components: PascalCase
  - Files: match component name
  - Types: PascalCase
- **Import/export:** Prefer named exports; export types alongside components

## Agent Coding and Review Guidelines (from .github/copilot-instructions.md)

- Apply general coding guidelines and prefer immutable data (`const`, `readonly`).
- Use `useMount` from `ahooks` instead of `useEffect([])`.
- Use `useModal` for modal state management.
- Highlight browser compatibility or performance issues and suggest solutions.
- Review for memory leaks and garbage collection issues, especially with hooks. Ensure cleanup in `useEffect` (event listeners, timers, subscriptions), and avoid unclosed intervals/timeouts and circular references.
- Always check for missing or incorrect TypeScript types.
- Ensure Tailwind CSS classes follow best practices; replace custom CSS with Tailwind where possible.
- Validate component/file organization for clarity.
- Do not use `props: any`; always destructure and type all props.
- Simplify `useEffect` dependencies by extracting complex conditions outside the effect.
- Disallow functions declared in a scope capturing less than 3 variables from the outer scope (unless outside a React component).

### High Confidence Rules
3. Strictly follow React hooks rules.
4. Do not use React.FC type; always create a props interface.
7. Never suppress `react-hooks/exhaustive-deps` ESLint rule.
8. Tag `@rushi` in PR if any `.github` or ESLint config files are changed.
9. Do not allow more than 5 levels of indenting in a React component's JSX.
10. Minimize use of `useEffect` and `useState`; favor derived state and memoization.

### Other Review Points
- Confirm React Hooks are used correctly and avoid anti-patterns.
- Validate Tailwind usage and avoid deprecated patterns.
- Reference `.github/copilot-instructions.md` and line number in review comments if you use any of these instructions.
- Only summarize the pull request the first time Copilot is invoked; subsequent reviews should only summarize changes since the last review.
- Do not give feedback on accessibility.

---

This file is symlinked as `CLAUDE.md` for compatibility with agent tools.
