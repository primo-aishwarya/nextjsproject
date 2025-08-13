import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    if (!amount || !email) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Thank You email to donor
    await transporter.sendMail({
      from: `"Your Charity" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Donation",
      html: `
        <h2>Thank You!</h2>
        <p>We truly appreciate your generous donation of <b>$${amount}</b>.</p>
        <p>Your contribution helps us make a difference!</p>
      `,
    });

    // New Donation email to Admin
    await transporter.sendMail({
      from: `"Your Charity" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Donation Received",
      html: `
        <h2>New Donation Alert</h2>
        <p><b>Amount:</b> $${amount}</p>
        <p><b>Donor Email:</b> ${email}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "Emails sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ message: "Failed to send emails" }), { status: 500 });
  }
}
