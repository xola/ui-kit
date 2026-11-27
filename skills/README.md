# @xola/ui-kit agent skills

Agent Skills (`SKILL.md` with `name` and `description` frontmatter) for Claude Code, Codex and Cursor. They ship in the npm package, so the copy in `node_modules` always matches the installed ui-kit. A copy in `.claude/skills` goes stale on the next bump; reference the `node_modules` path instead.

## Skills

- `node_modules/@xola/ui-kit/skills/using-ui-kit/SKILL.md`: any UI work against ui-kit: picking a component, its props, overlay behavior (focus, dismissal, stacking), tests that query overlays, and first-time setup (`Provider`, Tailwind, toasts).
- `node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md`: an app on ui-kit 3.7 moving to 3.8, or one already on 3.8 that logs "was removed in 3.8" warnings, shows an unstyled calendar, or lost its Tippy or noUiSlider styles.
- `node_modules/@xola/ui-kit/skills/migrate-2.6-to-3.7/SKILL.md`: an app on ui-kit 2.6 moving to 3.7, or one that fails to load ui-kit's config (`require` of an ES module), throws `ERR_PACKAGE_PATH_NOT_EXPORTED`, or imports a removed export. An app on 2.6 headed for 3.8 runs this one first, then `migrate-to-3.8`. A 2.6 app has no copy in `node_modules` before the upgrade (3.7.0 does not ship `skills/`), so give the agent the file from the ui-kit repository until it installs 3.7.1 or newer.

## Pointing an agent at a skill

Reference `using-ui-kit` from the app's `AGENTS.md` or `CLAUDE.md`, so every session that touches UI reaches it:

```text
- node_modules/@xola/ui-kit/skills/using-ui-kit/SKILL.md: read before writing or changing code that imports @xola/ui-kit or @xola/icons
```

Give a migration skill in the prompt for the one upgrade task, rather than in `AGENTS.md`, where it would cost context in every later session:

```text
Follow node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md to upgrade this repo to ui-kit 3.8
```
