#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../src");
const INDEX_FILE = path.join(__dirname, "../index.js");

/**
 * Recursively find all .tsx files in a directory
 */
function findTsxFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Skip helpers directory as it contains utility functions, not icon components
            if (entry.name === "helpers") {
                continue;
            }
            files.push(...findTsxFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Extract component name from file path
 * Example: /path/to/AccountIcon.tsx -> AccountIcon
 */
function getComponentName(filePath) {
    return path.basename(filePath, ".tsx");
}

/**
 * Get relative path from src directory for grouping
 * Example: /path/to/src/CreditCards/VisaIcon.tsx -> CreditCards
 */
function getComponentGroup(filePath) {
    const relativePath = path.relative(SRC_DIR, path.dirname(filePath));
    return relativePath || "root";
}

/**
 * Check if a component is exported in index.js
 */
function isExported(componentName, indexContent) {
    // Match both named exports and default exports
    const exportPattern = new RegExp(
        `export\\s+{\\s*${componentName}\\s*}|export\\s+default\\s+${componentName}`,
    );
    return exportPattern.test(indexContent);
}

function main() {
    console.log("🔍 Checking icon exports...\n");

    // Find all icon files
    const iconFiles = findTsxFiles(SRC_DIR);
    console.log(`Found ${iconFiles.length} icon files in src/\n`);

    // Read index.js
    if (!fs.existsSync(INDEX_FILE)) {
        console.error(`❌ Error: ${INDEX_FILE} not found`);
        process.exit(1);
    }

    const indexContent = fs.readFileSync(INDEX_FILE, "utf-8");

    // Check each icon
    const missing = [];
    const byGroup = {};

    for (const file of iconFiles) {
        const componentName = getComponentName(file);
        const group = getComponentGroup(file);

        if (!isExported(componentName, indexContent)) {
            missing.push({ name: componentName, group, file });

            if (!byGroup[group]) {
                byGroup[group] = [];
            }
            byGroup[group].push(componentName);
        }
    }

    // Report results
    if (missing.length === 0) {
        console.log("✅ All icons are properly exported!");
        process.exit(0);
    } else {
        console.log(`❌ Found ${missing.length} icon(s) not exported in index.js:\n`);

        // Group by directory for better readability
        for (const [group, icons] of Object.entries(byGroup)) {
            console.log(`📁 ${group}:`);
            icons.forEach((icon) => {
                console.log(`   - ${icon}`);
            });
            console.log();
        }

        console.log("Please add the missing exports to index.js");
        process.exit(1);
    }
}

main();
