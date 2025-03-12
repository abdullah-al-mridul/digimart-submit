import nodemailer from "nodemailer";

const sendCodeToEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your DIGIMART Account",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Email Verification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #374151;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 2px dashed #907ffd;
              }
              .logo {
                font-size: 32px;
                font-weight: 800;
                color: #907ffd;
                text-decoration: none;
              }
              .content {
                background-color: #f5efff;
                border: 2px dashed #907ffd;
                border-radius: 12px;
                padding: 30px;
                margin: 20px 0;
              }
              .verification-code {
                background-color: #ffffff;
                border: 2px dashed #907ffd;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                color: #907ffd;
                letter-spacing: 8px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
              .note {
                font-size: 14px;
                color: #6b7280;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">
                  <span style="color: #907ffd;">DIGIMART</span>
                </div>
              </div>
              
              <div class="content">
                <h2 style="color: #907ffd; margin-bottom: 20px;">Verify Your Email Address</h2>
                <p>Hello,</p>
                <p>Thank you for creating a DigiMart account. To complete your registration, please enter the following verification code:</p>
                
                <div class="verification-code">
                  ${code}
                </div>
                
                <p>This code will expire in 30 minutes for security reasons.</p>
                
                <div class="note">
                  <p>If you didn't create a DigiMart account, you can safely ignore this email.</p>
                </div>
              </div>
              
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} DigiMart. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendCodeToEmail;
