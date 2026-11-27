# @xola/ui-kit agent skills

Skills follow the Agent Skills standard (`SKILL.md` with `name` and `description` frontmatter), readable by Claude Code, Codex and Cursor. They ship inside the npm package, so the guide you read always matches the installed ui-kit version.

## Skills

- `node_modules/@xola/ui-kit/skills/using-ui-kit/SKILL.md`: building UI with ui-kit components (component catalog, prop conventions, `Provider` and Tailwind setup, the 3.8 `Tooltip`, `Popover`, `Sidebar.Menu`, `RangeSlider` and `SubmitButton` APIs)
- `node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md`: upgrading an app from ui-kit 3.7 to 3.8 (Tippy to Radix props, noUiSlider to Radix Slider, Headless UI removal, `TippyProps` types, hand-review list)
- `node_modules/@xola/ui-kit/skills/migrate-2.6-to-3.7/SKILL.md`: upgrading an app from ui-kit 2.6.x to 3.7.x (ESM-only config loading, `exports` map, React 18.3 peer, removed exports)

## Use a skill

No tooling required. Either way, reference the file in `node_modules`.

Point your agent at the file for one task:

```text
Follow node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md to upgrade this repo to ui-kit 3.8
```

Or reference it from your `AGENTS.md` / `CLAUDE.md` so every session sees it:

```text
- node_modules/@xola/ui-kit/skills/using-ui-kit/SKILL.md : building UI with ui-kit components
```

## Why the `node_modules` path

A copy in `.claude/skills` goes stale on the next ui-kit bump. The `node_modules` path always matches the installed version.
