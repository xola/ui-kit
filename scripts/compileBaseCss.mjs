// Compiles src/base.css (Tailwind base layer only) to build/base.css (pre-compiled)
// This allows consuming apps to import pre-compiled base styles from node_modules
// Apps provide their own @tailwind components/utilities
import { execSync } from "child_process";
import fs from "fs";

// Ensure build directory exists
if (!fs.existsSync("build")) {
    fs.mkdirSync("build", { recursive: true });
}

// Use Tailwind CLI to compile base.css (only base layer, not utilities)
console.log("Compiling base CSS...");
execSync("npx tailwindcss -i ./src/base.css -o ./build/base.css --minify", {
    stdio: "inherit",
});
console.log("Base CSS compiled to build/base.css");
