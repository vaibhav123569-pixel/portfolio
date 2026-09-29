# Vaibhav Gupta — Portfolio

A responsive, black-and-cobalt portfolio inspired by the supplied screenshots, with original artwork, copy, branding, and interface concepts. Plain HTML/CSS/JavaScript plus a Node 22+ WhatsApp API server; no dependency installation needed.

## Run locally

From this directory, run `node serve.mjs`, then open http://127.0.0.1:5174/. Opening the HTML file directly does not run the WhatsApp endpoint.

## Edit your portfolio

| Change | File / location |
| --- | --- |
| Name, education, about text, visible project cards | `dist/index.html` |
| Email, LinkedIn, GitHub, project links and popup descriptions | `dist/profile.js` |
| Background, accent colors, spacing, mobile breakpoints | `dist/styles.css` — `:root` and `EDIT HINT` comments |
| Original hero and contact artwork | `dist/cobalt-loops.png` |
| Project dialogs, navigation tracking, WhatsApp form | `dist/script.js` |
| Private WhatsApp settings | `.env` (ignored by Git); see `WHATSAPP-SETUP.md` |
| Validation and provider API | `whatsapp.mjs` and `serve.mjs` |

Search for **EDIT HINT** to find code comments for future changes. The profile uses details from your earlier chats and the accounts you supplied; research sources and uncertainty are documented in `RESEARCH.md`.

## Contact behavior

The form submits to a server-side Twilio WhatsApp integration with +91 9451876563 as the configured recipient. Activation requires private provider credentials and sandbox enrollment or an approved production setup. Missing configuration is reported honestly. API acceptance is not handset delivery. The direct email link remains a fallback. See `WHATSAPP-SETUP.md` for the exact setup and limitations.

## Publishing

The frontend is in `dist/`; WhatsApp additionally requires `serve.mjs` and `whatsapp.mjs` on a Node-capable host. Do not publish only static assets and expect the contact API to work. The original Sites project is registered in `.openai/hosting.json`; reuse that ID if porting the endpoint to that platform. Its static manifest needs a server-capable migration. This session could not complete publication because the installed Sites plugin scripts disappeared before packaging. No live deployment is claimed.

## Known limitations

- LinkedIn blocked automated reading, so its URL is linked but no unverified employment details were imported.
- Merchant Growth AI and the banking project descriptions came from previous chats. Their source/live links remain blank until their exact repositories are confirmed.
- Project cards use the supplied Merchant Growth AI demo and banking academic-project screenshots. Click an image to view it at full size.
- The About section uses the portrait supplied by Vaibhav; replace dist/vaibhav-gupta.jpeg to update it.
- Browser inspection was declined. Source checks passed, but desktop/mobile visual and interaction QA still needs a browser review.

## Verification

Run `node verify.mjs` to check local references, section anchors, profile links, project associations, and contact configuration. JavaScript syntax was checked with `node --check`. These checks do not replace real browser testing.


