import MailService from "../services/mail.service";
import SmsService from "../services/sms.service";

export default class MessageController {
  constructor(
    private readonly smsService: SmsService,
    private readonly mailService: MailService
  ) {}

  send = async (req: any, res: any) => {
    const body = req.body;
    console.log("🚀 ~ MailController ~ send ~ body:", body);

    const sms = await this.smsService.create(
      "+15005550006",
      "+5571981265131",
      "hello"
    );
    console.log("🚀 ~ MessageController ~ send ~ sms:", sms);

    const mail = await this.mailService.send(
      "no-reply@chatty.com",
      "user@chatty.com",
      "Hello user",
      "<h1>Message From Chatty</h1>"
    );
    console.log("🚀 ~ MessageController ~ send ~ mail:", mail);

    res.status(200).json({
      message: "Mail sent",
    });
    return;
  };
}
