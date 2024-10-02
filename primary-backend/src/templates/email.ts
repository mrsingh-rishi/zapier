export function getVerificationTemplate(verificationLink: string): string {
  const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  background-color: #FF6600;
                  color: #ffffff;
                  padding: 10px;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  text-align: center;
              }
              .content p {
                  font-size: 18px;
                  color: #333333;
              }
              .btn {
                  background-color: #FF6600;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  display: inline-block;
                  margin-top: 20px;
                  font-size: 16px;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888888;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  Verify Your Email
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>Thank you for registering. Please click the button below to verify your email address.</p>
                  <a href="${verificationLink}" class="btn">Verify Email</a>
              </div>
              <div class="footer">
                  <p>If you didnt request this, you can ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
    `;

  return template;
}

export function getEmailVerificationSuccessPage(): string {
  const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Email Verified</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 8px;
                  text-align: center;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  font-size: 32px;
                  color: #FF6600;
                  margin-bottom: 20px;
              }
              .message {
                  font-size: 20px;
                  color: #333333;
                  margin-bottom: 20px;
              }
              .btn {
                  background-color: #FF6600;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  display: inline-block;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  Email Verified!
              </div>
              <div class="message">
                  Thank you! Your email has been successfully verified. You can now access your account.
              </div>
              <a href="/login" class="btn">Go to Login</a>
          </div>
      </body>
      </html>
    `;

  return template;
}
