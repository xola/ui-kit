import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.dependencies);
const devDependencies = Object.keys(pkg.devDependencies);

export default defineConfig({
    build: {
        outDir: "build",

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "XolaUIKit",
        },

        rollupOptions: {
            // Make sure none of the dependencies are bundled.
            external: [...dependencies, ...devDependencies],
            output: {
                globals: {
                    "@headlessui/react": "HeadlessUI",
                    "@tippyjs/react": "TippyReact",
                    "@tailwindcss/forms": "TailwindForms",
                    "@tailwindcss/line-clamp": "TailwindLineClamp",
                    ahooks: "ahooks",
                    axios: "axios",
                    clsx: "clsx",
                    dayjs: "dayjs",
                    downshift: "Downshift",
                    "get-user-locale": "getUserLocale",
                    "google-libphonenumber": "libphonenumber",
                    lodash: "_",
                    "nouislider-react": "Nouislider",
                    "prop-types": "PropTypes",
                    react: "React",
                    "react-day-picker": "ReactDayPicker",
                    "react-dom": "ReactDOM",
                    "react-hot-toast": "toast",
                    "react-hotkeys-hook": "reactHotkeysHook",
                    "react-json-view": "ReactJsonView",
                    "react-select": "ReactSelect",
                    "react-textarea-autosize": "TextareaAutosize",
                    "storybook-addon-designs": "storybookAddonDesigns",
                    "tippy.js": "tippy",
                    "use-debounce": "useDebounce",
                },
            },
        },
    },
});
