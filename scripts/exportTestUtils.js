import { readFileSync } from "node:fs";

const getExportNames = (source, pattern) => {
    const blocks = [...source.matchAll(pattern)];

    return blocks.flatMap(([, names]) => {
        return names
            .split(",")
            .map((name) => name.trim().replace(/^.*\s+as\s+/, ""))
            .filter(Boolean);
    });
};

export const getExportedNames = (filePath) => {
    const source = readFileSync(filePath, "utf8");

    return getExportNames(source, /^export\s*(?:type\s*)?\{([^}]*)\}/gm);
};

export const getExportedTypeNames = (filePath) => {
    const source = readFileSync(filePath, "utf8");

    return getExportNames(source, /^export\s+type\s*\{([^}]*)\}/gm);
};

export const getDeclaredTypeNames = (filePath) => {
    const source = readFileSync(filePath, "utf8");

    return [...source.matchAll(/^export\s+(?:interface|type)\s+(\w+)/gm)].map(([, name]) => name);
};
