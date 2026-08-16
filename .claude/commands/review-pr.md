---
allowed-tools: Write,Bash(bash .github/scripts/post-review.sh:*),mcp__github_comment__update_claude_comment,mcp__github_ci__get_ci_status,mcp__github_ci__get_workflow_run_details,mcp__github_ci__download_job_log,Bash(gh pr diff:*),Bash(gh pr view:*),Read,Grep,Glob
description: Review a pull request
---

## Setup

**Gather in one batched turn for speed:** the standards reads, `gh pr diff`, and `gh pr view` as
parallel tool calls in a single message — don't read one at a time across separate turns. Then
glob/read scoped rules in the next batch. Minimize round-trips — that's the main latency lever.

Read always-on standards (apply to every file):

- `CLAUDE.md` (root)
- `.claude/rules/commenting.md`

Fetch the PR diff (`gh pr diff`) — sole source of truth for **what changed**. Note the list of
changed file paths.

Fetch the PR **intent** (`gh pr view`: title + description). If a JIRA key is present and a
JIRA-reading tool is available, also fetch the linked issue's acceptance criteria; otherwise rely
on the PR body alone — don't infer criteria from the key. Intent is the oracle for **whether the
change is correct**: the diff says what happened, intent says what *should* have happened.

**Build the scoped rule set (dynamic — never hardcode filenames):** glob `.claude/rules/*.md`. For
each file, read its `paths:` frontmatter globs, keep the file only if at least one changed path
matches. This auto-includes any rule file (current or future) and honors each rule's scope. Pass
the always-on standards **and** this matched scoped set to every subagent.

## Review Priorities

Focus on issues that matter. Do not leave noise or cosmetic suggestions that distract from real
problems.

### Block merge

- **Public API breakage**: a renamed/removed export from `src/index.js`, a renamed/removed prop,
  or a changed default value with no discussion in the PR description.
- **Correctness**: logic errors, a disabled/loading state that doesn't actually block interaction,
  broken keyboard/focus handling.
- **Accessibility regressions**: interactive elements losing keyboard operability, focus
  visibility, or an accessible name/role they previously had.
- **Memory leaks**: missing cleanup for timers, listeners, or third-party widget instances
  (`tippy.js`, `nouislider-react`, `react-day-picker`).

### Requires discussion

- **Missing PropTypes**: a new public prop with no `propTypes` entry.
- **Missing Storybook coverage**: a new component or variant with no story demonstrating it.
- **Hardcoded Tailwind colors**: numbered palette classes (`text-gray-600`) instead of the named
  theme scale (`text-gray-dark`).
- **Missing tests**: new logic in `src/helpers/` or `src/hooks/` without a Jest test.

### Non-blocking suggestions

- **Readability**: unclear variable/prop names, overly complex conditional logic.
- **Minor best practices**: small improvements that don't affect correctness or the public API.

### What NOT to comment on

- Formatting issues (Prettier handles this automatically).
- Import ordering preferences.
- Adding comments/docs to code that is already self-explanatory.
- Hypothetical future concerns ("what if we need X later").

### Review principles

1. **Be specific**: reference exact lines and provide concrete examples.
2. **Explain why**: state the impact or risk, not just what's wrong.
3. **Suggest fixes**: show corrected code when possible.
4. **Stay focused**: only comment on things that improve correctness, accessibility, or
   maintainability.
5. **Acknowledge good work**: call out well-implemented solutions.

### Project-specific checks

- Verify every new public prop has a `propTypes` entry.
- Verify new/changed components have a corresponding Storybook story under `src/stories/`.
- Verify new public components are exported from `src/index.js`.
- Verify Tailwind classes use the named theme scale, not numbered defaults.
- Verify `useEffect` hooks that subscribe or attach to the DOM clean up on unmount.

## Scope Check (before agents)

Review the full list of changed files. Flag any changes outside files directly relevant to the
PR's stated purpose — unrelated changes need explicit justification. Include this finding in the
aggregated output.

## Subagents

