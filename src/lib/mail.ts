import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sentVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "support@monirhrabby.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click
    <a href="${confirmLink}">here</a> to confirm email
    </p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "support@monirhrabby.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click
    <a href="${confirmLink}">here</a> to reset your password
    </p>`,
  });
};
