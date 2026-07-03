// Vercel serverless function: emails call requests via Resend.
// Required env vars (Vercel project settings):
//   RESEND_API_KEY - API key from resend.com
//   BOOKING_TO     - inbox that receives call requests
// Optional:
//   BOOKING_FROM   - verified sender, e.g. "Kolas Website <notifications@kolastechnologies.com>"
//                    (defaults to Resend's shared onboarding sender, which can only
//                    deliver to the email on your Resend account until a domain is verified)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, company } = req.body || {};

  // Honeypot: hidden field real users never fill. Pretend success for bots.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.BOOKING_TO) {
    console.error('book-call: RESEND_API_KEY or BOOKING_TO env var is not set');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM || 'Kolas Website <onboarding@resend.dev>',
      to: process.env.BOOKING_TO,
      reply_to: email,
      subject: `New call request from ${email}`,
      text: [
        'New "Book a Call" request from kolastechnologies.com',
        '',
        `Email: ${email}`,
        `Time: ${new Date().toISOString()}`,
        '',
        'Reply directly to this email to reach them.',
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('book-call: Resend error', response.status, detail);
    return res.status(502).json({ error: 'Could not send your request. Please try again.' });
  }

  return res.status(200).json({ ok: true });
};
