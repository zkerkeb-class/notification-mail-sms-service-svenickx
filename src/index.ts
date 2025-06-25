import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import MessageController from "./controllers/message.controller";
import UserController from "./controllers/user.controller";
import MessageRoutes from "./routes/message.routes";
import UserRoutes from "./routes/user.routes";
import MailService from "./services/mail.service";
import SmsService from "./services/sms.service";

dotenv.config({ path: __dirname + "/../../.env" });

const app: Express = express();
const port = process.env.NOTIF_SERVICE_PORT || 2002;
app.use(express.json());
app.use(cookieParser());

const smsService = new SmsService();
const mailService = new MailService();

const messageController = new MessageController(smsService, mailService);
const userController = new UserController(smsService, mailService);

const messageRoutes = new MessageRoutes(messageController);
const userRoutes = new UserRoutes(userController);

app.use("/message", messageRoutes.router);
app.use("/user", userRoutes.router);

app.listen(port, () => {
  console.log(`[server]: Notification is running at http://localhost:${port}`);
});
