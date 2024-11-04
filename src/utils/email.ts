import nodemailer from 'nodemailer';

export async function SendEmail(
  host: string,
  port: number,
  user: string,
  pwd: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: host,
    port: port || 587,
    secure: false,
    auth: {
      user: user,
      pass: pwd,
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.error('Error sending email:', e);
    return false;
  }
}
