export default class SmsService {
  accountSid = process.env.TWILIO_ACCOUNT_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  client = require("twilio")(this.accountSid, this.authToken);

  async create(from: string, to: string, body: string): Promise<any> {
    const message = await this.client.messages.create({ body, from, to });
    console.log("🚀 ~ SmsService ~ create ~ message:", message);
    return message;
  }
}
