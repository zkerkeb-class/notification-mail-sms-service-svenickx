import nodemailer from "nodemailer";

export default class MailService {
  private host = process.env.MAIL_HOST;
  private port = process.env.MAIL_PORT;
  private user = process.env.MAIL_USER;
  private password = process.env.MAIL_PASSWORD;
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: Number(this.port),
      auth: {
        user: this.user,
        pass: this.password,
      },
    });
  }

  async send(from: string, to: string, subject: string, html: string) {
    const mail = await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log("🚀 ~ MailService ~ send ~ mail:", mail);
    return mail;
  }
}
