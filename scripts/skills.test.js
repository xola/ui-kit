import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(repoRoot, "skills");
const readmePath = path.join(skillsDir, "README.md");

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
    const getMarkdownFiles = () => [readmePath, ...getSkillFolders().map(getSkillFile)];

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
    const getPackedPaths = () => {
        const packArgs = ["pack", "--dry-run", "--json", "--ignore-scripts"];
        const output = execFileSync("npm", packArgs, { cwd: repoRoot, encoding: "utf8" });
        const [{ files }] = JSON.parse(output);

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
