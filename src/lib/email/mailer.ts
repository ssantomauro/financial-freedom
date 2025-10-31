import nodemailer from 'nodemailer'

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface FeedbackEmailData {
  userEmail: string
  userName: string
  userId: string
  feedback: string
  page: string
}

export async function sendFeedbackEmail(data: FeedbackEmailData) {
  const { userEmail, userName, userId, feedback, page } = data

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f9fafb;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .feedback-box {
          background: white;
          padding: 15px;
          border-left: 4px solid #2563eb;
          margin: 15px 0;
          border-radius: 4px;
        }
        .info-row {
          margin: 8px 0;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .label {
          font-weight: bold;
          color: #6b7280;
          display: inline-block;
          width: 120px;
        }
        .value {
          color: #111827;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">💬 New User Feedback</h2>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">From:</span>
            <span class="value">${userName}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">${userEmail}</span>
          </div>
          <div class="info-row">
            <span class="label">User ID:</span>
            <span class="value">${userId}</span>
          </div>
          <div class="info-row">
            <span class="label">Page:</span>
            <span class="value">${page}</span>
          </div>
          <div class="info-row">
            <span class="label">Submitted:</span>
            <span class="value">${new Date().toLocaleString()}</span>
          </div>

          <h3 style="margin-top: 20px; color: #111827;">Feedback:</h3>
          <div class="feedback-box">
            ${feedback.replace(/\n/g, '<br>')}
          </div>

          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            This feedback was submitted through the Financial Freedom feedback button.
            You can reply directly to <a href="mailto:${userEmail}">${userEmail}</a> if needed.
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const emailText = `
New User Feedback

From: ${userName}
Email: ${userEmail}
User ID: ${userId}
Page: ${page}
Submitted: ${new Date().toLocaleString()}

Feedback:
${feedback}

---
This feedback was submitted through the Financial Freedom feedback button.
You can reply directly to ${userEmail} if needed.
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    replyTo: userEmail,
    subject: `User Feedback from ${userName}`,
    text: emailText,
    html: emailHtml,
  }

  return await transporter.sendMail(mailOptions)
}
