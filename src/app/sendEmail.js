"use server";
//send mail to your self
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's is from your account on  https://console.cloud.google.com/
const CLIENT_ID = 'YOUR CLIENT_ID ';
const CLIENT_SECRET = 'YOUR CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(emailData) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'youremail@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Customize the email content based on form data
    const mailOptions = {
      from: `${emailData.senderName} <${emailData.senderEmail}>`,
      to: 'youremail@gmail.com', // Send to your own email address
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}