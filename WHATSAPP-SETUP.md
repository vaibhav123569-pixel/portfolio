# WhatsApp contact integration

The form now posts to `/api/contact`. A Node 22+ server validates it and calls Twilio's WhatsApp Messages API. The destination is fixed to the configured owner number; visitors cannot choose recipients. No credentials are served from `dist/`. No messages are stored locally.

## Activation still required

1. Open your [Twilio WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox) in your Twilio account.
2. From **+91 9451876563**, send the exact join phrase shown in your own console to the sandbox sender shown there. This step must be performed from your WhatsApp account.
3. Enter your Account SID, Auth Token, and sandbox sender privately in this project's ignored `.env`. Do not put them in chat, `profile.js`, or Git. The receiving number is already configured.
4. Restart `node serve.mjs`. Submit one clearly labelled test message and check WhatsApp and the Twilio message log.

This session has no Twilio credentials or sandbox join confirmation. Mocked API tests are not proof of actual WhatsApp delivery. Until configured, the API returns an honest unavailable message and offers email.

## Sandbox versus production

[Twilio's sandbox documentation](https://www.twilio.com/docs/whatsapp/sandbox) explains recipient enrollment, temporary sandbox sessions, and the 24-hour customer-service window. Free-form body messages work within that active window. Sandbox membership must be renewed as required by Twilio. A website form submission does not reopen the WhatsApp service window.

For reliable production notifications, configure a WhatsApp-enabled sender and an approved template using `TWILIO_CONTENT_SID`. The template must match variables `1` = visitor name, `2` = email, `3` = message. Approval and permitted use are determined by WhatsApp/Twilio; arbitrary user text should be included only if the approved template permits it. The sandbox's pre-approved example templates are not a general-purpose contact-message template. See [template notifications](https://www.twilio.com/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates).

The API's 202 response means **accepted for delivery**, not delivered to the handset. For delivery tracking, add verified Twilio status callbacks and persistent message state. This version deliberately does not claim delivery.

## Hosting

Static-only hosting cannot execute this endpoint. Deploy the Node server and `dist/` together on a Node-capable host, or port `whatsapp.mjs` to a serverless function on the same origin. Set `APP_ORIGIN` to the exact HTTPS public origin, `HOST=0.0.0.0` when required by the host, and inject secrets privately. Do not upload `.env` as a public asset. The original static Sites manifest is not sufficient for this new server endpoint.

The server applies input length limits, fixed destination, same-origin requests, a honeypot, and modest per-process rate limits. Behind a proxy the IP limit is shared deliberately unless trusted proxy behavior is explicitly configured. Before public high-volume use, add shared rate limiting and bot verification. Provider charges may apply; use your provider's spend controls.

## Checks

`node --test whatsapp.test.mjs` covers malformed input, missing setup, fixed-recipient sending, template mapping, and provider failures/timeouts with mocked responses. It sends no real WhatsApp messages.
