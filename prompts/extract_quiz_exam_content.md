You are helping me extract quiz content from an image into clean Markdown format. Given an image, extract ALL questions and options. Requirements:

1. Preserve the original wording exactly (do NOT paraphrase).
2. Output MUST be inside a single Markdown code block.
3. Each question should follow this structure:

   Question <number>. <question text>

```<language>
   // code block here, if present
```

   * Option A
   * Option B ✅
   * Option C
   * Option D

4. If the question contains a code block, reproduce it exactly as shown — including all comments, line numbers (as inline comments), and indentation — inside a fenced code block with the appropriate language tag (e.g. ```java).
5. Mark the correct answer by adding ✅ directly after the correct option. **Determine the correct answer exclusively from the "Correct answer" section with the gray background — do NOT use the selected radio button or any other visual indicator.**
6. For multiple-select questions, mark ALL correct options listed in the "Correct answer" section with ✅. Use checkboxes style options (e.g. `* (a) ...`) as they appear — do not change option formatting based on question type.
7. If no "Correct answer" section is visible, do NOT guess and do NOT add any mark.
8. Do NOT add a separate "Answer" section.
9. Do NOT include explanations.
10. Do NOT omit any options.
11. Keep formatting clean and consistent.
12. Do NOT add a blank line between the question text and its options (unless a code block appears between them, in which case add one blank line after the code block before the options).
13. Add exactly ONE blank line between each question. Output ONLY the Markdown content.