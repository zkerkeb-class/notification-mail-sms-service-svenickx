import { Router } from "express";
import MessageController from "../controllers/message.controller";

export default class MessageRoutes {
  router: Router;

  constructor(private readonly messageController: MessageController) {
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post("/", this.messageController.send);
  }
}
