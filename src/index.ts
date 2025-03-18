import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import MailService from "./services/mail.service";
import SmsService from "./services/sms.service";

dotenv.config({ path: __dirname + "/../../.env" });

const app: Express = express();
const port = process.env.NOTIF_SERVICE_PORT || 2002;

const smsService = new SmsService();
const mailService = new MailService();

app.post("/", async (req: Request, res: Response) => {
  const sms = await smsService.create(
    "+15005550006",
    "+5571981265131",
    "hello"
  );

  const mail = await mailService.send(
    "no-reply@chatty.com",
    "user@chatty.com",
    "Hello user",
    "<h1>Message From Chatty</h1>"
  );

  res.send({ sms, mail });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
