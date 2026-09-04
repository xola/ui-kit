# CLAUDE.md

## Overview

`@xola/icons` is Xola's icon set, published from this directory as its own npm package. It is
TypeScript, independent of the parent `@xola/ui-kit` build: no bundler runs here. `package.json`
points `main` and `types` at `index.ts`, so consumers compile the raw source and `npm publish`
ships `index.ts` plus `src/`.

Every icon is a `.tsx` file under `src/`, one component per file, re-exported by hand from
`index.ts`. Payment, logo, and tutorial icons live in subdirectories (`src/BNPL/`,
`src/CreditCards/`, `src/Logos/`, `src/MobileStore/`, `src/Tutorials/`, `src/images/`).

## Commands

Run these from `src/icons/`, not the repo root.

```sh
npm run typecheck   # tsc --noEmit, strict
npm run lint        # ESLint on .ts/.tsx, auto-fix
npm run format      # Prettier --write on src
```

There is no build or test command. `typecheck` and `lint` are the full local gate, and
`.github/workflows/icons.yml` runs both in CI.

## Adding an icon

1. Create `src/<Name>Icon.tsx`, matching the export name to the filename.
2. Wrap the SVG in `createIcon` from `./helpers/icon`.
3. Spread `{...props}` onto the `<svg>` last, so a caller's `className` and size survive.
4. Add `<Name>Icon.tags = [...]` when the icon has searchable synonyms. The Storybook icon browser
   filters on name and tags.
5. Export it from `index.ts`, alphabetically within its group.

```tsx
import React from "react";
import { createIcon } from "./helpers/icon";

export const UserIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path d="..." stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

UserIcon.tags = ["adult", "demographic"];
```

## Key Rules

### SVG markup

- UI icons use `stroke="currentColor"` or `fill="currentColor"` on the paths, so they inherit text
  color from the caller. Brand marks under `src/Logos/`, `src/CreditCards/`, `src/BNPL/`,
  `src/MobileStore/`, and `src/images/` keep their literal brand hex values instead.
- Keep the `viewBox` the artboard the icon was drawn on and let `createIcon` size it. `iconSizes`
  maps `tiny`/`small`/`medium`/`large` to Tailwind width/height classes.
- Icons carry no accessible name of their own. The consuming component supplies the label, so
  leave `aria-*` and `<title>` out of the icon file.

### Exports

- `index.ts` is the only public surface. An icon file that nothing re-exports is invisible to
  consumers, and the Storybook browser enumerates this barrel to build its grid.
- Type-only exports (`IconSize`, `IconProps`, `IconComponent`) use `export type`. `isolatedModules`
  is on, so a value-style re-export of a type fails the typecheck.

### TypeScript

- `strict` is on and `types` is empty: no ambient Node or Jest globals. Browser and DOM types only.
- `IconProps` extends `React.SVGProps<SVGSVGElement>`. Add a prop to that interface rather than
  widening a single icon's signature.
- `React.FC` is correct here, unlike in the parent package: `IconComponent` is defined in terms of
  it so icons can carry a `tags` property.

### Tailwind

- Class names in this package resolve against the parent's `tailwind.config.js`, so use the named
  theme scale and keep utilities to sizing and positioning.

## Publishing

Bump `version` in this directory's `package.json`, then run the **Publish @xola/icons** workflow
(`.github/workflows/deploy-icons.yml`) with the npm tag. It publishes from `src/icons/`,
independently of the parent package's release.
