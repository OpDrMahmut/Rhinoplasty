import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Support both contact form fields (firstName/lastName) and consultation form (name)
    const firstName = body.firstName || '';
    const lastName = body.lastName || '';
    const name = body.name || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Unknown');
    const { email, phone, subject, message, treatment, budget, method } = body;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; background: #F8F6F2; margin: 0; padding: 32px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 3px solid #C9A36A; padding: 40px;">
    <h2 style="font-family: Georgia, serif; font-weight: 300; font-size: 28px; color: #111111; margin: 0 0 8px;">New Enquiry</h2>
    <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #C9A36A; margin: 0 0 32px;">Dr. Mahmut Uzut Clinic</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; width: 140px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${name}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${email || '—'}</td></tr>
      <tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${phone || '—'}</td></tr>
      ${subject ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${subject}</td></tr>` : ''}
      ${treatment ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Treatment</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${treatment}</td></tr>` : ''}
      ${budget ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Budget</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${budget}</td></tr>` : ''}
      ${method ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Preferred Contact</td><td style="padding: 10px 0; border-bottom: 1px solid #E8E8E8; font-size: 14px; color: #111;">${method}</td></tr>` : ''}
    </table>

    ${message ? `
    <div style="margin-top: 28px;">
      <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;">Message</p>
      <p style="font-size: 14px; color: #333; line-height: 1.7; margin: 0; padding: 16px; background: #F8F6F2;">${message}</p>
    </div>
    ` : ''}

    <p style="font-size: 11px; color: #BBBBBB; margin-top: 40px; border-top: 1px solid #E8E8E8; padding-top: 16px;">
      Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Istanbul' })} (Istanbul Time)
    </p>
  </div>
</body>
</html>
    `.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dr. Mahmut Uzut Clinic <noreply@drmahmutuzut.com>',
        to: ['organicxmedia@gmail.com'],
        subject: `New Enquiry — ${name}${subject ? ` · ${subject}` : ''}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});