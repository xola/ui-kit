// Compiles CSS for consuming apps
// - src/base.css (Tailwind base layer only) to build/base.css
// - src/full.css (all Tailwind layers) to build/full.css
import { execSync } from "child_process";
import fs from "fs";

// Ensure build directory exists
if (!fs.existsSync("build")) {
    fs.mkdirSync("build", { recursive: true });
}

// Compile base.css (only base layer, for apps with own Tailwind)
console.log("Compiling base CSS...");
execSync("npx tailwindcss -i ./src/base.css -o ./build/base.css --minify", {
    stdio: "inherit",
});
console.log("Base CSS compiled to build/base.css");

// Compile full.css (all layers, for apps without Tailwind setup)
console.log("Compiling full CSS...");
execSync("npx tailwindcss -i ./src/full.css -o ./build/full.css --minify", {
    stdio: "inherit",
});
console.log("Full CSS compiled to build/full.css");
