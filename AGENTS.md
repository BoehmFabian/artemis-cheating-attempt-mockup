# Agent guidance for the Artemis cheating-attempt mockup

## Project scope

- This repository is a **standalone, clickable HTML/CSS/JavaScript prototype**, not the Artemis application.
- Keep it dependency-free and runnable by opening `index.html` in a browser. Do not add a build step or introduce a framework unless the user requests it.
- Keep mock data fictional. Do not add real student names, IDs, exam data, evidence, or credentials.
- The requirements document is maintained separately from this mockup. If it is unavailable in the current workspace and a requested change affects requirements, ask for the requirements source rather than inventing new requirements.

## Visual design

- Match the Artemis visual language shown in the project's reference screenshot: compact global header, global navigation rail plus exam-context sidebar, dense spacing, dark cool-slate surfaces, blue primary actions and links, and restrained corner radii.
- The Artemis theme variables are the source of truth for colour values. `tokens.css` contains the self-contained values used by the prototype; retain semantic tokens and avoid adding unrelated palettes or hard-coded colors in `styles.css`.
- Dark mode is the default. Keep the theme toggle functional and test both dark and light modes.
- Maintain responsive layouts for desktop, tablet, and phone. Do not introduce horizontal page overflow at 390 CSS px.
- Use semantic HTML, one `<h1>` per page, labeled controls, visible keyboard focus, keyboard-operable dialogs/tabs, and reduced-motion support. Status must not be conveyed by colour alone.
- Screenshots in `screenshots/` are browser captures of this prototype with fictional data. They are not production Artemis screenshots and must not be described as such.

## Workflow and access rules

- Preserve the profile menu's **Staff view** and **Tutor view** behavior. Tutor view shows only the tutor's own reports.
- Tutors may report cases and edit their own report while the room protocol is unsigned. Tutors must not see decision or audit views and must not export or download reports, room protocols, or evidence.
- Do not add explanatory information banners, confidentiality/need-to-know cards, or static help panels to the mockup. The user has explicitly asked to keep those explanations in documentation, not in the Artemis UI prototype.
- Student selection supports lookup by name/TUM ID and by room plus seat. In report editing, the student identity and incident time are locked; category, description, immediate action, witness, and evidence remain editable until the room protocol is signed.
- Reports are grouped in a **room protocol summary**. The primary and secondary supervisors sign that room summary together with the conduction workflow; do not add separate protocol signatures to each report.
- Exam staff assignments are managed elsewhere in Artemis and are a prerequisite. Do not add staff assignment management to this feature mockup.
- Case export, room protocol export, evidence download, audit export, decision, and audit actions must be hidden or inaccessible in Tutor view, including when opening a page directly.

## Interactions and validation

- Keep the core mockup interactions functional: dashboard filters, theme toggle, profile role switch, room/seat search mode, report edit/evidence changes, room protocol sign-off, evidence viewer, and decision confirmation.
- All server-backed actions are simulated. Make that clear in the README; do not imply the mockup persists changes or enforces server-side authorization.
- After changing a page, open it in a browser and check for JavaScript errors, correct interactions, one `<h1>`, no duplicate IDs, and no horizontal overflow at desktop and phone widths.
- Run axe-core against WCAG 2.x A/AA on the pages and roles affected, in both themes. Re-capture affected screenshots after visual changes.
- Keep `README.md` links valid within this standalone repository. Do not add links that depend on parent directories in the seminar workspace.

## Files

- `index.html`: case dashboard
- `quick-capture.html`: new report flow
- `edit-report.html`: report editing flow
- `case-detail.html`: report, evidence, decision, and audit views
- `room-protocol.html`: per-room report summary and joint signatures
- `decision.html`: instructor decision workflow
- `styles.css`, `tokens.css`, `app.js`: shared presentation and prototype interactions
- `screenshots/`: browser captures of the mockup
