"use server"

export async function sendContactEmail(formData: FormData) {
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!firstName || !lastName || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // In a real application, you would integrate with an email service like:
  // - Resend
  // - SendGrid
  // - Nodemailer
  // - AWS SES

  try {
    // Simulate email sending
    console.log("Sending email:", {
      from: email,
      to: "donation@ciwed.com",
      subject: `Contact Form: ${subject}`,
      body: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    })

    return {
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully. We'll get back to you within 24 hours.`,
    }
  } catch (error) {
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact us directly.",
    }
  }
}
