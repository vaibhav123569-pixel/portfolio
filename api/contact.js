import { sendWhatsApp, validateContact } from '../whatsapp.mjs';

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use the contact form.' });
  }

  const expectedOrigin = process.env.APP_ORIGIN;
  if (expectedOrigin && req.headers.origin && req.headers.origin !== expectedOrigin) {
    return res.status(403).json({ error: 'Please submit from the portfolio website.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid message format.' });
    }
  }

  const input = validateContact(body);
  if (!input) {
    return res.status(400).json({
      error: 'Please enter your name, valid email, message up to 1,000 characters, and consent.'
    });
  }

  const result = await sendWhatsApp(input, process.env);
  return res.status(result.status).json(result.body);
}
