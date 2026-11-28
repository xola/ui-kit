import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DATE_PICKER_REMOVED_PROPS } from "../src/components/DatePicker/DatePicker";
import { POPOVER_REMOVED_PROPS } from "../src/components/Popover/Popover";
import { SIDEBAR_MENU_REMOVED_PROPS } from "../src/components/Sidebar/Sidebar.Menu";
import { TOOLTIP_REMOVED_PROPS } from "../src/components/Tooltip";
import { getDeclaredTypeNames, getExportedNames } from "./exportTestUtils";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(repoRoot, "skills");
const typesPath = path.join(repoRoot, "index.d.ts");
const readmePath = path.join(skillsDir, "README.md");
const indexPath = path.join(repoRoot, "src", "index.js");
const iconsPath = path.join(repoRoot, "src", "icons", "index.ts");
const devIndexPath = path.join(repoRoot, "src", "dev", "index.js");
const devTypesPath = path.join(repoRoot, "dev.d.ts");
const fixturesDir = path.join(skillsDir, "migrate-to-3.8", "fixtures");

const getSkillFolders = () => {
    if (!existsSync(skillsDir)) {
        return [];
    }

    return readdirSync(skillsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
};

const getSkillFile = (folder) => path.join(skillsDir, folder, "SKILL.md");

const getFrontmatter = (source) => {
    const match = source.match(/^---\n([\s\S]*?)\n---\n/);

    if (!match) {
        return {};
    }

    return Object.fromEntries(
        match[1]
            .split("\n")
            .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
            .filter(Boolean)
            .map(([, key, value]) => [key, value.trim()]),
    );
};

const getRelativeLinkTargets = (source) => {
    const links = [...source.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)];

    return links
        .map(([, target]) => target.split("#")[0])
        .filter((target) => target && !/^[a-z][a-z0-9+.-]*:/i.test(target));
};

const getBacktickedComponentNames = (source) => {
    const tokens = [...source.matchAll(/`([A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?)`/g)];

    return [...new Set(tokens.map(([, token]) => token.split(".")[0]))];
};

const getFixtureNames = (kind) => {
    const dir = path.join(fixturesDir, kind);

    return existsSync(dir) ? readdirSync(dir).filter((file) => file.endsWith(".tsx")) : [];
};

const getMarkdownFiles = () => [readmePath, ...getSkillFolders().map(getSkillFile)];

describe("skills folder", () => {
    test("has at least one skill", () => {
        expect(getSkillFolders().length).toBeGreaterThan(0);
    });

    test("has a README.md entry point", () => {
        expect(existsSync(readmePath)).toBe(true);
    });
});

describe("SKILL.md frontmatter", () => {
    test.each(getSkillFolders())("%s has name equal to its folder and a 'Use when' description", (folder) => {
        const skillFile = getSkillFile(folder);

        expect(existsSync(skillFile)).toBe(true);

        const { name, description } = getFrontmatter(readFileSync(skillFile, "utf8"));

        expect(name).toBe(folder);
        expect(description).toMatch(/^Use when\b/);
    });
});

describe("relative links", () => {
    test.each(getMarkdownFiles())("links in %s resolve inside the repo", (file) => {
        const targets = getRelativeLinkTargets(readFileSync(file, "utf8"));

        targets.forEach((target) => {
            const resolved = path.resolve(path.dirname(file), target);

            expect(resolved.startsWith(`${repoRoot}${path.sep}`)).toBe(true);
            expect(existsSync(resolved)).toBe(true);
        });
    });
});

describe("skills/README.md", () => {
    test.each(getSkillFolders())("lists %s with its node_modules path", (folder) => {
        const readme = readFileSync(readmePath, "utf8");

        expect(readme).toContain(`\`node_modules/@xola/ui-kit/skills/${folder}/SKILL.md\``);
    });
});

describe("npm pack", () => {
    /**
     * npm 10 runs `prepare` on `npm pack` even with --ignore-scripts, so the vite build log lands
     * on stdout ahead of the JSON. The report is the last top-level array.
     */
    const getPackedPaths = () => {
        const packArgs = ["pack", "--dry-run", "--json", "--ignore-scripts"];
        const output = execFileSync("npm", packArgs, { cwd: repoRoot, encoding: "utf8" });
        const jsonStart = output.lastIndexOf("\n[\n") + 1;
        const [{ files }] = JSON.parse(output.slice(jsonStart));

        return files.map(({ path: filePath }) => filePath);
    };

    test("ships skills/README.md and every SKILL.md", () => {
        const packed = getPackedPaths();
        const expected = ["skills/README.md", ...getSkillFolders().map((folder) => `skills/${folder}/SKILL.md`)];

        expected.forEach((file) => {
            expect(packed).toContain(file);
        });
    }, 60_000);
});

describe("using-ui-kit", () => {
    const skillFile = getSkillFile("using-ui-kit");

    test("exists", () => {
        expect(existsSync(skillFile)).toBe(true);
    });

    test("every component or icon named in backticks is exported by its owning package", () => {
        const known = new Set([
            ...getExportedNames(indexPath),
            ...getExportedNames(iconsPath),
            ...getExportedNames(devIndexPath),
            ...getDeclaredTypeNames(typesPath),
            ...getDeclaredTypeNames(devTypesPath),
        ]);
        const names = getBacktickedComponentNames(readFileSync(skillFile, "utf8"));

        expect(names.length).toBeGreaterThan(0);
        expect(names.filter((name) => !known.has(name))).toEqual([]);
    });
});

describe("migrate-to-3.8", () => {
    const skillFile = getSkillFile("migrate-to-3.8");
    const removedProps = {
        Tooltip: Object.keys(TOOLTIP_REMOVED_PROPS),
        Popover: Object.keys(POPOVER_REMOVED_PROPS),
        DatePicker: Object.keys(DATE_PICKER_REMOVED_PROPS),
        "Sidebar.Menu": Object.keys(SIDEBAR_MENU_REMOVED_PROPS),
    };

    test("exists", () => {
        expect(existsSync(skillFile)).toBe(true);
    });

    test.each(Object.entries(removedProps))("names every removed %s prop in backticks", (component, props) => {
        const source = existsSync(skillFile) ? readFileSync(skillFile, "utf8") : "";

        expect(props.filter((prop) => !source.includes(`\`${prop}\``))).toEqual([]);
    });

    test("every before fixture has an after fixture and the reverse", () => {
        const before = getFixtureNames("before");
        const after = getFixtureNames("after");

        expect(before.length).toBeGreaterThan(0);
        expect(after).toEqual(before);
    });
});

describe("skills prose", () => {
    const getAllSkillFiles = () => {
        const fixtures = ["before", "after"].flatMap((kind) => {
            return getFixtureNames(kind).map((file) => path.join(fixturesDir, kind, file));
        });

        return [...getMarkdownFiles(), ...fixtures];
    };

    test.each(getAllSkillFiles())("%s has no em-dash", (file) => {
        expect(readFileSync(file, "utf8")).not.toContain("\u2014");
    });
});
