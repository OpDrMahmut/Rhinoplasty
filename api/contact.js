console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req, res) {
  console.log("=== CONTACT API START ===");
  console.log("Method:", req.method);
  console.log("Has API Key:", !!process.env.RESEND_API_KEY);
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body = req.body;

    const firstName = body.firstName || "";
    const lastName = body.lastName || "";

    const name =
      body.name ||
      `${firstName} ${lastName}`.trim() ||
      "Unknown";

    const {
      email,
      phone,
      subject,
      message,
      treatment,
      budget,
      method,
    } = body;

    const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; background:#F8F6F2; margin:0; padding:32px;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-top:3px solid #C9A36A; padding:40px;">

    <h2 style="font-weight:300; font-size:28px; margin-bottom:6px;">
      New Enquiry
    </h2>

    <p style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#C9A36A;">
      Dr. Mahmut Uzut Clinic
    </p>

    <table style="width:100%; border-collapse:collapse; margin-top:25px;">

      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;width:150px;">
          <strong>Name</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${name}
        </td>
      </tr>

      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Email</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${email || "-"}
        </td>
      </tr>

      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Phone</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${phone || "-"}
        </td>
      </tr>

      ${
        subject
          ? `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Subject</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${subject}
        </td>
      </tr>`
          : ""
      }

      ${
        treatment
          ? `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Treatment</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${treatment}
        </td>
      </tr>`
          : ""
      }

      ${
        budget
          ? `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Budget</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${budget}
        </td>
      </tr>`
          : ""
      }

      ${
        method
          ? `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          <strong>Preferred Contact</strong>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;">
          ${method}
        </td>
      </tr>`
          : ""
      }

    </table>

    ${
      message
        ? `
    <div style="margin-top:30px;">
      <h3>Message</h3>

      <div style="background:#F8F6F2;padding:18px;border-radius:6px;">
        ${message.replace(/\n/g, "<br/>")}
      </div>
    </div>`
        : ""
    }

    <p style="margin-top:35px;font-size:12px;color:#999;">
      Submitted on:
      ${new Date().toLocaleString("en-GB", {
        timeZone: "Europe/Istanbul",
      })}
    </p>

  </div>
</body>
</html>
`;

    // Email to clinic
    // Send email to clinic
const clinicEmail = await resend.emails.send({
  from: "Dr. Mahmut Uzut Clinic <noreply@drmahmutuzut.com>",
  to: ["organicxmedia@gmail.com"],
  reply_to: email, // <-- changed from replyTo
  subject: `New Enquiry — ${name}${subject ? ` · ${subject}` : ""}`,
  html: htmlBody,
});

console.log("Clinic email sent:", clinicEmail);

// Send auto reply separately
if (email) {
  try {
    const autoReply = await resend.emails.send({
      from: "Dr. Mahmut Uzut Clinic <noreply@drmahmutuzut.com>",
      to: email,
      subject: "Thank you for contacting us",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2>Thank you, ${name}!</h2>

          <p>We have received your enquiry.</p>

          <p>Our team will contact you shortly.</p>

          <br>

          <strong>Dr. Mahmut Uzut Clinic</strong>
        </div>
      `,
    });

    console.log("Auto reply sent:", autoReply);
  } catch (err) {
    console.error("Auto reply failed:", err);
    // Don't fail the whole request if auto reply fails
  }
}

return res.status(200).json({
  success: true,
  message: "Email sent successfully.",
});

    // Auto-reply to visitor
    if (email) {
      await resend.emails.send({
        from: "Dr. Mahmut Uzut Clinic <noreply@drmahmutuzut.com>",
        to: email,
        subject: "Thank you for contacting us",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
            <h2>Thank you, ${name}!</h2>

            <p>
              We have successfully received your enquiry.
            </p>

            <p>
              Our team will review your message and contact you shortly.
            </p>

            <br/>

            <p>
              Best regards,<br/>
              <strong>Dr. Mahmut Uzut Clinic</strong>
            </p>
          </div>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
  console.error("===== CONTACT API ERROR =====");
  console.error(error);
  console.error(error?.stack);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
}
}