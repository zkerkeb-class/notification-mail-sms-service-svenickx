import MailService from "../services/mail.service";
import SmsService from "../services/sms.service";

export default class UserController {
  constructor(
    private readonly smsService: SmsService,
    private readonly mailService: MailService
  ) {}

  register = async (req: any, res: any) => {
    const { email, token } = req.body;

    let mailBody = `<h1>Welcome to Chatty</h1><p>We are glad to have you on board!</p>`;
    if (token) {
      mailBody += `<p>Your account has been successfully created.</p><a href="${process.env.FRONT_SERVICE_URL}activate/${token}" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:4px;">Activate your account</a>`;
    }

    const [sms] = await Promise.all([
      await this.smsService.create(
        "+15005550006",
        "+5571981265131",
        "Welcome to Chatty! We are glad to have you on board!"
      ),
      this.mailService.send(
        "no-reply@chatty.com",
        email,
        "Welcome to Chatty",
        mailBody
      ),
    ]);

    console.log("🚀 ~ MessageController ~ send ~ sms:", sms);

    res.status(200).json({
      message: "Mail sent",
    });
    return;
  };
}
