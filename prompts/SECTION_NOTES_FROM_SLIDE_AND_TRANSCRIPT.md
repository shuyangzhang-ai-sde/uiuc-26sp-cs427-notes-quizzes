# Subsection notes: source material and authoring rules (Slide + Transcript → left-hand Notes)

This document explains how to turn source material for a given subsection (e.g. `8.6`, `11.3`) into the **main notes column** on the left of that week’s HTML study page. Use it together with `sub-tab.md` (HTML structure, tabs, wiring cards): that file covers the **shell**; this one covers **where the facts come from, how faithful they must be, and how Quiz content stays separate**.

---

## 1. What the three columns are

| Column | Role |
|--------|------|
| **Slide** | On-slide points, figures, tables, heading hierarchy. |
| **Transcript** | Spoken additions to the slides: examples, details, emphasis. |
| **Quiz** (right) | Quiz questions and answer choices for the right-hand `QuizPane` (or equivalent UI). **Not** a factual source for the main notes body. |

---

## 2. Single source of truth for the main notes (scope of obligation)

- Everything stated in the **left-hand main notes** must be grounded in **Slide + Transcript together** as the **only** source of truth.
- In practice, **“slides” for note-taking obligations means the left and middle columns together**—not the Slide column alone while ignoring Transcript.
- **Quiz** (right column) still feeds only the right-hand quiz area; **do not** fold it into the main notes body (treat any future cross-references as a separate decision; do not mix by default).

---

## 3. Coverage and fidelity to the material

- **Coverage** must match **every** knowledge point that appears in those two columns, including:
  - Transcript additions to the slides—examples, details, verbal emphasis.
- **Do not remove** points that already appear in either column.
- **Do not add** new points that appear in **neither** column (no inventing from memory).

---

## 4. Allowed reshaping vs. forbidden trimming

You **may**, as long as **no information is lost**:

- Merge slide-by-slide restatement into **one table**, **one bullet list**, or **one code block**;
- Split or merge **cards** by **topic** and reorder for a clearer thread and easier recall.

You **may not**:

- Drop examples or details from the transcript in the name of “brevity”;
- Omit details that only show up on one slide or in one sentence.

---

## 5. Presentation (consistent with neighboring subsections)

- **No long prose blocks**: the main notes **must not** rely on long paragraph-style text (e.g. full-screen essay-style copy or many sentences crammed into a few `<p>` tags). Break content into **clear, scannable bullets** (e.g. `ul.blist` or equivalent), one idea per item, short lead-ins where needed.
- **Structure first**: tables, code blocks, keywords, and splitting into cards already carry information; long explanations must still become **multiple bullets**, not a single wall of text.
- Use the same **HTML structure and classes** as **other subsections on the same page** (e.g. `8.2`–`8.5`): `card`, `card-title`, `keywords`, `tbl-wrap`, `code` regions, etc.
- Group content by topic into **cards**, with **keywords**, **tables**, and **code blocks** to support scanning and memorization.
- “Full coverage” means **all knowledge points preserved**, not a line-by-line match to slide word count; fidelity does **not** mean padding with paragraphs.

---

## 6. Quiz-driven structure (reverse outline)

- **Use quiz items as the skeleton**: derive **section order, card boundaries, and topic groupings** from what the quiz is testing—work **backward** from the questions so the main notes **line up** with how the right-hand quiz probes the material.
- **Structure only**: quiz shapes **outline and emphasis** (what to foreground, how to chunk cards). **Definitions, examples, exceptions, and wording** still come **only** from **Slide + Transcript**. Quiz indicates *where* to stress and *how* to organize; it does **not** replace those two columns as the source of facts.
- **Coverage is not capped by quiz**: anything in Slide + Transcript **must** still appear in the notes even if no quiz question hits it (see §3). Quiz helps ordering and grouping; it does not limit what you must retain.

---

## 7. Where Quiz fits relative to “note obligations”

- The **obligation to preserve content in the notes** applies only to **Slide + Transcript** (left + middle).
- **Quiz** (right column) **does not count** toward the “total knowledge” the main notes must cover; the quiz area can be maintained on its own and aligned separately to a question bank or course quiz pages.

---

## 8. Pre-flight checklist (copy-paste)

Before you consider a subsection’s main notes “done,” verify:

1. [ ] Every point that appears on the slides is reflected in the notes (directly or merged into tables, lists, or code commentary).
2. [ ] Examples, numbers, exceptions, and steps added only in the transcript are not missing.
3. [ ] Facts in the body are not justified by the Quiz column alone: no “quiz-only” assertions (unless you explicitly add cross-references elsewhere). Using quiz **only** to drive **structure** (§6) is fine.
4. [ ] No claims or exam points appear that are not in either of the two columns.
5. [ ] Layout matches other subsection tabs for that week; topics are split into cards clearly.
6. [ ] No long prose: the body is mostly bullets (plus tables/code), one idea per item, easy to read and retain.
7. [ ] Where helpful, card order and grouping **follow the quiz as a skeleton** (§6) without dropping Slide + Transcript-only points.

---

## 9. How this relates to other docs

- **`sub-tab.md`**: How to add tabs and panels in `week_*_*.html`, hook up `switchTab`, and reuse card styling.
- **This document**: How **content** from Slide + Transcript lands faithfully in the left-hand main notes, how Quiz content stays isolated for facts, and how Quiz can still **shape outline** (§6).

When you add sections such as `8.7` or `11.x`, settle the three-column material first, follow this document for fidelity, then implement HTML using `sub-tab.md`.
