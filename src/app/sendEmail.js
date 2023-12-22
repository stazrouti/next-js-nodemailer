"use server";
/* v2 */
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
        user: 'YourEmail@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

  const filename = emailData.filename;

        // Use a regular expression to match the timestamp
        const timestampRegex = /^\d+_/; // Matches one or more digits followed by an underscore at the beginning of the string

        // Remove the timestamp from the filename
        const cleanedFilename = filename.replace(timestampRegex, '');

        console.log(cleanedFilename);


    // Customize the email content based on form data
    const mailOptions = {
      from: `${emailData.senderName} <${emailData.senderEmail}>`,
      to: 'YourEmail@gmail.com', // Send to your own email address
      subject: 'job apply',
      text: emailData.text,
      html: emailData.html,
      attachments: [
        {
          filename: `${cleanedFilename}`,
          path:`./public/upload/${emailData.filename}`
        }
      ],
      
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

