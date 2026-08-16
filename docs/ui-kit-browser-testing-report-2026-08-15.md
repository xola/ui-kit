# UI Kit Browser Testing Report

**Branch:** `upgrade-dev-tooling-tier1` · **Date:** 2026-08-16 · **Result:** PASS (155/155 stories console-clean, 141/155 pixel-match production at 0.05%, remaining 14 all accounted for)

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

## 3b. Visual regression testing (added after console-only testing missed four bugs)

`npx zx scripts/diff-vs-prod.mjs` screenshots every story locally and on production and reports any whose normalised
RMSE exceeds the threshold. **Run this in addition to the smoke script.** A story can render with zero console errors
and still be visually wrong: four regressions on this branch passed the smoke script and were caught here or by review.

The threshold is **0.05%**, not 1%. Both sides render in the same browser at the same viewport, so identical
output scores exactly `0` and the threshold can sit very low. It has to: the missing select border below moved only
0.26% of the pixels and a 1% threshold hid it completely.

Current state: **141/155 stories pixel-match production.** All 14 that differ are accounted for:

| Story | RMSE | Cause |
| --- | --- | --- |
| `configuration-fonts--fonts` | 13.7% | Expected. The story prints the font stack, which Tailwind 3.4 changed. |
| `other-header-toolbars` | 3.6% | Story copy differs from the deployed version. Not a rendering change. |
| `date-range-picker--relative-date-ranges` (×2), `date-picker--select-year-month` | ~1.7% | Native `<select>` font metrics, from the same Tailwind 3.4 default-stack change. Calendars match exactly. |
| `input`/`select`/`textarea--with-error` (×3) | 0.85% | **Intentional.** The error label is red here and black on production, because production's `className="text-danger"` was silently overridden. See §4. |
| `skeleton--default`, `spinner--default`, `spinner--sizes` | 0.2–1.0% | Animation frame at capture time. |
| `media-images--default`, `media-logo--all-sizes` | 0.4–1.0% | Image load timing at capture. |
| `badges--all-sizes` | 0.95% | Large badge 2px wider (160 vs 158). Same font, size and weight; sub-pixel text measurement. |

Three caveats when reading its output:

- Production runs the **last deployed** ui-kit, so genuine merged changes show up as diffs too.
- **Do not edit source while it runs.** An HMR reload mid-capture produced a blank frame and a bogus 5.8% diff.
- A diff is a prompt to look, not a verdict. Confirm the cause with computed styles before calling it a regression, and
  before calling it benign.

## 4. Defects found and fixed on this branch

| Issue | Where | Pre-existing? |
| --- | --- | --- |
| Missing React `key` in mapped lists → 6 stories logged console errors | Currency (×3), Flash, Number, ToggleButton stories | Yes — files are rename-only vs `master`; only visible because the dev server runs development React. Production strips these warnings, which is why ui.xola.io looks clean. |
| `csvAcceptFormats` declared twice in `argTypes`; first block's description/default belong to the undocumented `caption` prop | `ImageUpload.stories.jsx` | Yes — surfaced by esbuild's duplicate-key warning |
| `-s public` silently stopped serving static files (SB7 resolves it relative to `.storybook/`) | `package.json`, `.storybook/main.js` | No — introduced by the SB7 migration; fixed with `staticDirs: ["../public"]` |
| `--no-manager-cache` removed in SB7, `npm run dev` exited 1 | `package.json` | No — cache clearing folded into `npm run clean` |
| **Disabled buttons rendered in their full accent colour behind grey text.** Colour variants emitted `disabled:bg-<color>` alongside the base `disabled:bg-gray-lighter`; two background utilities under one variant let Tailwind's class order decide, and 3.4 reordered it | `Buttons/Button.jsx` | No — introduced by the Tailwind 3.4 bump. The variant copies never applied under 3.1, so removing them restores the original behaviour for all six colours, hovered and not. |
| **Every story rendered in a system font.** The Inter and Roboto Mono links lived only in the manager head, which styles Storybook's chrome, not the preview iframe | `.storybook/preview-head.html` | No — SB6 got fonts into the preview; SB7 does not. Fixing it made the preview pixel-identical to production. |
| **Inputs, selects and textareas lost their border.** The base class list set `border-transparent` while the state ternary set `border-gray-light`; 3.4 reordered them so transparent won | `Forms/BaseInput.jsx` | No — introduced by the Tailwind 3.4 bump. Affects every `Input`, `Select` and `Textarea`. The ternary always supplies a colour, so the base one was removed. |
| Error labels passed `className="text-danger"` without `isError`, colliding with the `text-black` the component emits when `isError` is false | Input, Select, Textarea stories | Yes — the intended red only rendered when Tailwind's order happened to favour it, which is why production shows black. Switched to the `isError` prop. |

### The pattern behind three of these

Three separate regressions share one root cause: **two utilities setting the same CSS property at the same
specificity on one element**. Which one wins is decided purely by Tailwind's generated stylesheet order, and 3.4
reordered it. Grep for a base utility and a variant/ternary utility touching the same property in one `clsx` call:

```sh
rg -n "(disabled|hover|active|focus):(bg|text|border)-" src/components
```

`Switch`, `Checkbox` and the rest of `BaseInput` were checked and are safe: their duplicates are either
mutually-exclusive ternary branches or different properties.

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
3. `npx zx scripts/diff-vs-prod.mjs` → triage anything above 1%. **Never skip this on a Tailwind or Storybook bump.** Console-clean is not visually correct: the disabled-button and missing-font bugs both passed the smoke script.
4. Re-run the §3 interaction table for anything the diff touches; a render pass is not a behaviour pass.
5. Any *new* console output: check it against production behaviour and against `master`'s dev server before dismissing it.
6. `npm run build` → `build/ui-kit.umd.js` still exists and is CJS. **Seller's jest does not transform `@xola/ui-kit`**, so `main` must stay UMD/CJS or seller's test suite breaks.
7. `npm run lint` → 0 errors; `npm test` → green; `npm run build:storybook` → preview builds.
