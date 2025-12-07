# Xola Icons

Xola's icon set exposed as React components. This package is published on NPM as [@xola/icons](https://www.npmjs.com/package/@xola/icons).

The preview for icons is published as part of the repository's Storybook on [ui.xola.io](https://ui.xola.io/?path=/story/media-icons--large-24-px).

## Requirements

- Node.js v20 or higher
- **ESM-only package** - This package uses ES modules exclusively and does not support CommonJS

## Installation

Install the icons package:

```bash
npm install @xola/icons
```

## Usage

```jsx
import { CalendarIcon, DownArrowIcon, TrashIcon } from "@xola/icons";

function MyComponent() {
    return (
        <div>
            <CalendarIcon size="small" />
            <DownArrowIcon size="medium" />
            <TrashIcon size="large" className="text-red-500" />
        </div>
    );
}
```

### Available Sizes

- `small` - Default size
- `medium`
- `large`

### TypeScript Support

This package includes full TypeScript type definitions. Types are automatically available when using TypeScript.

```tsx
import { CalendarIcon } from "@xola/icons";
import type { IconProps } from "@xola/icons";

const MyIcon: React.FC<IconProps> = ({ size = "small", className }) => {
    return <CalendarIcon size={size} className={className} />;
};
```

## Development

### Building the Package

```bash
npm run build
```

This will:
- Build the ES module bundle
- Generate TypeScript declaration files
- Output to the `build/` directory

### Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Publishing

### Prerequisites

1. Ensure you have proper NPM permissions to publish to the `@xola` scope
2. Authenticate with NPM:
   ```bash
   npm login
   ```

### Publishing Steps

1. **Update the version** in `package.json` following [semantic versioning](https://semver.org/):
   - **Patch** (1.2.0 → 1.2.1): Bug fixes, no breaking changes
   - **Minor** (1.2.0 → 1.3.0): New features, no breaking changes
   - **Major** (1.2.0 → 2.0.0): Breaking changes

2. **Build the package** to ensure everything compiles:
   ```bash
   npm run build
   ```

3. **Verify the package contents** before publishing:
   ```bash
   npm pack --dry-run
   ```

   This shows what will be included in the published package. Verify:
   - `build/` directory is included
   - `build/icons.es.js` exists
   - `build/index.d.ts` exists
   - Source files (`src/`) are NOT included

4. **Publish to NPM**:
   ```bash
   npm publish --access public
   ```

   Or for a beta/alpha release:
   ```bash
   npm publish --tag beta --access public
   ```

5. **Verify the publication**:
   - Check the package page: https://www.npmjs.com/package/@xola/icons
   - Test installation in a separate project:
     ```bash
     npm install @xola/icons@latest
     ```

### Post-Publishing

1. **Tag the release** in Git:
   ```bash
   git tag -a icons-v1.2.0 -m "Release @xola/icons v1.2.0"
   git push origin icons-v1.2.0
   ```

2. **Update consuming projects** that use `@xola/icons`:
   ```bash
   npm update @xola/icons
   ```

## Package Configuration

This package is configured as ESM-only:

```json
{
    "type": "module",
    "exports": {
        ".": {
            "types": "./build/index.d.ts",
            "import": "./build/icons.es.js"
        }
    }
}
```

## Troubleshooting

### "Cannot find module" errors

Ensure your consuming project supports ESM:
- Add `"type": "module"` to your `package.json`, or
- Use `.mjs` file extensions, or
- Configure your bundler (Vite, Webpack, etc.) to handle ESM

### TypeScript errors

Ensure your `tsconfig.json` has:
```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## License

See the [ui-kit repository](https://github.com/xola/ui-kit) for license information.
