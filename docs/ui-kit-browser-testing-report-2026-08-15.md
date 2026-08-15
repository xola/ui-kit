# UI Kit Browser Testing Report

**Branch:** `upgrade-dev-tooling-tier1` · **Date:** 2026-08-15 · **Result:** PASS (155/155 stories, 0 console errors)

Reusable procedure + baseline for verifying `@xola/ui-kit` in a real browser after a dependency
upgrade. Re-run this before merging any branch that touches build tooling or runtime deps.

---

## 1. What was under test

Storybook 7 migration (from 6.5) plus vite 4, jest 29, TypeScript 5, tailwind 3.4. React stays on
17 and Node on 16, because `x2-seller` pins both.

| Environment | Version |
| --- | --- |
| Node | v16.20.2 |
| React / ReactDOM | 17.0.2 |
| Storybook | 7.6.24 (`@storybook/react-vite`) |
| Vite | 4.5.14 |
| Dev server | `npm run dev` → http://localhost:6006 |
| Production reference | https://ui.xola.io (Storybook 6, production React build) |

---

## 2. How to re-run

```sh
npm run dev                                  # terminal 1; clears .vite + .cache first
npx zx scripts/smoke-stories.mjs             # terminal 2; the curated component set
npx zx scripts/smoke-stories.mjs --all       # every story in the index (155 stories, ~6 min)
```

`scripts/smoke-stories.mjs` renders each story in isolation via `iframe.html`, fails on any page
error or console error/warning, and writes a PNG per story to `storybook-smoke/` (gitignored).
Exit code is non-zero if anything fails, so it drops straight into CI.

Known-benign console output is filtered in `IGNORED_CONSOLE` — see §5 before adding to it.

### Interactive checks

The smoke script only proves stories *render*. Interaction was driven with `agent-browser`:

```sh
export AGENT_BROWSER_SESSION=uikit-smoke
agent-browser open "http://localhost:6006/iframe.html?id=<storyId>&viewMode=story"
agent-browser wait --load networkidle
agent-browser snapshot -i -c            # interactive elements with @eN refs
agent-browser click @e1                 # or: find text "..." click | hover
agent-browser errors                    # page errors
agent-browser console                   # console messages
agent-browser close
```

---

## 3. Interaction results

Every row was verified by asserting observable state before *and* after the action, including
verifying absence after a close/dismiss.

| Component | Interaction verified | Result |
| --- | --- | --- |
| Colors | Swatches render from generated `theme` | pass |
| UI Kit Raw Config | `react-json-view` renders theme, 5 top-level keys, colors 17 items | pass |
| Badges | 8 colour variants render | pass |
| Buttons | Enabled + disabled render; 6 colour variants; click fires | pass |
| Date Picker | Day select 10 → 15; next month Oct → Nov → Dec; prev back to Nov | pass |
| Phone | US `(540) 232-2157`, GB `07576 060661`, `+91 95380 57572`, `+1 647-536-8727`; 4 invalid inputs passed through unchanged | pass |
| Range Slider | Keyboard 30% → 35%; mouse drag 10% → 20% | pass |
| Sidebar | Marketing submenu expands to 6 items | pass |
| Drawer | Opens; Escape closes (dialog count 0 → 1 → 0) | pass |
| Modal | Opens; focus trapped inside dialog; Escape closes | pass |
| BottomSheet | Opens; Cancel closes. Escape does **not** close — by design, see §5 | pass |
| Tooltip | Hover shows "Hey there!"; mouse-out removes `[data-tippy-root]` | pass |
| Popover | Hover shows title + body; mouse-out closes | pass |
| PopoverList | Did not open under synthetic hover — identical on production, see §5 | parity |
| Flash | Click fires toast; auto-dismisses after its 3000ms duration | pass |
| Login | Unicode + 68-char email, masked password, checkbox toggle, submit | pass |

Responsive spot-check at 375×812: BottomSheet and Sidebar both render with no horizontal overflow.

Screenshots: `storybook-smoke/<storyId>.png`, plus `interact-*.png` for the open/active states.

---

## 4. Defects found and fixed on this branch

| Issue | Where | Pre-existing? |
| --- | --- | --- |
| Missing React `key` in mapped lists → 6 stories logged console errors | Currency (×3), Flash, Number, ToggleButton stories | Yes — files are rename-only vs `master`; only visible because the dev server runs development React. Production strips these warnings, which is why ui.xola.io looks clean. |
| `csvAcceptFormats` declared twice in `argTypes`; first block's description/default belong to the undocumented `caption` prop | `ImageUpload.stories.jsx` | Yes — surfaced by esbuild's duplicate-key warning |
| `-s public` silently stopped serving static files (SB7 resolves it relative to `.storybook/`) | `package.json`, `.storybook/main.js` | No — introduced by the SB7 migration; fixed with `staticDirs: ["../public"]` |
| `--no-manager-cache` removed in SB7, `npm run dev` exited 1 | `package.json` | No — cache clearing folded into `npm run clean` |

---

## 5. Known-benign findings — do not treat as regressions

**`@emotion/react` duplicate-instance warning, every story.** Introduced by Storybook 7: its
pre-bundled preview runtime inlines emotion, and `react-select` resolves its own copy. Only one
version (11.10.5) is installed. `resolve.dedupe` does not fix it because SB's copy is pre-bundled,
not resolved. Filtered in the smoke script. Absent on ui.xola.io only because SB6 did not bundle
emotion that way.

**BottomSheet ignores Escape.** Deliberate: `BottomSheet.jsx` passes `onClose={noop}` to the
headlessui `Dialog` so that popovers portaled outside the sheet (DatePicker calendar, ComboBox menu)
are never mistaken for an outside click. Confirmed identical on production. Close via the Cancel or
X button.

**PopoverList does not open under synthetic hover.** Reproduces identically on ui.xola.io, so it is
not a regression. Single `Popover` does open on hover, so tippy itself is wired correctly. Needs a
manual check with a real pointer if this component is ever touched.

**`Button > States` story renders "TODO: Disabled & Selected state".** A placeholder in the source
(`Button.stories.jsx:122`), not a render failure.

**Two eslint complexity warnings** (`DatePicker.jsx:29`, `Sidebar.jsx:44`). Pre-existing, 0 errors.

---

## 6. Comparing against production

ui.xola.io is a `storybook build` — a **production** React bundle, so it emits no development
warnings at all. It is a valid reference for *behaviour* (does the drawer close on Escape?) and
useless as a reference for *console cleanliness*. To compare console output fairly, either run
`npm run build:storybook && npx serve storybook-static` locally, or compare dev-server to
dev-server on `master`.

---

## 7. Checklist for the next branch

1. `npm run dev` starts with no errors, `curl -o /dev/null -w "%{http_code}" localhost:6006/favicon.ico` returns 200 (catches static-dir breakage).
2. `npx zx scripts/smoke-stories.mjs --all` → 155/155 clean, exit 0.
3. Re-run the §3 interaction table for anything the diff touches; a render pass is not a behaviour pass.
4. Any *new* console output: check it against production behaviour and against `master`'s dev server before dismissing it.
5. `npm run build` → `build/ui-kit.umd.js` still exists and is CJS. **Seller's jest does not transform `@xola/ui-kit`**, so `main` must stay UMD/CJS or seller's test suite breaks.
6. `npm run lint` → 0 errors; `npm test` → green; `npm run build:storybook` → preview builds.
