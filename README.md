# Cheating Attempt Database — Artemis Mockup

A clickable, self-contained HTML/CSS/JS prototype of a cheating-attempt reporting and review workflow for Artemis. It demonstrates requirements developed for an academic seminar project; the requirements specification is maintained separately and is not included in this mockup repository.

Open [`index.html`](index.html) in a browser. No build step or web server is required.

The mockup uses TUM AET UI design tokens mirrored from the [Artemis TUM AET UI package](https://github.com/ls1intum/Artemis/tree/develop/packages/tum-aet-ui) and follows the [AET UI/UX guidelines](https://ls1intum.github.io/ui-ux-guidelines/docs/intro).

## Screens

| Screen | File | What it demonstrates |
|---|---|---|
| Exam dashboard | [`index.html`](index.html) | Case list, live counts, search, category filter, status quick filters |
| Quick capture | [`quick-capture.html`](quick-capture.html) | Student selection by name/TUM ID or by room and seat, category, description, immediate action, evidence capture/upload, submit feedback |
| Case detail | [`case-detail.html`](case-detail.html) | Incident summary with edit action, evidence gallery and chain of custody, linked records, decision and audit tabs |
| Edit report | [`edit-report.html`](edit-report.html) | Same form as quick capture with student and time locked, editable category/description/action, and evidence upload/removal |
| Room protocol | [`room-protocol.html`](room-protocol.html) | One summary table for all reports in the room, conduction workflow reference, and one signature set for primary and secondary supervisors |
| Decision | [`decision.html`](decision.html) | Case summary, formal notification, student statement, prior confirmed cases, human decision form and confirmation |
| Evidence viewer | dialog in `case-detail.html` | Metadata, SHA-256 hash, integrity status, chain of custody, controlled download |
| Submit confirmation | dialog in `quick-capture.html` | Immutable case number, primary-supervisor notification, no evidence in notifications |
| Decision confirmation | dialog in `decision.html` | Confirmation before an immutable decision, audit warning, case closure |

### Theme and responsive variants

- Light and dark theme toggle in the top bar.
- Desktop layout at 1440 px.
- Tablet layout at 1024 px.
- Mobile layout at 390 px with a collapsible sidebar and stacked case cards.

## Requirement coverage

| Requirement area | Mockup evidence |
|---|---|
| FR-1.1–FR-1.5: exam setup and context | Exam-scoped dashboard, test status, room context, category filter; staff assignments are consumed from Artemis and not managed here |
| FR-2.1–FR-2.13: incident capture | Quick-capture form, participant search by name/TUM ID or room and seat, auto-filled room/seat, category, description, immediate action, evidence, draft, submit notification |
| FR-3.1–FR-3.12: case management and room protocol | Status lifecycle, case detail, editable report until room-protocol signing, room-level summary, conduction-workflow reference, room signatures, audit timeline |
| FR-4.1–FR-4.9: decision and communication | Formal notification record, student statement, human decision, measure/referral, immutable decision warning |
| FR-5.1–FR-5.8: evidence | SHA-256, integrity verification, access log, chain of custody, download |
| FR-6.1–FR-6.10: views and reporting | Dashboard counts, search, status/category filters, case list, evidence view, prior confirmed cases |
| FR-7.1–FR-7.7: access control | Tutor/primary/secondary/instructor/staff contexts, tutor view limited to own reports, no tutor decision or audit access |
| FR-8.1–FR-8.5: audit | Audit tab with actor/time/action/detail/IP columns |
| FR-9.1–FR-9.6: administration | Exam settings, feature context, retention/legal-hold messaging |
| FR-10.1–FR-10.6: interfaces | Case links, stable references, notification-only case reference, external record links |
| NFR-SEC / NFR-PRIV | Role-based access, no evidence in Slack/email in the workflow, access logging, no automated decision |
| NFR-UX-01–07 | Responsive layouts, large touch targets, semantic labels, visible focus, status not conveyed by colour alone |
| NFR-LEGAL | Hash, chain of custody, electronic sign-off, immutable decisions, audit trail |

## Interactions to try

1. Toggle the theme with the moon/sun button.
2. Click the profile icon and switch between **Staff view** and **Tutor view**.
3. In tutor view, the dashboard shows only the tutor's own reports and hides staff-only actions.
4. Search for `Jonas` or use the status/category filters on the dashboard.
5. Open **Report cheating attempt**, switch between **Name or TUM ID** and **Room & seat**, and submit the prefilled form.
6. Open **CA-2026-0042**, choose **Edit report**, change the category or description, add or remove evidence, and save.
7. Switch to **Evidence**, and open the photo or video viewer.
8. Open **Room protocol** and sign the summary together with the conduction workflow.
9. Open **Decision**, change the outcome or rationale, and record the decision.
10. Resize the browser to tablet or phone width and open the sidebar with the menu button.

## Rendered previews

The `screenshots/` folder contains rendered previews of the main screens and interactions:

- [`dashboard-desktop.png`](screenshots/dashboard-desktop.png)
- [`dashboard-tutor.png`](screenshots/dashboard-tutor.png)
- [`dashboard-mobile.png`](screenshots/dashboard-mobile.png)
- [`dashboard-mobile-menu.png`](screenshots/dashboard-mobile-menu.png)
- [`dashboard-dark.png`](screenshots/dashboard-dark.png)
- [`profile-menu.png`](screenshots/profile-menu.png)
- [`quick-capture-desktop.png`](screenshots/quick-capture-desktop.png)
- [`quick-capture-seat-mode.png`](screenshots/quick-capture-seat-mode.png)
- [`quick-capture-tablet.png`](screenshots/quick-capture-tablet.png)
- [`edit-report.png`](screenshots/edit-report.png)
- [`edit-report-evidence.png`](screenshots/edit-report-evidence.png)
- [`edit-report-saved.png`](screenshots/edit-report-saved.png)
- [`room-protocol.png`](screenshots/room-protocol.png)
- [`room-protocol-sign-dialog.png`](screenshots/room-protocol-sign-dialog.png)
- [`room-protocol-signed.png`](screenshots/room-protocol-signed.png)
- [`case-detail-desktop.png`](screenshots/case-detail-desktop.png)
- [`case-detail-tutor.png`](screenshots/case-detail-tutor.png)
- [`case-detail-audit.png`](screenshots/case-detail-audit.png)
- [`evidence-viewer.png`](screenshots/evidence-viewer.png)
- [`evidence-viewer-video.png`](screenshots/evidence-viewer-video.png)
- [`quick-capture-submit-dialog.png`](screenshots/quick-capture-submit-dialog.png)
- [`decision-desktop.png`](screenshots/decision-desktop.png)
- [`decision-confirm-dialog.png`](screenshots/decision-confirm-dialog.png)

## Design notes

- **Tokens:** colours, spacing, radii, shadows, and typography use the `--tumaet-ui-*` tokens from
  `tokens.css`. No external UI framework or icon font is required.
- **Button hierarchy:** one primary action per screen or form (report, sign, record decision), secondary
  actions for adjacent steps, destructive actions are not used in the first-release flow.
- **Status:** every status uses a text label and a dot or icon in addition to colour.
- **Accessibility:** semantic headings, native form controls with labels, keyboard-operable tabs,
  native `<dialog>` elements, visible focus rings, 44 px touch targets on coarse pointers, and
  reduced-motion support. All six screens were checked with axe-core against WCAG 2.x A/AA in
  light and dark mode with no violations.
- **Responsive:** the sidebar collapses below 1024 px, multi-column grids stack below 1180 px, and the
  case table becomes a labelled card list below 900 px.
- **Privacy:** the workflow keeps evidence out of notifications, and role-based views enforce who can
  access reports, decisions, room protocols, and audit records.
- **Role switch:** the profile menu is a mockup control for demonstrating FR-7.3. In tutor view, the
  dashboard is limited to the tutor's own reports; decision and audit tabs, room protocol, export, and
  staff navigation are hidden.
- **Report editing:** the edit page mirrors quick capture while the room protocol is unsigned. Student
  selection and incident time are locked; category, description, immediate action, witness, and evidence
  can change. After signing, the case must be reopened with a reason.

## Limitations

- All names, case numbers, timestamps, hashes, and evidence are fictional.
- There is no server, authentication, database, file upload, or persistence.
- Upload, download, export, letter generation, and external links are simulated.
- The case detail and decision pages show the same case at different moments in the process; the
  decision page assumes the room protocol has been signed.
- Signatures are recorded once per room protocol summary, not per report.
- The mockup is a design artefact, not a production UI. Implementation should use the actual
  `@tumaet/ui-angular` components and the Artemis application shell.
