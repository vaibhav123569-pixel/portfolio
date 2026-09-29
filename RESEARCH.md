# Design and profile research

Research date: 29 September 2026. This document separates observed source material, supplied personal facts, and implementation decisions.

## 1. Reference analysis

Reference: [Wix Resume (Simple), wh-1318](https://www.wix.com/website-template/view/html/wh-1318), supported by the nine supplied screenshots. The screenshots are the strongest visual evidence; the public template landing page does not expose the full design in extracted text.

The design's defining features are a centered floating pill navigation, an enormous uppercase name, abstract translucent loops, rounded lower hero edge, generous negative space, numbered section labels, a two-column About section, three expertise cards, broad project panels, a journey section, a centered contact form, and a second oversized name in the footer. The browser chrome and Wix editor toolbar are not part of the portfolio.

The implementation keeps this section rhythm while translating white surfaces to near-black and charcoal. Cobalt is retained as the brand color; lighter periwinkle is used for readable headings. No fictional seven-year career, stock portrait, sample employers, San Francisco address, or Wix sample phone number is carried across. It is a close structural adaptation, not a pixel-identical copy: the personal content, art, project previews, palette, and mobile behavior differ.

## 2. Verified identity and education

- Name, college attendance, LinkedIn URL, GitHub URL, and public email were supplied directly in this conversation.
- The prior chat **Personal Profile Summary** identifies third-year B.Tech CSE study, software/AI interests, Python, Java, SQL, React, Flask, and a banking project. Treat that summary as prior conversational context, not independent certification of proficiency.
- [SRMCEM's official website](https://srmcem.ac.in/) confirms the institution's expanded name and Lucknow context. This verifies the institution's identity, not the user's attendance; attendance comes from the user.
- [Provided GitHub profile](https://github.com/vaibhav123569-pixel) was readable and lists public learning repositories.
- [Provided LinkedIn profile](https://www.linkedin.com/in/vaibhav-gupta-27b4b0343/) returned an automated access error. Only the user-confirmed URL is used. Search results for other people named Vaibhav Gupta were excluded.

No private credentials, personal financial information, home address, inferred employers, or unsupported professional experience are included.

## 3. Project evidence

**Merchant Growth AI:** The previous chat **Build the hackathon app from the PPT** describes a working local language model, English/Hindi answers, analytics grounded in calculated figures, account isolation, and saved experiments. The portfolio describes it as a hackathon project, without asserting awards, customer traction, or production deployment. No repository was safely matched to this project.

**Bank Account Management System:** The prior profile summary describes Flask, MySQL, authentication/RBAC, and fraud detection. The portfolio calls fraud detection an exploration and labels the project as learning work. It does not claim banking-grade security or a real financial service.

**FoodCart:** The public [Finalproject repository](https://github.com/vaibhav123569-pixel/Finalproject) contains HTML pages and food imagery. Its [index.HTML](https://github.com/vaibhav123569-pixel/Finalproject/blob/main/index.HTML) explicitly identifies a FoodCart meal-ordering interface. The site links to that exact source repository. No live ordering, payment capability, or customer metrics are claimed.

The two large preview panels are authored interface concepts. Their labels distinguish them from actual product screenshots. Replace them with genuine screenshots when available; preserve descriptive alternative text and stable dimensions.

## 4. Accessibility decisions

Reference: [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/). Relevant areas are contrast, keyboard navigation, reflow, visible focus, form labels, and reduced distracting motion.

Implemented: a skip link, semantic landmarks, one primary heading, visible keyboard focus, labelled fields, native validation, native modal dialogs with Escape support, status messages, and a reduced-motion preference. Decorative artwork is hidden from assistive technology. The sticky navigation has matching anchor offsets.

Future browser review should cover keyboard-only operation, focus restoration after dialogs, 200% zoom, narrow screens, and contrast over the actual background. This is not a claim of audited WCAG conformance.

## 5. Performance and maintainability

Reference: [Google's Web Vitals overview](https://web.dev/articles/vitals). The important measurements are loading, responsiveness, and layout stability; measure them on the deployed site instead of inventing scores.

This version avoids a framework, external font downloads, animation libraries, remote image dependencies, and client API calls. The same local artwork is reused for hero and contact. Future improvement: produce WebP/AVIF variants and compare actual visual quality and transferred size; test the hero's largest-contentful-paint behavior on mobile. No Lighthouse score has been measured.

## 6. Future changes, in priority order

1. Add an approved headshot; replace the About monogram without changing its reserved aspect ratio.
2. Confirm project repository and deployment URLs, personal contribution, team members, and project dates. Add those exact links in `profile.js`.
3. Replace concept previews with authentic screenshots and concise case studies: problem, your role, approach, result. Use measurable results only when supported.
4. Add a verified resume PDF and download link once supplied; do not generate unverified achievements.
5. If direct form delivery is wanted, add a server endpoint or form provider with validation, spam protection, delivery-error handling, and clear privacy wording. Never place service secrets in browser JavaScript.
6. Review education year and availability each term. Update content intentionally rather than calculating an unsupported graduation year.
7. Complete real mobile/desktop browser testing, then measure performance and accessibility on the deployed site.

These are future suggestions, not background tasks or installed services. No analytics or tracking is included.

## WhatsApp and originality update
The contact form now targets a server-side Twilio integration; see WHATSAPP-SETUP.md. The sandbox/production account remains unconfigured. Reference logos, sample identity, stock portrait, sample employers, and sample project photographs were never imported. Artwork is newly generated and interface previews are authored for this portfolio. The footer now uses an outlined name and the wordmark/card corners have original styling while preserving the major layout. This records design provenance, not a legal guarantee.