Launch four subagents **in parallel** in a single message. Pass each: the full diff, PR intent,
always-on standards, and the matched scoped rule set.

- `code-quality-reviewer` — correctness, code reuse & quality
- `performance-reviewer` — rendering efficiency, memory/cleanup, tests
- `documentation-accuracy-reviewer` — documentation and Storybook accuracy
- `business-logic-reviewer` — intent vs. implementation, public API contracts, component states

## Aggregation

After all four agents complete:

- Merge overlapping findings across agents.
- Prioritize: Critical → Major → Minor.
- Discard false positives or findings that need architectural changes outside this PR's scope.
- Discard any finding conflicting with project standards in `CLAUDE.md` and `.claude/rules/`.
- **Inferred / low-confidence findings** (business-logic findings not backed by a documented rule)
  — post as a question, or surface only at Major+. Never post an inferred finding as Critical.

## Output

Report **problems only** (no praise, no scoring, no quality/style essay). **The only output is the
file `claude-review.json`.** Do NOT post comments, do NOT call `gh pr comment` or any GitHub/MCP
posting tool, do NOT run any script — a later workflow step reads the file and posts the review
for you. Writing the file is the last thing you do.

**Write `claude-review.json`** at the repo root with the `Write` tool, exactly this shape:

```json
{
  "event": "APPROVE | REQUEST_CHANGES | COMMENT",
  "summary": "## Summary\n<2–4 sentences: overall state, main themes / risk areas, and severity counts. No per-finding list — the inline comments carry the detail.>",
  "comments": [
    { "path": "<repo-relative path>", "line": 42, "side": "RIGHT", "body": "**[Critical]** <problem>. <fix>." }
  ]
}
```

- **One object per finding — put every line-specific finding here.** This is the primary output;
  `summary` is just an overview.
- `line` = new-file line number as it appears in the PR diff. Use `"side": "RIGHT"` for an added or
  context line, `"LEFT"` for a removed line; add `"start_line"` (+ `"start_side"`) for a multi-line
  range. The script auto-moves any off-diff line into the body, so don't agonize — but prefer real
  diff lines, and for a finding about *missing* code anchor to the nearest related changed line.
- **Off-diff findings (lines outside the PR diff):** if you must reference a location not part of
  the diff, `body` MUST open with a one-sentence "**PR connection:**" explaining exactly how this
  location is impacted by or related to the PR's changes. Without a clear connection to the diff,
  drop the finding entirely.
- `body` may include a committable ` ```suggestion ` block for a one-line fix, and should cite an
  existing example (`file:line`) when flagging divergence from a pattern.
- Map your recommendation to `event` (Approve→`APPROVE`, Request changes→`REQUEST_CHANGES`,
  Comment→`COMMENT`).
- `summary` holds ONLY the overview + counts — never a per-finding list, praise, a test-coverage
  report, or a style/CLAUDE.md-adherence section.

**Formatting rules (apply to `summary` and every `body`):**

- **Never use inline parenthetical numbering** like `(1) ... (2) ... (3)`. Use a proper markdown
  ordered list, each item on its own line.
- Use `**bold**` for labels (`**PR connection:**`, `**Fix:**`, `**[Critical]**`) and backticks for
  code identifiers.
- Keep sentences short. One idea per sentence.
- Do not use em-dashes mid-sentence as a substitute for line breaks or list items.
- `**Fix:**` must always be on its own line, separated from the preceding sentence by a blank line.
- **Line numbers for off-diff findings:** the script cannot verify these against the diff, so
  they're used as rough orientation only. Include a best estimate in the `line` field, noting it
  may be approximate.

After writing `claude-review.json`, **stop** — your turn is done. A workflow step validates each
comment's line against the diff, posts the inline comments and a summary review, and moves any
off-diff finding into a `## Not inline` body section. Do not attempt to post anything yourself.

**The progress/tracking comment** (`update_claude_comment`) must stay minimal — a single pointer
line such as `Review written.`. Never put findings, a summary, praise, coverage, or style notes
there.
